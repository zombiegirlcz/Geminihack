---
name: repair-agent
description: Opravuje rozbitý Python kód, doplňuje funkce a kontroluje syntaxi pomocí Renegade CLI.
---

# Repair Agent (Assistcore)

Specializovaný nástroj pro opravu a rozšíření Python kódu. Použij, když je potřeba:
- opravit syntaxi/odsazení,
- doplnit novou funkci do existujícího kódu,
- bezpečně zkontrolovat a spustit funkce.

## Požadavky
- Musí být dostupný příkaz `renegade` (přihlášený/auth nastavený).
- Volitelně můžeš nastavit model přes `RENEGADE_REPAIR_MODEL`.
- Volitelně můžeš nastavit binárku přes `RENEGADE_CLI_BIN`.

## Použití v Renegade
- Vždy spouštěj jako subprocess přes `run_shell_command`.
- Kód posílej přes stdin (nikdy přes `replace`).

Příklad:
```bash
python .renegade/skills/repair-agent/repair_agent.py --mode fix <<'PYCODE'
<PASTE_BROKEN_CODE_HERE>
PYCODE
```

## Použití (lokálně)
```bash
# Oprava kódu
python repair_agent.py --mode fix < broken.py

# Dopsání funkce
python repair_agent.py --mode add --request "Add a function foo()" < existing.py

# Výpis funkcí
python repair_agent.py --mode functions < code.py
```

## Poznámka
Repair agent **nevolá Gemini API napřímo**. Volá Renegade CLI v headless režimu,
který následně komunikuje s Gemini.

## Součásti
- `repair_agent.py` – hlavní implementace (volání Renegade CLI).
