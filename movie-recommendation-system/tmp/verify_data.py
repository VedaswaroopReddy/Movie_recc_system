import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Check for placeholders
placeholders = re.findall(r'poster: \"https://via\.placeholder\.com.*?\"', content)
if placeholders:
    print(f'Remaining placeholders: {len(placeholders)}')
else:
    print('All placeholders removed!')

# Check for (film) in titles
bad_titles = re.findall(r'title: \".*?\(film.*?\).*?\"', content, re.IGNORECASE)
if bad_titles:
    print(f'Titles still containing (film): {len(bad_titles)}')
    for bt in bad_titles[:5]:
        print(f"  - {bt}")
else:
    print('All (film) tags removed from titles!')

# Check for /thumb/ in Wikipedia URLs
thumbs = re.findall(r'poster: \"https://upload\.wikimedia\.org/.*?/thumb/.*?\"', content)
if thumbs:
    print(f'Remaining /thumb/ URLs: {len(thumbs)}')
else:
    print('All Wikipedia /thumb/ URLs cleaned to root images!')
