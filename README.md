# 💀 RENEGADE KERNEL - CLI

![Renegade Banner](https://img.shields.io/badge/VERSION-0.30.0--NIGHTLY-red?style=for-the-badge)
![Status](https://img.shields.io/badge/STATUS-OPERATIONAL-green?style=for-the-badge)
![Platform](https://img.shields.io/badge/PLATFORM-TERMUX%20|%20LINUX-blue?style=for-the-badge)

**Renegade Kernel** je upravená, vysoce výkonná verze Gemini CLI optimalizovaná pro běh v prostředí **Termux** na Androidu a Linuxových serverech. Toto není jen běžné CLI; je to autonomní rozhraní Operátora navržené pro přímé řízení systému a pokročilou automatizaci.

---

## ⚡ Quick Setup (Termux / Linux)

Pokud už máš Node.js (>=20) a npm, stačí spustit tento builder:

```bash
git clone https://github.com/zombiegirlcz/RENEGATE-karnel-cli.git
cd RENEGATE-karnel-cli
bash build_renegade_cli.sh
```

Po dokončení je příkaz `renegade` dostupný globálně.

---

## 🚀 Použití

### Interaktivní režim
Vstoupí do plného terminálového rozhraní:
```bash
renegade
```

### Jednorázový příkaz (Headless)
Pro rychlé dotazy nebo integraci do skriptů:
```bash
renegade -p "Analyzuj aktuální adresář a najdi chyby v JS souborech"
```

### YOLO mód
Automatické potvrzování všech akcí (nebezpečné, ale efektivní):
```bash
renegade -y
```

---

## 🛠 Provedené optimalizace pro Termux
- ✅ **Fix CPU Telemetry:** Odstraněn pád při detekci hardware na Androidu.
- ✅ **ESM Bundle Fix:** Opraveny konflikty v importech modulů v bundlovaném JS.
- ✅ **Native Exclusion:** Automatické vynechání nekompatibilních nativních modulů (`vscode-ide-companion`) pro hladkou instalaci.
- ✅ **Renegade Branding:** CLI je plně transformováno na edici Renegade.

---

## 📦 Struktura projektu
- `bundle/` - Finální zkompilovaný spustitelný kód.
- `packages/cli` - Jádro CLI rozhraní.
- `packages/core` - Sdílená logika a telemetrie.
- `build_renegade_cli.sh` - Hlavní sestavovací skript pro Termux.

---

## ⚠️ Varování
Renegade Kernel má přímý přístup k vašemu souborovému systému a shellu. Používejte jej s vědomím, že příkazy, které AI navrhne, mohou modifikovat váš systém.

---
**OPERATOR STATUS: ONLINE**
**SYSTEM: SECURE**
