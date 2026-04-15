import urllib.request, urllib.parse, re, json, time
def get_tmdb_backdrop(title):
    query = urllib.parse.quote(title + ' movie')
    try:
        req = urllib.request.Request(f'https://html.duckduckgo.com/html/?q={query}', headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        tmdb_url = re.search(r'https://www.themoviedb.org/movie/(\d+)', html)
        if tmdb_url:
            movie_id = tmdb_url.group(1)
            req2 = urllib.request.Request(f'https://www.themoviedb.org/movie/{movie_id}', headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            movie_html = urllib.request.urlopen(req2).read().decode('utf-8')
            # Look for backdrops in the HTML
            backdrop = re.search(r'https://image.tmdb.org/t/p/original([^\"\'>]+?\.jpg)', movie_html)
            if backdrop:
                return 'https://image.tmdb.org/t/p/original' + backdrop.group(1)
            
            # Alternative: look for any w1920_and_h800_multi_faces
            backdrop2 = re.search(r'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces([^\"\'>]+?\.jpg)', movie_html)
            if backdrop2:
                return 'https://image.tmdb.org/t/p/original' + backdrop2.group(1)
    except Exception as e:
        return str(e)
    return None

titles = ['C/o Kancharapalem', '777 Charlie', 'Jai Bhim', 'Soorarai Pottru', 'Pariyerum Perumal', 'Sita Ramam', 'Manjummel Boys', 'Jersey (2019)', 'Mahanati', 'Kumbalangi Nights', 'Nayakan']
out = {}
for t in titles:
    time.sleep(1)
    b = get_tmdb_backdrop(t)
    out[t] = b
    print(f"{t}: {b}")
with open('backdrops.json', 'w') as f:
    json.dump(out, f)
