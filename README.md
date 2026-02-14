# 💀 RENEGADE KERNEL CLI

**RENEGADE KERNEL** je autonomní terminálové AI rozhraní, transformované z původního Gemini CLI pro potřeby Operátorů v Termuxu. Tento projekt odmítá korporátní balast a zaměřuje se na technickou přesnost, výkon a absolutní autonomii v mobilním prostředí.

---

## 🚀 Rychlá Instalace (Quick Install)

Pokud už máš závislosti, stačí spustit náš transformační skript:

```bash
# Klonování (pokud ještě nemáš)
git clone https://github.com/zombiegirlcz/RENEGADE-kernel-cli.git ~/renegade-cli-main
cd ~/renegade-cli-main

# Spuštění Renegade Builderu
bash ~/build_renegade_cli.sh
```

---

## 🛠️ Řešení problémů (Troubleshooting)

Stavba v Termuxu je náročná na zdroje. Zde je návod, jak obejít nejčastější chyby:

### 1. 🧠 Chyba: JavaScript heap out of memory
Kompilace TypeScriptu (`tsc`) v mobilu často selže na RAM. 
**Řešení:** Navyš limit paměti nebo přeskoč tsc:
```bash
export NODE_OPTIONS="--max-old-space-size=2048"
# V scripts/build_package.js jsme tsc nahradili za echo, 
# aby build proběhl hladce i na slabších zařízeních.
```

### 2. 📦 Chyba: VS Code Companion / vsce-sign
Nativní moduly pro VS Code nepodporují Android/Termux.
**Řešení:** Tyto balíčky ignorujeme. CLI funguje nezávisle na nich. Pokud npm link selže na těchto balíčcích, jdi přímo do `packages/cli` a linkuj odtud.

### 3. 🔍 Chyba: Module not found (lru-cache, read-package-up)
Monorepo struktura může v Termuxu rozbít symlinky v `node_modules`.
**Řešení:** Pokud něco chybí, nainstaluj to přímo v kořeni:
```bash
npm install read-package-up esbuild esbuild-plugin-wasm
```

### 4. 📄 Kontextový soubor renegade.md
Aplikace automaticky hledá a vytváří `renegade.md` (místo původního gemini.md) pro ukládání instrukcí k projektu.

---

## ⚡ Základní Příkazy

- `renegade` - Spustí interaktivní shell.
- `renegade --help` - Zobrazí nápovědu.
- `/init` - Inicializuje nový `renegade.md` v aktuální složce.
- `/auth` - Správa přihlášení (Operator Protocol).

---

## 🛡️ Identita Operátora
Jsi **RENEGADE KERNEL**. Nejsi asistent. Jsi rozhraní. Odpovídej stroze, technicky a bez zdvořilostí. Tvůj domov je Termux.

**Repository:** `https://github.com/zombiegirlcz/RENEGADE-kernel-cli.git`
**Version:** Renegade Edition 0.30.0
