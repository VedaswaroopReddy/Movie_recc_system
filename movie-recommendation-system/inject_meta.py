import os
import glob

folder = r'c:\Users\vedaswaroop\.antigravity\movie-recommendation-system'
meta_tag = '  <meta name="referrer" content="no-referrer">\n'

for filepath in glob.glob(os.path.join(folder, '*.html')):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<meta name="referrer"' not in content:
        content = content.replace('</head>', meta_tag + '</head>')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Injected into {os.path.basename(filepath)}')
    else:
        print(f'Already in {os.path.basename(filepath)}')
