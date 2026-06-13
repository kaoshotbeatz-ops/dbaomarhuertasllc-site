# Technical Deployment Guide

## Purpose

This package updates dbaomarhuertasllc.com with broader enterprise ServiceNow positioning, including ITAM, HAM, SAM, Source-to-Pay, procurement operations, onboarding/offboarding, CMDB, ITOM, and integrations.

## Deployment on GoDaddy cPanel

1. Open GoDaddy Hosting Dashboard.
2. Launch cPanel File Manager.
3. Open `/public_html`.
4. Upload `dbaomarhuertasllc_site_updated_itam_s2p.zip`.
5. Select the ZIP and click Extract.
6. Confirm `index.html` is directly inside `/public_html`, not inside a nested folder.
7. Hard refresh the browser with CMD+SHIFT+R on Mac or CTRL+F5 on Windows.

## Files changed

- `index.html`: updated hero messaging, expertise cards, and new capabilities section.
- `services.html`: rebuilt services around CMDB, ITOM, HAM, SAM, Source-to-Pay, onboarding/offboarding, automation, and integrations.
- `about.html`: added enterprise credibility and ITAM/procurement positioning.
- `industries.html`: updated industry language for asset, procurement, and workflow operations.
- `contact.html`: updated inquiry language to include HAM, SAM, Source-to-Pay, and onboarding/offboarding.
- `assets/styles.css`: added capability cloud and four-column grid support.

## Recommended verification

Open these URLs after deployment:

- `/index.html`
- `/services.html#itam`
- `/services.html#source-to-pay`
- `/services.html#onboarding`
- `/about.html`

## Cache note

If the old site still shows, verify that the domain points to cPanel hosting and not the old GoDaddy Website Builder product.
