# Font licenses

Every font served by dbaomarhuertasllc.com (assets/fonts/) is self-hosted here and licensed under the SIL Open Font License 1.1 (OFL). No Adobe, commercial, trial, system or third-party-site fonts are used, and no serif face ships on this site (owner's decision, 2026-10-11). Full license texts sit beside the files.

| Family | Version | License | Files | Source |
|---|---|---|---|---|
| Geist (variable: wght 100-900) | Google Fonts v5 | SIL OFL 1.1, (c) The Geist Project Authors | Geist-latin.woff2, Geist-latin-ext.woff2 | https://github.com/vercel/geist-font (via Google Fonts, https://fonts.google.com/specimen/Geist); license: OFL-Geist.txt |
| Geist Mono (variable: wght 400-600) | Google Fonts v6 | SIL OFL 1.1, (c) The Geist Project Authors | GeistMono-latin.woff2, GeistMono-latin-ext.woff2 | https://github.com/vercel/geist-font (via Google Fonts, https://fonts.google.com/specimen/Geist+Mono); license: OFL-GeistMono.txt |

The files are Google Fonts woff2 subsets (latin and latin-ext, selected by `unicode-range` in `fonts.css`), so visitors download only the subset they need. The font name tables carry the original OFL copyright and license URLs. Audited 2026-10-11: Cormorant Garamond, Inter and Fraunces removed (including the gated obvera/ and whitepapers/ pages and the favicon). The family design system shared with albena.ai standardises on Geist for display and text and Geist Mono for data. Do not add a font without adding its row and license text here; the test suite fails if any serif family is declared.
