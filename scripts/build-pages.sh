#!/bin/sh
# Build the Cloudflare Pages upload dir (dist/). Excludes repo-only files and ANY secrets (.htpasswd etc).
set -e
cd "$(dirname "$0")/.."
rm -rf dist && mkdir dist
tar --exclude=./dist --exclude=./.git --exclude=./.github --exclude=./docs --exclude=./scripts --exclude=./.build --exclude=./.omc \
    --exclude=./src --exclude=./tests --exclude=./node_modules --exclude=./package.json --exclude=./package-lock.json --exclude=./.cloudflare --exclude=./.wrangler --exclude='./*.md' --exclude=./.htaccess --exclude='*/.htaccess' \
    --exclude='.htpasswd' --exclude='.ht*' --exclude='.env*' --exclude='.ftp-credentials' --exclude=.DS_Store --exclude=./.gitignore --exclude=./wrangler.jsonc --exclude=deploy.sh --exclude=.nojekyll -cf - . | tar -xf - -C dist
test -f dist/index.html
! find dist -name '.ht*' -o -name '*.pem' -o -name '*.key' | grep . 
echo "dist: $(find dist -type f | wc -l) files"
