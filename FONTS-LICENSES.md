# Font licenses - dbaomarhuertasllc.com

Audited 2026-10-11. This branch (builds on `fix/self-host-fonts`, commit db67c10) serves all fonts from `assets/fonts/`; no Google Fonts CDN requests (GDPR IP-transfer issue removed). **The live site still loads Inter from fonts.googleapis.com until this branch is merged and deployed (needs Omar's approval).**

| Family | Use | License | Source | Files |
|---|---|---|---|---|
| Inter (latin, latin-ext) | UI / body | SIL OFL 1.1 | Rasmus Andersson / Google Fonts | `assets/fonts/Inter-*.woff2`, `OFL-Inter.txt` |
| Fraunces (500, 700; latin, latin-ext) | headings | SIL OFL 1.1 | Undercase Type / Google Fonts | `assets/fonts/Fraunces-*.woff2`, `OFL-Fraunces.txt` |

System stacks (ui-sans-serif, Georgia, Menlo, etc.) are fallbacks only; nothing copied from macOS/Windows. No icon fonts.
