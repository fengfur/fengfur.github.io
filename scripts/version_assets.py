"""Version local CSS/JS URLs by content hash before publishing.
Run: python scripts/version_assets.py
Works with this project's public/ folder or the flat GitHub Pages repository.
Existing versioned assets are retained for visitors holding older cached HTML.
"""
import hashlib
import json
import re
from pathlib import Path

repository = Path(__file__).resolve().parents[1]
root = repository / 'public' if (repository / 'public' / 'index.html').exists() else repository
assets = root / 'assets'
assets.mkdir(exist_ok=True)
versions = {}
for name in ('styles.css', 'gallery.js'):
    content = (root / name).read_bytes()
    digest = hashlib.sha256(content).hexdigest()[:12]
    stem, suffix = name.rsplit('.', 1)
    target = f'assets/{stem}.{digest}.{suffix}'
    (root / target).write_bytes(content)
    versions[name] = target
for name in ('index.html', 'privacy.html', 'terms.html'):
    path = root / name
    text = path.read_text(encoding='utf-8-sig')
    text = re.sub(r'(?<=href=")(?:assets/)?styles(?:\.[a-f0-9]{12})?\.css(?=")', versions['styles.css'], text)
    text = re.sub(r'(?<=src=")(?:assets/)?gallery(?:\.[a-f0-9]{12})?\.js(?=")', versions['gallery.js'], text)
    path.write_text(text, encoding='utf-8', newline='\n')
print(json.dumps(versions))

