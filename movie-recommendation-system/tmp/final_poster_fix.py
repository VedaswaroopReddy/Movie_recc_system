import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

poster_fixes = {
    "Kumbalangi Nights": "https://upload.wikimedia.org/wikipedia/en/b/b3/Kumbalangi_Nights.jpg",
    "Jawan": "https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg",
    "Sholay": "https://upload.wikimedia.org/wikipedia/en/5/52/Sholay-poster.jpg",
    "M.S. Dhoni: The Untold Story": "https://upload.wikimedia.org/wikipedia/en/3/33/M.S._Dhoni_-_The_Untold_Story_poster.jpg",
    "Bhaag Milkha Bhaag": "https://upload.wikimedia.org/wikipedia/en/4/42/Bhaag_Milkha_Bhaag_poster.jpg",
    "Salaar": "https://upload.wikimedia.org/wikipedia/en/6/6f/Salaar_ceasefire.jpg",
    "Gangs of Wasseypur": "https://upload.wikimedia.org/wikipedia/en/6/6a/Gangs_of_Wasseypur_poster.jpg"
}

for title, url in poster_fixes.items():
    # Escaping for regex
    safe_title = re.escape(title)
    # Find the block for this title
    pattern = rf'title: \"{safe_title}\",[\s\S]*?poster: \".*?\"'
    def replacer(m):
        return re.sub(r'poster: \".*?\"', f'poster: "{url}"', m.group(0))
    content = re.sub(pattern, replacer, content)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Final 7 photo-suspects replaced with authentic posters.")
