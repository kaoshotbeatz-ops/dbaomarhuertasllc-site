#!/usr/bin/env python3
"""Static-site checker (stdlib only): HTML parses, has <title>, no duplicate ids,
and every internal href/src points at a file that exists. External links are not fetched.
Usage: check_site.py [site_dir]   exit 1 on errors."""
import sys, os
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote

ROOT = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else ".")
SKIP_DIRS = {".git", ".github", "node_modules", "docs", "scripts", "_site"}
errors, warnings = [], []
# Path prefixes served by other sites/hosts (one per line, # comments) are not checked.
_ig = os.path.join(ROOT, "scripts", "linkcheck-ignore.txt")
IGNORE = [l.strip() for l in open(_ig)] if os.path.exists(_ig) else []
IGNORE = [l for l in IGNORE if l and not l.startswith("#")]

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links, self.ids, self.title, self.in_title, self.dups = [], set(), "", False, []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            if a["id"] in self.ids: self.dups.append(a["id"])
            self.ids.add(a["id"])
        if tag == "title": self.in_title = True
        for k in ("href", "src"):
            if a.get(k) and tag in ("a", "link", "script", "img", "source", "iframe", "video", "audio"):
                self.links.append(a[k])
    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
    def handle_data(self, d):
        if self.in_title: self.title += d

def resolve(page, link):
    u = urlparse(link)
    if u.scheme or link.startswith(("//", "#", "mailto:", "tel:", "data:", "javascript:")): return True
    path = unquote(u.path)
    if not path: return True
    base = ROOT if path.startswith("/") else os.path.dirname(page)
    full = os.path.normpath(os.path.join(base, path.lstrip("/") if path.startswith("/") else path))
    if any(path.startswith(i) for i in IGNORE): return True
    if os.path.isdir(full): return os.path.exists(os.path.join(full, "index.html"))
    # extensionless URLs (.htaccess / Pages-style) resolve to <name>.html
    return os.path.exists(full) or os.path.exists(full + ".html")

pages = 0
for d, dirs, files in os.walk(ROOT):
    dirs[:] = [x for x in dirs if x not in SKIP_DIRS]
    for f in files:
        if not f.endswith(".html"): continue
        p = os.path.join(d, f); rel = os.path.relpath(p, ROOT); pages += 1
        text = open(p, encoding="utf-8", errors="replace").read()
        if not text.lstrip().lower().startswith("<!doctype html"): warnings.append(f"{rel}: missing <!doctype html>")
        ps = P(); ps.feed(text)
        if not ps.title.strip() and "http-equiv=\"refresh\"" not in text.lower(): errors.append(f"{rel}: missing/empty <title>")
        for i in sorted(set(ps.dups)): warnings.append(f"{rel}: duplicate id '{i}'")
        for l in ps.links:
            if not resolve(p, l): errors.append(f"{rel}: broken internal link -> {l}")
print(f"checked {pages} html files")
for w in warnings: print("WARN ", w)
for e in errors: print("ERROR", e)
print(f"{len(errors)} error(s), {len(warnings)} warning(s)")
sys.exit(1 if errors else 0)
