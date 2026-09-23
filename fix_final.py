import glob
import os
import re

BASE = r'D:\CLT INDIA WEBSITE'
files = glob.glob(os.path.join(BASE, '*.html'))

for f in files:
    fname = os.path.basename(f)
    if fname in ['footer.html', 'header.html']:
        continue
    
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    original = content
    fixed = content
    
    # 1. Remove ALL </main> that appear before </head> (in the head section)
    # Match </main> anywhere before </head> and remove it
    if '</main>' in fixed[:fixed.find('</head>') if '</head>' in fixed else 500]:
        fixed = fixed.replace('</main>\n', '', 1)
        fixed = fixed.replace('</main>', '', 1)
    
    # 2. Fix broken defer attributes (remove duplicates)
    fixed = fixed.replace('defer defer', 'defer')
    fixed = fixed.replace('defer?v=1.16', 'defer')
    
    # 3. Fix script.js URLs
    fixed = fixed.replace('src="script.js?v=1.16"', 'src="script.js?v=1.17" defer')
    if 'src="script.js?v=1.17"' in fixed and 'defer' not in fixed.split('script.js?v=1.17"')[1].split('>')[0]:
        fixed = fixed.replace('src="script.js?v=1.17"', 'src="script.js?v=1.17" defer')
    
    # 4. Fix include.js defer
    if 'src="include.js"' in fixed:
        after = fixed.split('include.js')[1].split('>')[0]
        if 'defer' not in after:
            fixed = fixed.replace('src="include.js"', 'src="include.js" defer')
    
    # 5. Add display=swap to Google Fonts if missing
    if 'display=swap' not in fixed and 'fonts.googleapis.com/css2?' in fixed:
        fixed = fixed.replace('fonts.googleapis.com/css2?', 'fonts.googleapis.com/css2?display=swap&')
    
    # 6. Add </main> before scripts at bottom if not present
    if '</main>' not in fixed and '<script src="script.js' in fixed:
        sp = fixed.find('<script src="script.js')
        if sp > 0:
            fixed = fixed[:sp] + '</main>\n' + fixed[sp:]
    
    # 7. Update stylesheet version
    fixed = fixed.replace('style.css?v=1.14', 'style.css?v=1.17')
    
    # 8. Make sure about.js and other page-specific scripts also have defer
    # These are fine as-is, they're small scripts
    
    if fixed != original:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(fixed)
        print(f'Fixed: {fname}')

print('\nDone fixing all HTML files!')

# Now verify index.html
with open(os.path.join(BASE, 'index.html'), 'r') as fh:
    idx = fh.read()

# Check for issues
issues = []
if '</main>\n' in idx[:500]:
    issues.append('Still has </main> in head')
if 'defer defer' in idx:
    issues.append('Double defer')
if 'defer?v=1.16' in idx:
    issues.append('Broken URL')
if idx.count('<main>') != idx.count('</main>'):
    issues.append(f'Mismatched main tags: <main>={idx.count("<main>")}, </main>={idx.count("</main>")}')
if issues:
    print(f'Index.html issues: {issues}')
else:
    print('Index.html looks good!')

# Same check for about.html
with open(os.path.join(BASE, 'about.html'), 'r') as fh:
    abt = fh.read()
issues2 = []
if '</main>\n' in abt[:500]:
    issues2.append('Still has </main> in head')
if 'defer defer' in abt:
    issues2.append('Double defer')
if issues2:
    print(f'About.html issues: {issues2}')
else:
    print('About.html looks good!')
