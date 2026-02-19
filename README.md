# 💀 RENEGADE KERNEL - CLI

![Renegade Banner](https://img.shields.io/badge/VERSION-0.30.0--NIGHTLY-red?style=for-the-badge)
![Status](https://img.shields.io/badge/STATUS-OPERATIONAL-green?style=for-the-badge)
![Platform](https://img.shields.io/badge/PLATFORM-TERMUX%20|%20LINUX-blue?style=for-the-badge)

**Renegade Kernel** je autonomní rozhraní Operátora, optimalizované pro Android (Termux) a Linux. Zapomeň na omezení běžných aplikací – tohle je nástroj pro ty, kteří chtějí mít plnou kontrolu.

---

## 🛠 Návod pro úplné začátečníky (Krok za krokem)

Tento návod tě provede instalací od úplné nuly. Sleduj kroky přesně tak, jak jsou napsané.

### 1. Stažení Termuxu
**DŮLEŽITÉ:** Nikdy nestahuj Termux z Google Play (je tam zastaralá a nefunkční verze).
- Jdi na [F-Droid (Termux)](https://f-droid.org/en/packages/com.termux/)
- Sjeď dolů k sekci "Packages" a stáhni si APK (většinou `universal` nebo `arm64-v8a`).
- Nainstaluj APK do mobilu.

### 2. První spuštění a příprava systému
Otevři Termux a postupně zadej tyto příkazy (vždy potvrď `Enter` a pokud se tě zeptá na `[Y/n]`, napiš `y` a dej `Enter`):

```bash
pkg update && pkg upgrade
```
*Poznámka: Pokud uvidíš otázky ohledně verzí konfiguračních souborů, prostě dávej Enter (výchozí nastavení).*

Povol přístup k úložišti (vyskočí okno v Androidu, potvrď ho):
```bash
termux-setup-storage
```

### 3. Instalace potřebných nástrojů
Musíme do Termuxu přidat Git (pro stažení kódu) a Node.js (pro spuštění programu):

```bash
pkg install git nodejs-lts
```

### 4. Stažení a instalace Renegade Kernelu
Teď stáhneme samotný Renegade Kernel z GitHubu a spustíme automatický builder:

```bash
git clone https://github.com/zombiegirlcz/RENEGATE-karnel-cli.git
cd RENEGATE-karnel-cli
bash build_renegade_cli.sh
```
*Tento proces může trvat pár minut, protože stahuje a kompiluje všechny závislosti.*

### 5. Hotovo! Jak to spustit?
Po dokončení builderu můžeš Renegade Kernel spustit odkudkoliv příkazem:

```bash
renegade
```

---

## 🚀 Rychlé tipy pro ovládání

- **Interaktivní režim:** Stačí napsat `renegade`.
- **YOLO mód:** Pokud nechceš nic potvrzovat a nechat AI dělat svou práci: `renegade -y`.
- **Update:** Pokud vyjde nová verze, stačí jít do složky `cd ~/RENEGATE-karnel-cli` a spustit `git pull && bash build_renegade_cli.sh`.

---

## 🛠 Co Renegade Kernel umí?
- **Práce se soubory:** Můžeš mu říct "Oprav chyby v mém Python skriptu" nebo "Vytvoř webovou stránku".
- **Shell přístup:** Má přístup k tvému Termuxu, může instalovat balíčky nebo spouštět scripty.
- **Autonomie:** Pokud mu dáš úkol, dokáže si sám vyhledat informace nebo opravit své chyby.

---

## ⚠️ VAROVÁNÍ
Tento nástroj má destruktivní schopnosti. Pokud mu dovolíš (např. v YOLO módu), může smazat soubory nebo přepsat systémové nastavení. **Vždy věz, co děláš.**

---
**OPERATOR STATUS: ONLINE**
**SYSTEM: SECURE**
**BY RENEGADE COMMUNITY**