# Pipeline: dbaomarhuertasllc-site

Static site. Pages is currently configured as **"Deploy from a branch" (main, /)**, so a push to main publishes directly. These workflows do not change that until you switch the setting.

## `ci.yml` (PR + push main)
- **build-and-check**: `scripts/check_site.py` (HTML has a title, no duplicate ids, every internal href/src resolves; extensionless URLs resolve to `.html`; external links are not fetched), then a dry-run assembly of the site artifact.
- `/servicenow-lexicon/` and `/whitepapers/` links belong to other sites on the domain and are in `scripts/linkcheck-ignore.txt`.
- `.gitignore` previously ignored `.github/`; that line was removed so workflows can be tracked. `.htaccess`/`deploy.sh`/FTP deploy are untouched (deploy.sh is still ignored).
- **secrets-scan**: gitleaks 8.30.1 over full history.

## `pages.yml`
- **Pull request**: check + assemble, upload artifact `site-preview-<PR#>` (7 days). Download it from the run page and open `index.html` to review. Never deploys.
- **Push to main**: check + assemble + upload Pages artifact; `deploy` job (environment `github-pages`) runs **only if repo variable `PAGES_DEPLOY` = `true`**. Until then it is skipped and the branch-based publish keeps working.
- Artifact excludes `.git`, `.github`, `docs`, `scripts`, `*.md`.

## One-click switch to Actions-based deploy (Omar)
1. Merge this PR (branch publishing continues meanwhile).
2. Settings > Pages > Build and deployment > Source: change **Deploy from a branch** to **GitHub Actions**.
3. Settings > Secrets and variables > Actions > Variables: add `PAGES_DEPLOY` = `true`.
4. Settings > Environments > `github-pages`: optionally add required reviewers and restrict to `main`.
5. Re-run `pages` on main (or push). Verify the site, then done.
Rollback: set Source back to **Deploy from a branch** (main, /) and delete the variable.
Order matters: switch Source first, then set the variable. Setting the variable earlier makes the deploy job fail (harmless, nothing is published by it).
Custom domain/CNAME: no CNAME file exists in the repo and the Pages API shows none; check Settings > Pages before switching so the domain is not lost.
