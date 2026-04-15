import urllib.request, urllib.parse, json, time, ssl

# Bypass SSL issues on Windows
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

API_KEY = "15d2ea6d0dc1d476efbca3eba2428bab"
BASE = "https://api.themoviedb.org/3"

movies_to_fix = [
    (12, "KGF Chapter 2"),
    (13, "Premam Telugu"),
    (14, "Bheemla Nayak"),
    (18, "Ponniyin Selvan I"),
    (22, "Soorarai Pottru"),
    (23, "Kumbalangi Nights"),
    (24, "Drishyam Malayalam 2013"),
    (25, "Minnal Murali"),
    (38, "Happy Days Telugu 2007"),
    (39, "Chatrapathi"),
    (40, "Pokiri Telugu"),
    (41, "Bommarillu"),
    (42, "Pelli Choopulu"),
    (43, "Fidaa Telugu"),
    (44, "Asuran"),
    (45, "Super Deluxe"),
    (46, "M.S. Dhoni The Untold Story"),
    (47, "Bhaag Milkha Bhaag"),
    (48, "Baasha"),
    (49, "Roja Tamil"),
    (50, "Bombay Tamil 1995"),
    (51, "Super 30"),
    (52, "Bajrangi Bhaijaan"),
    (53, "Swades"),
    (54, "Thuppakki"),
    (55, "Ayyappanum Koshiyum"),
    (56, "Lucifer Malayalam"),
    (57, "Premalu"),
    (58, "Manjummel Boys"),
    (59, "Aavesham"),
    (60, "Kirik Party"),
    (61, "Ulidavaru Kandanthe"),
    (62, "Mufti Kannada"),
    (63, "777 Charlie"),
    (64, "Ekkadiki Pothavu Chinnavada"),
    (65, "Agent Sai Srinivasa Athreya"),
    (66, "Brochevarevarura"),
    (67, "Mathu Vadalara"),
    (68, "Kshanam"),
    (69, "Goodachari"),
    (70, "C/o Kancharapalem"),
    (71, "Karthikeya 2"),
    (72, "Salaar"),
    (73, "Kalki 2898 AD"),
    (74, "Animal 2023"),
    (75, "Billa Tamil 2007"),
    (76, "Nayakan"),
    (77, "Pariyerum Perumal"),
    (78, "Jai Bhim"),
    (79, "Vada Chennai"),
    (80, "Ratsasan"),
    (81, "Gargi Tamil"),
    (82, "Karnan Tamil"),
    (83, "Iruvar"),
    (84, "Gangs of Wasseypur"),
    (85, "Black Friday 2004"),
    (86, "Taare Zameen Par"),
    (87, "Munna Bhai MBBS"),
    (88, "The Lunchbox"),
    (89, "Paan Singh Tomar"),
    (90, "Udaan 2010"),
    (91, "Anand 1971"),
    (92, "Maheshinte Prathikaaram"),
    (93, "Thondimuthalum Driksakshiyum"),
    (94, "Aadujeevitham The Goat Life"),
    (95, "Bangalore Days"),
    (96, "Ustad Hotel"),
    (97, "Dia Kannada 2020"),
    (98, "RangiTaranga"),
    (99, "Lucia Kannada"),
    (100, "Kavaludaari"),
    (101, "Vedam Telugu"),
    (102, "Mallesham"),
    (103, "Oohalu Gusagusalade"),
    (104, "1 Nenokkadine"),
    (105, "Evaru"),
]

results = {}
for local_id, search_query in movies_to_fix:
    url = f"{BASE}/search/movie?api_key={API_KEY}&query={urllib.parse.quote(search_query)}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        resp = urllib.request.urlopen(req, context=ctx, timeout=10)
        data = json.loads(resp.read().decode("utf-8"))
        if data.get("results"):
            poster_path = data["results"][0].get("poster_path")
            if poster_path:
                full_url = f"https://image.tmdb.org/t/p/w500{poster_path}"
                results[local_id] = full_url
                print(f"OK  id={local_id:3d} {search_query:40s} => {full_url}")
            else:
                print(f"MISS id={local_id:3d} {search_query:40s} => no poster_path")
        else:
            print(f"MISS id={local_id:3d} {search_query:40s} => no results")
    except Exception as e:
        print(f"ERR id={local_id:3d} {search_query:40s} => {e}")
    time.sleep(0.3)

# Output as JS-ready map
print("\n\n// === PASTE INTO data.js ===")
print("const TMDB_POSTER_MAP = {")
for k, v in sorted(results.items()):
    print(f'  {k}: "{v}",')
print("};")
