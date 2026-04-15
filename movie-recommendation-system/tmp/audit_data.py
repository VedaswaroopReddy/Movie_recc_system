import re
import json

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Title Cleanup
def clean_title(m):
    title = m.group(1)
    # Remove (film), (2024 film), (film series), (2007 film), etc.
    title = re.sub(r'\s*\((?:film|20\d\d|film series|.*? film)\)', '', title, flags=re.IGNORECASE)
    # Remove any extra info like Part 1 - Ceasefire
    # title = re.sub(r':\s*Part\s*\d.*', '', title, flags=re.IGNORECASE) 
    return f'title: "{title.strip()}"'

content = re.sub(r'title: \"(.*?)\"', clean_title, content)

# 2. Poster Placeholders
# I will manually map the IDs that I know have placeholders to real posters if I can find them.
# IDs with placeholders: 16 (Kantara), 17 (Vikram), 19 (KGF 1), 24 (Drishyam), 44 (Asuran), 48 (Baasha), 56 (Lucifer)
poster_map = {
    16: "https://upload.wikimedia.org/wikipedia/en/8/84/Kantara_poster.jpeg",
    17: "https://upload.wikimedia.org/wikipedia/en/9/93/Vikram_2022_poster.jpg",
    19: "https://upload.wikimedia.org/wikipedia/en/a/a9/KGF_Chapter_1_poster.jpg",
    24: "https://upload.wikimedia.org/wikipedia/en/8/8a/Drishyam_2013_poster.jpg",
    44: "https://upload.wikimedia.org/wikipedia/en/a/ad/Asuran_2019_poster.jpg",
    48: "https://upload.wikimedia.org/wikipedia/en/e/e1/Baasha_1995_poster.jpg",
    56: "https://upload.wikimedia.org/wikipedia/en/e/e0/Lucifer_film_poster.jpg"
}

for mid, url in poster_map.items():
    pattern = rf'id: {mid},[\s\S]*?poster: \"https://via\.placeholder\.com.*?\"'
    def replacer(m):
        return re.sub(r'poster: \".*?\"', f'poster: "{url}"', m.group(0))
    content = re.sub(pattern, replacer, content)

# 3. Strip /thumb/ from Wikipedia URLs to avoid CORS issues as identified earlier
# Wikipedia thumb links often look like /thumb/hash/file/width-filename
# We want /hash/file (the root image)
def strip_thumb(m):
    url = m.group(1)
    if "/thumb/" in url:
        # Example: https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/RRR_Poster.jpg/300px-RRR_Poster.jpg
        # Target: https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg
        parts = url.split('/')
        if 'thumb' in parts:
            parts.remove('thumb')
            # The last part is the thumbnail width, remove it
            if parts[-1].startswith('300px-') or parts[-1].startswith('200px-'):
                parts.pop()
            return f'poster: "{"/".join(parts)}"'
    return m.group(0)

content = re.sub(r'poster: \"(https://upload\.wikimedia\.org/.*?)\"', strip_thumb, content)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Data audit and cleanup complete.")
