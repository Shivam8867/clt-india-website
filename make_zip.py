import os, zipfile

BASE = r'D:\CLT INDIA WEBSITE'
EXCLUDE_DIRS = {'annual-reports', 'newsletters', 'audit-reports', 'Impact docs', '.git'}
zipname = os.path.join(BASE, 'clt-india-hosting.zip')
zf = zipfile.ZipFile(zipname, 'w', zipfile.ZIP_DEFLATED)
count = 0

for r, d, fs in os.walk(BASE):
    rel = os.path.relpath(r, BASE)
    parts = rel.replace('\\', '/').split('/')
    if any(p in EXCLUDE_DIRS for p in parts) or '.git' in parts:
        continue
    for f in fs:
        fp = os.path.join(r, f)
        arc = os.path.relpath(fp, BASE)
        zf.write(fp, arc)
        count += 1

zf.close()
print(f'Created {zipname}')
print(f'Files: {count}')
print(f'Size: {os.path.getsize(zipname) // 1024} KB')
