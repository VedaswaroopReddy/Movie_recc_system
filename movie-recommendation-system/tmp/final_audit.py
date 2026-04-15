import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find title and poster
matches = re.finditer(r'title: \"(.*?)\"[\s\S]*?poster: \"(.*?)\"', content)

print("--- AUDIT RESULTS ---")
for m in matches:
    title, url = m.groups()
    if "commons" in url.lower():
        print(f"SUSPECT: {title} | URL: {url}")

print("--- END OF AUDIT ---")
