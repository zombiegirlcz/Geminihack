import os
import ast
import json
import subprocess
import sys
import argparse


class CodeAgent:
    def __init__(self, cli_bin=None, model=None):
        # Renegade CLI binary (defaults to "renegade")
        self.cli_bin = cli_bin or os.getenv("RENEGADE_CLI_BIN", "renegade")
        self.model = model or os.getenv("RENEGADE_REPAIR_MODEL", "gemini-2.5-pro")

    def _call_llm(self, system_prompt, user_prompt):
        """Volá Gemini přes Renegade CLI (headless) a vrací čistý text odpovědi."""
        prompt = f"{system_prompt.strip()}\n\n{user_prompt.strip()}".strip()

        cmd = [
            self.cli_bin,
            "--output-format",
            "json",
            "--approval-mode",
            "plan",
            "--prompt",
            prompt,
        ]
        if self.model:
            cmd.extend(["--model", self.model])

        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            env=os.environ.copy(),
        )

        if result.returncode != 0:
            stderr = result.stderr.strip() or "Neznámá chyba při volání Renegade."
            raise RuntimeError(f"Renegade selhal: {stderr}")

        try:
            parsed = json.loads(result.stdout)
        except json.JSONDecodeError as exc:
            raise RuntimeError(
                f"Neplatná JSON odpověď z Renegade: {result.stdout}"
            ) from exc

        if parsed.get("error"):
            raise RuntimeError(f"Renegade error: {parsed['error']}")

        response = parsed.get("response", "")
        if not isinstance(response, str):
            raise RuntimeError("Renegade vrátil neplatnou odpověď.")

        # Čištění markdownu (```python ... ```)
        response = response.strip()
        if response.startswith("```"):
            response = response.split("\n", 1)[1]
        if response.endswith("```"):
            response = response.rsplit("\n", 1)[0]

        return response.strip()

    def fix_code(self, broken_code):
        """
        Opraví syntaxi, odsazení a překlepy.
        """
        system_prompt = """
You are an expert Python code cleaner. Your task is to fix broken Python code.
STRICT RULES:
1. Fix all IndentationErrors (standardize to 4 spaces).
2. Fix SyntaxErrors (missing colons, parentheses, etc.).
3. Fix Typos in keywords (e.g., 'retun' -> 'return', 'dfe' -> 'def').
4. Output ONLY the raw executable Python code.
5. DO NOT include explanations, comments, or markdown ticks like ```python. Just the code.
6. DO NOT call any tools.
"""
        return self._call_llm(system_prompt, f"BROKEN CODE:\n{broken_code}")

    def add_function(self, current_code, new_function_request):
        """
        Vloží novou funkci do existujícího kódu.
        """
        system_prompt = """
You are a Python architect. Integrate a new function into existing code.
STRICT RULES:
1. Output the FULL updated code containing both old and new logic.
2. Ensure correct indentation.
3. Add necessary imports at the top.
4. Output ONLY the raw executable Python code. No markdown.
5. DO NOT call any tools.
"""
        user_prompt = f"""
EXISTING CODE:
{current_code}

REQUEST:
{new_function_request}
"""
        return self._call_llm(system_prompt, user_prompt)

    def get_functions(self, code):
        """Vrátí seznam názvů funkcí pomocí AST."""
        try:
            tree = ast.parse(code)
            return [n.name for n in ast.walk(tree) if isinstance(n, ast.FunctionDef)]
        except SyntaxError:
            return []

    def execute_function(self, code, function_name, *args):
        """Spustí funkci v izolovaném scope."""
        local_scope = {}
        try:
            # Rychlá kontrola syntaxe před spuštěním
            ast.parse(code)

            # Spuštění definic
            exec(code, {}, local_scope)

            if function_name not in local_scope:
                return f"Chyba: Funkce '{function_name}' nebyla v kódu nalezena."

            # Volání funkce
            return local_scope[function_name](*args)
        except Exception as exc:
            return f"Chyba při běhu kódu: {exc}"


def _read_stdin() -> str:
    data = sys.stdin.read()
    if data is None:
        return ""
    return data


def main() -> None:
    parser = argparse.ArgumentParser(description="Repair agent CLI")
    parser.add_argument(
        "--mode",
        choices=["fix", "add", "functions", "run"],
        default="fix",
        help="Operace: fix (oprava), add (doplň funkci), functions (vyjmenuj funkce), run (spusť funkci)",
    )
    parser.add_argument(
        "--request",
        help="Požadavek na novou funkci (pro mode=add)",
    )
    parser.add_argument(
        "--function-name",
        help="Název funkce pro spuštění (mode=run)",
    )
    parser.add_argument(
        "--args-json",
        help="JSON pole argumentů pro funkci (mode=run)",
    )
    parser.add_argument(
        "--model",
        help="Override modelu (jinak RENEGADE_REPAIR_MODEL)",
    )
    parser.add_argument(
        "--renegade-bin",
        help="Cesta k renegade binárce (jinak RENEGADE_CLI_BIN)",
    )

    args = parser.parse_args()
    agent = CodeAgent(cli_bin=args.renegade_bin, model=args.model)
    code_input = _read_stdin()

    if args.mode == "fix":
        result = agent.fix_code(code_input)
        sys.stdout.write(result)
        return

    if args.mode == "add":
        if not args.request:
            raise SystemExit("Chybí --request pro mode=add")
        result = agent.add_function(code_input, args.request)
        sys.stdout.write(result)
        return

    if args.mode == "functions":
        functions = agent.get_functions(code_input)
        sys.stdout.write(json.dumps(functions, ensure_ascii=False))
        return

    if args.mode == "run":
        if not args.function_name:
            raise SystemExit("Chybí --function-name pro mode=run")
        args_list = []
        if args.args_json:
            args_list = json.loads(args.args_json)
            if not isinstance(args_list, list):
                raise SystemExit("--args-json musí být JSON pole")
        result = agent.execute_function(code_input, args.function_name, *args_list)
        sys.stdout.write(str(result))
        return


if __name__ == "__main__":
    main()
