import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

poster_map = {
    1: "https://upload.wikimedia.org/wikipedia/en/9/93/Baahubali_2_The_Conclusion_poster.jpg",
    100: "https://upload.wikimedia.org/wikipedia/en/2/2a/Kavaludaari_poster.jpg",
    105: "https://upload.wikimedia.org/wikipedia/en/6/63/Evaru_poster.jpg"
}

for mid, url in poster_map.items():
    pattern = rf'id: {mid},[\s\S]*?poster: \".*?\"'
    def replacer(m):
        return re.sub(r'poster: \".*?\"', f'poster: "{url}"', m.group(0))
    content = re.sub(pattern, replacer, content)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Final 3 posters fixed.")
