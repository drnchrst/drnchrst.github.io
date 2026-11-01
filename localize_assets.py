"""Run once on your own machine: downloads every image still hosted on Webflow's CDN
into ./images and rewrites the HTML to use the local copies.
Usage: python3 localize_assets.py"""
import re, os, glob, urllib.request, urllib.parse
os.makedirs("images", exist_ok=True)
pat = re.compile(r'https://cdn\.prod\.website-files\.com/[^"\')\s]+')
cache = {}
for f in glob.glob("*.html"):
    s = open(f, encoding="utf-8").read()
    for url in set(pat.findall(s)):
        if url not in cache:
            base = urllib.parse.unquote(url.rsplit("/", 1)[1])
            name = re.sub(r"[^A-Za-z0-9._-]+", "-", base).strip("-").lower()
            path = os.path.join("images", name)
            if not os.path.exists(path):
                req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(req) as r, open(path, "wb") as out:
                    out.write(r.read())
                print("downloaded", name)
            cache[url] = path
        s = s.replace(url, cache[url])
    open(f, "w", encoding="utf-8").write(s)
print("Done. Commit the images/ folder along with the HTML.")
