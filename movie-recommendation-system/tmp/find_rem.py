import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find Remaining placeholders
regex = r'id: (\d+),[\s\S]*?title: \"(.*?)\"[\s\S]*?poster: \"https://via\.placeholder\.com.*?\"'
matches = re.finditer(regex, content)
for m in matches:
    print(f"ID: {m.group(1)}, Title: {m.group(2)}")
