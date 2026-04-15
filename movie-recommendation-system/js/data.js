// ==========================================
// DATA.JS — Movie Database & Rule Definitions
// ==========================================

/**
 * Default movie catalog — 15 Indian movies (mostly Telugu).
 * Each movie has: id, title, genres (array), language, rating (1-5), year, poster (URL).
 *
 * NOTE: genres is an ARRAY to support multiple genres per movie.
 */
const DEFAULT_MOVIES = [
  {
    id: 1,
    title: "Baahubali 2: The Conclusion",
    genres: ["Action", "Drama"],
    language: "Telugu",
    rating: 8.2,
    year: 2017,
    poster: "https://image.tmdb.org/t/p/w500/yF6tB5b1YfQ57wS06W1u60Vf897.jpg" // High-res Upgrade
  },
  {
    id: 2,
    title: "RRR",
    genres: ["Action", "Drama"],
    language: "Telugu",
    rating: 7.8,
    year: 2022,
    poster: "https://image.tmdb.org/t/p/w500/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg" // High-res Upgrade
  },
  {
    id: 3,
    title: "Arjun Reddy",
    genres: ["Romance", "Drama"],
    language: "Telugu",
    rating: 7.9,
    year: 2017,
    poster: "https://image.tmdb.org/t/p/w500/kHubDgL59I5hCn7ccBYvU7bKY1r.jpg" // High-res Upgrade
  },
  {
    id: 4,
    title: "Ala Vaikunthapurramuloo",
    genres: ["Action", "Comedy"],
    language: "Telugu",
    rating: 7.3,
    year: 2020,
    poster: "https://image.tmdb.org/t/p/w500/nrVloCa2hCFOztRF1DZU2jnWIiQ.jpg" // Redirected to '96' or similar high-res
  },
  {
    id: 5,
    title: "Eega",
    genres: ["Sci-Fi", "Comedy"],
    language: "Telugu",
    rating: 7.7,
    year: 2012,
    poster: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg" // 3 Idiots (shifted for better quality search)
  },
  {
    id: 6,
    title: "Pushpa: The Rise",
    genres: ["Action", "Thriller"],
    language: "Telugu",
    rating: 7.6,
    year: 2021,
    poster: "https://image.tmdb.org/t/p/w500/80anhviEFSyLLY71JNttKkGxkpz.jpg" // High-res Upgrade
  },
  {
    id: 7,
    title: "Jersey",
    genres: ["Drama", "Romance"],
    language: "Telugu",
    rating: 8.5,
    year: 2019,
    poster: "https://image.tmdb.org/t/p/w500/14KeWSkgzTbfJmmD4bXT9mwkaYz.jpg" // Bheemla Nayak / High-res
  },
  {
    id: 8,
    title: "Mahanati",
    genres: ["Drama"],
    language: "Telugu",
    rating: 8.5,
    year: 2018,
    poster: "https://image.tmdb.org/t/p/w500/78YoIO3gzkZPC1jotfDmolNDmgT.jpg" // High-res Upgrade
  },
  {
    id: 9,
    title: "3 Idiots",
    genres: ["Comedy", "Drama"],
    language: "Hindi",
    rating: 8.4,
    year: 2009,
    poster: "https://image.tmdb.org/t/p/w500/wbE5SRTZFtQxgj2nIo4HJpQDk0k.jpg" // 3 Idiots High-res
  },
  {
    id: 10,
    title: "Dangal",
    genres: ["Drama", "Action"],
    language: "Hindi",
    rating: 8.3,
    year: 2016,
    poster: "https://image.tmdb.org/t/p/w500/1CoKNi3XVyijPCvy0usDbSWEXAg.jpg" // Dangal High-res
  },
  {
    id: 11,
    title: "Vikram Vedha",
    genres: ["Thriller", "Action"],
    language: "Tamil",
    rating: 8.2,
    year: 2017,
    poster: "https://image.tmdb.org/t/p/w500/ob9YxdzRu5lfKgz0PNrlL45dorf.jpg" // Vikram Vedha High-res
  },
  {
    id: 12,
    title: "KGF: Chapter 2",
    genres: ["Action", "Drama"],
    language: "Kannada",
    rating: 8.3,
    year: 2022,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/d/d0/K.G.F_Chapter_2.jpg"
  },
  {
    id: 13,
    title: "Premam",
    genres: ["Romance", "Comedy"],
    language: "Telugu",
    rating: 8.3,
    year: 2016,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/3/32/Premam_film_poster.jpg"
  },
  {
    id: 14,
    title: "Bheemla Nayak",
    genres: ["Action", "Thriller"],
    language: "Telugu",
    rating: 6.3,
    year: 2022,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/b/bb/Bheemla_Nayak.jpg"
  },
  {
    id: 15,
    title: "Sita Ramam",
    genres: ["Romance", "Drama"],
    language: "Telugu",
    rating: 8.6,
    year: 2022,
    poster: "https://image.tmdb.org/t/p/w500/t1O94ZBzsQXJihtVkrsStRLyUDR.jpg" // Sita Ramam High-res
  },
  {
    id: 16,
    title: "Kantara",
    genres: ["Action", "Thriller"],
    language: "Kannada",
    rating: 8.2,
    year: 2022,
    poster: "https://image.tmdb.org/t/p/w500/jIsKmkxMzdCZ0Ux1GVSnu8m6Na6.jpg" // Kantara High-res
  },
  {
    id: 17,
    title: "Vikram",
    genres: ["Action", "Thriller"],
    language: "Tamil",
    rating: 8.3,
    year: 2022,
    poster: "https://image.tmdb.org/t/p/w500/774UV1aCURb4s4JfEFg3IEMu5Zj.jpg" // Vikram High-res
  },
  {
    id: 18,
    title: "Ponniyin Selvan: I",
    genres: ["Action", "Drama"],
    language: "Tamil",
    rating: 7.6,
    year: 2022,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/c/c3/Ponniyin_Selvan_I.jpg"
  },
  {
    id: 19,
    title: "KGF: Chapter 1",
    genres: ["Action", "Drama"],
    language: "Kannada",
    rating: 8.2,
    year: 2018,
    poster: "https://image.tmdb.org/t/p/w500/ltHlJwvxKv7d0ooCiKSAvfwV9tX.jpg" // KGF 1 High-res
  },
  {
    id: 20,
    title: "Kaithi",
    genres: ["Action", "Thriller"],
    language: "Tamil",
    rating: 8.4,
    year: 2019,
    poster: "https://image.tmdb.org/t/p/w500/mxvOvom5zKRp4WPURKrhjoatt4P.jpg" // Kaithi High-res
  },
  {
    id: 21,
    title: "Master",
    genres: ["Action", "Thriller"],
    language: "Tamil",
    rating: 7.3,
    year: 2021,
    poster: "https://image.tmdb.org/t/p/w500/wjbOlovDadOdPKkSAMohLCjbIsc.jpg" // Master High-res
  },
  {
    id: 22,
    title: "Soorarai Pottru",
    genres: ["Drama"],
    language: "Tamil",
    rating: 8.7,
    year: 2020,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/6/61/Soorarai_Pottru.JPG"
  },
  {
    id: 23,
    title: "Kumbalangi Nights",
    genres: ["Drama", "Comedy"],
    language: "Malayalam",
    rating: 8.5,
    year: 2019,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/b/b3/Kumbalangi_Nights.jpg"
  },
  {
    id: 24,
    title: "Drishyam",
    genres: ["Thriller", "Drama"],
    language: "Malayalam",
    rating: 8.3,
    year: 2013,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/8/8a/Drishyam_2013_poster.jpg"
  },
  {
    id: 25,
    title: "Minnal Murali",
    genres: ["Action", "Sci-Fi"],
    language: "Malayalam",
    rating: 7.8,
    year: 2021,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/b/bf/Minnal_Murali.jpg"
  },
  {
    id: 26,
    title: "Jawan",
    genres: ["Action", "Thriller"],
    language: "Hindi",
    rating: 7.0,
    year: 2023,
    poster: "https://image.tmdb.org/t/p/w500/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg" // Jawan High-res
  },
  {
    id: 27,
    title: "Pathaan",
    genres: ["Action", "Thriller"],
    language: "Hindi",
    rating: 5.9,
    year: 2023,
    poster: "https://image.tmdb.org/t/p/w500/arf00BkwvXo0CFKbaD9OpqdE4Nu.jpg" // Pathaan High-res
  },
  {
    id: 28,
    title: "PK",
    genres: ["Comedy", "Sci-Fi"],
    language: "Hindi",
    rating: 8.1,
    year: 2014,
    poster: "https://image.tmdb.org/t/p/w500/z2x2Y4tncefsIU7h82gmUM5vnBJ.jpg" // PK High-res
  },
  {
    id: 29,
    title: "Gully Boy",
    genres: ["Drama", "Romance"],
    language: "Hindi",
    rating: 7.9,
    year: 2019,
    poster: "https://image.tmdb.org/t/p/w500/4RE7TD5TqEXbPKyUHcn7CSeMlrJ.jpg" // Gully Boy High-res
  },
  {
    id: 30,
    title: "Andhadhun",
    genres: ["Thriller", "Comedy"],
    language: "Hindi",
    rating: 8.2,
    year: 2018,
    poster: "https://image.tmdb.org/t/p/w500/dy3K6hNvwE05siGgiLJcEiwgpdO.jpg" // Andhadhun High-res
  },
  {
    id: 31,
    title: "Zindagi Na Milegi Dobara",
    genres: ["Drama", "Romance"],
    language: "Hindi",
    rating: 8.2,
    year: 2011,
    poster: "https://image.tmdb.org/t/p/w500/hKO9O715wYxjkQSEv47giCYcyO8.jpg" // ZNMD High-res
  },
  {
    id: 32,
    title: "Lagaan",
    genres: ["Drama"],
    language: "Hindi",
    rating: 8.1,
    year: 2001,
    poster: "https://image.tmdb.org/t/p/w500/yNX9lFRAFeNLNRIXdqZK9gYrYKa.jpg" // Lagaan High-res
  },
  {
    id: 33,
    title: "Sholay",
    genres: ["Action", "Drama"],
    language: "Hindi",
    rating: 8.1,
    year: 1975,
    poster: "https://image.tmdb.org/t/p/w500/ya9bwgqA4eNl5bQ9QqS0jcmRoBS.jpg" // Sholay High-res
  },
  {
    id: 34,
    title: "Rangasthalam",
    genres: ["Action", "Drama"],
    language: "Telugu",
    rating: 8.2,
    year: 2018,
    poster: "https://image.tmdb.org/t/p/w500/yiEzDgBBFC25Zd6z0r7sMngn5vr.jpg" // Rangasthalam High-res
  },
  {
    id: 35,
    title: "Magadheera",
    genres: ["Action", "Romance"],
    language: "Telugu",
    rating: 7.7,
    year: 2009,
    poster: "https://image.tmdb.org/t/p/w500/xK7MEV56GF291VG0U5XnVJuvNv3.jpg" // Magadheera High-res
  },
  {
    id: 36,
    title: "Geetha Govindam",
    genres: ["Romance", "Comedy"],
    language: "Telugu",
    rating: 7.7,
    year: 2018,
    poster: "https://image.tmdb.org/t/p/w500/sTreb0ajewXqeIqAyZ0IWtafoB5.jpg" // Geetha Govindam High-res
  },
  {
    id: 37,
    title: "Arundhati",
    genres: ["Horror", "Fantasy"],
    language: "Telugu",
    rating: 8.1,
    year: 2009,
    poster: "https://image.tmdb.org/t/p/w500/mhw0y6E4WbQ4LjlW3962vevh9BQ.jpg" // Arundhati High-res
  },
  {
    id: 38,
    title: "Happy Days",
    genres: ["Drama", "Romance"],
    language: "Telugu",
    rating: 7.9,
    year: 2007,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/7/78/Happy_Days_%282007_film%29.jpg"
  },
  {
    id: 39,
    title: "Chatrapathi",
    genres: ["Action", "Drama"],
    language: "Telugu",
    rating: 7.6,
    year: 2005,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/e/eb/Chhatrapati_movie_poster.jpg"
  },
  {
    id: 40,
    title: "Pokiri",
    genres: ["Action", "Thriller"],
    language: "Telugu",
    rating: 7.9,
    year: 2006,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/b/b2/Pokiri_movie_poster.jpg"
  },
  {
    id: 41,
    title: "Bommarillu",
    genres: ["Romance", "Comedy"],
    language: "Telugu",
    rating: 8.2,
    year: 2006,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/a/aa/Bommarillu_poster.jpg"
  },
  {
    id: 42,
    title: "Pelli Choopulu",
    genres: ["Romance", "Comedy"],
    language: "Telugu",
    rating: 8.2,
    year: 2016,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/b/b3/Pelli_Choopulu_poster.jpg"
  },
  {
    id: 43,
    title: "Fidaa",
    genres: ["Romance", "Drama"],
    language: "Telugu",
    rating: 7.5,
    year: 2017,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/8/8c/Fidaa_poster.jpg"
  },
  {
    id: 44,
    title: "Asuran",
    genres: ["Action", "Drama"],
    language: "Tamil",
    rating: 8.4,
    year: 2019,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/a/ad/Asuran_2019_poster.jpg"
  },
  {
    id: 45,
    title: "Super Deluxe",
    genres: ["Thriller", "Drama"],
    language: "Tamil",
    rating: 8.3,
    year: 2019,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/a/a1/Super_Deluxe_film_poster.jpg"
  },
  {
    id: 46,
    title: "M.S. Dhoni: The Untold Story",
    genres: ["Biography", "Sports"],
    language: "Hindi",
    rating: 8.0,
    year: 2016,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/3/33/M.S._Dhoni_-_The_Untold_Story_poster.jpg"
  },
  {
    id: 47,
    title: "Bhaag Milkha Bhaag",
    genres: ["Biography", "Sports"],
    language: "Hindi",
    rating: 8.2,
    year: 2013,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/4/42/Bhaag_Milkha_Bhaag_poster.jpg"
  },
  {
    id: 48,
    title: "Baasha",
    genres: ["Action", "Drama"],
    language: "Tamil",
    rating: 8.3,
    year: 1995,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/e/e1/Baasha_1995_poster.jpg"
  },
  {
    id: 49,
    title: "Roja",
    genres: ["Romance", "Drama"],
    language: "Tamil",
    rating: 8.1,
    year: 1992,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/d/d7/Roja_film_poster.jpg"
  },
  {
    id: 50,
    title: "Bombay",
    genres: ["Romance", "Drama"],
    language: "Tamil",
    rating: 8.1,
    year: 1995,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/2/28/Bombay_1995_poster.jpg"
  },
  {
    id: 51,
    title: "Super 30",
    genres: ["Drama", "Biography"],
    language: "Hindi",
    rating: 7.9,
    year: 2019,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/2/29/Super_30_The_Film.jpg"
  },
  {
    id: 52,
    title: "Bajrangi Bhaijaan",
    genres: ["Action", "Drama"],
    language: "Hindi",
    rating: 8.0,
    year: 2015,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/d/dd/Bajrangi_Bhaijaan_Poster.jpg"
  },
  {
    id: 53,
    title: "Swades",
    genres: ["Drama", "Romance"],
    language: "Hindi",
    rating: 8.2,
    year: 2004,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/8/85/Swades_poster.jpg"
  },
  {
    id: 54,
    title: "Thuppakki",
    genres: ["Action", "Thriller"],
    language: "Tamil",
    rating: 8.0,
    year: 2012,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/b/be/Thuppakki_poster.jpg"
  },
  {
    id: 55,
    title: "Ayyappanum Koshiyum",
    genres: ["Action", "Drama"],
    language: "Malayalam",
    rating: 8.0,
    year: 2020,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/1/1c/Ayyappanum_Koshiyum_Poster.jpg"
  },
  {
    id: 56,
    title: "Lucifer",
    genres: ["Action", "Drama"],
    language: "Malayalam",
    rating: 7.5,
    year: 2019,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/e/e0/Lucifer_film_poster.jpg"
  },
  {
    id: 57,
    title: "Premalu",
    genres: ["Romance", "Comedy"],
    language: "Malayalam",
    rating: 8.0,
    year: 2024,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/c/c5/Premalu_film_poster.jpg"
  },
  {
    id: 58,
    title: "Manjummel Boys",
    genres: ["Thriller", "Drama"],
    language: "Malayalam",
    rating: 8.6,
    year: 2024,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/9/99/Manjummel_Boys_poster.jpg"
  },
  {
    id: 59,
    title: "Aavesham",
    genres: ["Action", "Comedy"],
    language: "Malayalam",
    rating: 8.3,
    year: 2024,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/d/d1/Aavesham.jpg"
  },
  {
    id: 60,
    title: "Kirik Party",
    genres: ["Comedy", "Romance"],
    language: "Kannada",
    rating: 8.3,
    year: 2016,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/1/1f/Kirik_Part_Poster.jpg"
  },
  {
    id: 61,
    title: "Ulidavaru Kandanthe",
    genres: ["Thriller", "Drama"],
    language: "Kannada",
    rating: 8.4,
    year: 2014,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/1/16/Ulidavaru_Kandanthe_poster.jpg"
  },
  {
    id: 62,
    title: "Mufti",
    genres: ["Action", "Thriller"],
    language: "Kannada",
    rating: 8.0,
    year: 2017,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/c/c6/Mufti_%28film%29.jpg"
  },
  {
    id: 63,
    title: "777 Charlie",
    genres: ["Adventure", "Comedy"],
    language: "Kannada",
    rating: 8.8,
    year: 2022,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/1/19/777_Charlie_official_poster.jpg"
  },
  {
    id: 64,
    title: "Ekkadiki Pothavu Chinnavada",
    genres: ["Horror", "Comedy"],
    language: "Telugu",
    rating: 7.4,
    year: 2016,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/4/44/Ekkadiki_Pothavu_Chinnavada.jpg"
  },
  {
    id: 65,
    title: "Agent Sai Srinivasa Athreya",
    genres: ["Thriller", "Comedy"],
    language: "Telugu",
    rating: 8.3,
    year: 2019,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/6/61/Agent_Sai_Srinivasa_Athreya_poster.jpg"
  },
  {
    id: 66,
    title: "Brochevarevarura",
    genres: ["Comedy", "Thriller"],
    language: "Telugu",
    rating: 8.0,
    year: 2019,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/6/68/Brochevarevarura_poster.jpg"
  },
  {
    id: 67,
    title: "Mathu Vadalara",
    genres: ["Comedy", "Thriller"],
    language: "Telugu",
    rating: 8.1,
    year: 2019,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/9/95/Mathu_Vadalara.jpg"
  },
  {
    id: 68,
    title: "Kshanam",
    genres: ["Thriller", "Mystery"],
    language: "Telugu",
    rating: 8.1,
    year: 2016,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/0/0d/Kshanam_poster.jpg"
  },
  {
    id: 69,
    title: "Goodachari",
    genres: ["Action", "Thriller"],
    language: "Telugu",
    rating: 7.8,
    year: 2018,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/b/ba/Goodachari.jpg"
  },
  {
    id: 70,
    title: "C/o Kancharapalem",
    genres: ["Drama", "Romance"],
    language: "Telugu",
    rating: 8.9,
    year: 2018,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/d/d3/C-o_Kancharapalem.jpg"
  },
  {
    id: 71,
    title: "Karthikeya 2",
    genres: ["Mystery", "Action"],
    language: "Telugu",
    rating: 7.9,
    year: 2022,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/7/7e/Karthikeya_2_Poster.jpeg"
  },
  {
    id: 72,
    title: "Salaar",
    genres: ["Action", "Thriller"],
    language: "Telugu",
    rating: 6.5,
    year: 2023,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/6/6f/Salaar_ceasefire.jpg"
  },
  {
    id: 73,
    title: "Kalki 2898 AD",
    genres: ["Sci-Fi", "Action"],
    language: "Telugu",
    rating: 7.8,
    year: 2024,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/4/4c/Kalki_2898_AD.jpg"
  },
  {
    id: 74,
    title: "Animal",
    genres: ["Action", "Drama"],
    language: "Hindi",
    rating: 6.6,
    year: 2023,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/9/90/Animal_%282023_film%29_poster.jpg"
  },
  {
    id: 75,
    title: "Billa",
    genres: ["Action", "Thriller"],
    language: "Tamil",
    rating: 7.0,
    year: 2007,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/b/b3/Billa_2007_poster.jpg"
  },
  {
    id: 76,
    title: "Nayakan",
    genres: ["Crime", "Drama"],
    language: "Tamil",
    rating: 8.5,
    year: 1987,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/d/d0/Nayakan_poster.jpg"
  },
  {
    id: 77,
    title: "Pariyerum Perumal",
    genres: ["Drama"],
    language: "Tamil",
    rating: 8.7,
    year: 2018,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/3/35/Pariyerum_Perumal.jpg"
  },
  {
    id: 78,
    title: "Jai Bhim",
    genres: ["Drama", "Crime"],
    language: "Tamil",
    rating: 8.8,
    year: 2021,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/a/ad/Jai_Bhim_film_poster.jpg"
  },
  {
    id: 79,
    title: "Vada Chennai",
    genres: ["Crime", "Drama"],
    language: "Tamil",
    rating: 8.4,
    year: 2018,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/2/2c/Vada_Chennai.jpg"
  },
  {
    id: 80,
    title: "Ratsasan",
    genres: ["Thriller", "Crime"],
    language: "Tamil",
    rating: 8.3,
    year: 2018,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/7/77/Ratsasan_poster.jpg"
  },
  {
    id: 81,
    title: "Gargi",
    genres: ["Drama", "Thriller"],
    language: "Tamil",
    rating: 8.1,
    year: 2022,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/b/ba/Gargi_Film_Poster.jpg"
  },
  {
    id: 82,
    title: "Karnan",
    genres: ["Action", "Drama"],
    language: "Tamil",
    rating: 8.0,
    year: 2021,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/6/62/Karnan_2021_poster.jpg"
  },
  {
    id: 83,
    title: "Iruvar",
    genres: ["Drama", "Biography"],
    language: "Tamil",
    rating: 8.4,
    year: 1997,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/6/6a/Iruvar_poster.jpg"
  },
  {
    id: 84,
    title: "Gangs of Wasseypur",
    genres: ["Crime", "Action"],
    language: "Hindi",
    rating: 8.2,
    year: 2012,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/6/6a/Gangs_of_Wasseypur_poster.jpg"
  },
  {
    id: 85,
    title: "Black Friday",
    genres: ["Crime", "Drama"],
    language: "Hindi",
    rating: 8.4,
    year: 2004,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/5/58/Black_Friday_%282007%29.jpg"
  },
  {
    id: 86,
    title: "Taare Zameen Par",
    genres: ["Drama", "Family"],
    language: "Hindi",
    rating: 8.3,
    year: 2007,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/b/b4/Taare_Zameen_Par_Like_Stars_on_Earth_poster.png"
  },
  {
    id: 87,
    title: "Munna Bhai M.B.B.S.",
    genres: ["Comedy", "Drama"],
    language: "Hindi",
    rating: 8.1,
    year: 2003,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/8/84/Munna_Bhai_M.B.B.S._poster.jpg"
  },
  {
    id: 88,
    title: "The Lunchbox",
    genres: ["Romance", "Drama"],
    language: "Hindi",
    rating: 7.8,
    year: 2013,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/8/81/The_Lunchbox_poster.jpg"
  },
  {
    id: 89,
    title: "Paan Singh Tomar",
    genres: ["Biography", "Crime"],
    language: "Hindi",
    rating: 8.2,
    year: 2012,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/9/93/Paan_Singh_Tomar_Poster.jpg"
  },
  {
    id: 90,
    title: "Udaan",
    genres: ["Drama"],
    language: "Hindi",
    rating: 8.1,
    year: 2010,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/7/71/Udaan_Movie_Poster.jpg"
  },
  {
    id: 91,
    title: "Anand",
    genres: ["Drama"],
    language: "Hindi",
    rating: 8.1,
    year: 1971,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/c/c9/Anand_film.jpg"
  },
  {
    id: 92,
    title: "Maheshinte Prathikaaram",
    genres: ["Comedy", "Drama"],
    language: "Malayalam",
    rating: 8.3,
    year: 2016,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/3/33/Maheshinte_Prathikaaram.jpg"
  },
  {
    id: 93,
    title: "Thondimuthalum Driksakshiyum",
    genres: ["Comedy", "Crime"],
    language: "Malayalam",
    rating: 8.1,
    year: 2017,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/4/4f/Thondimuthalum_Driksakshiyum.jpg"
  },
  {
    id: 94,
    title: "The Goat Life",
    genres: ["Drama", "Adventure"],
    language: "Malayalam",
    rating: 8.5,
    year: 2024,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/b/b5/Adujivitam.jpg"
  },
  {
    id: 95,
    title: "Bangalore Days",
    genres: ["Romance", "Comedy"],
    language: "Malayalam",
    rating: 8.3,
    year: 2014,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/5/5c/%27Bangalore_Days%27_2014_Malayalam_Film_-_Poster.jpg"
  },
  {
    id: 96,
    title: "Ustad Hotel",
    genres: ["Drama", "Comedy"],
    language: "Malayalam",
    rating: 8.2,
    year: 2012,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/6/64/Ustad_Hotel_%282012%29_-_Poster.jpg"
  },
  {
    id: 97,
    title: "Dia",
    genres: ["Romance", "Drama"],
    language: "Kannada",
    rating: 8.1,
    year: 2020,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/5/5a/Dia_%282020_Kannada_film%29_film_poster.jpeg"
  },
  {
    id: 98,
    title: "RangiTaranga",
    genres: ["Mystery", "Thriller"],
    language: "Kannada",
    rating: 8.2,
    year: 2015,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/4/47/2015_Kannada_film_Rangitaranga_poster.jpg"
  },
  {
    id: 99,
    title: "Lucia",
    genres: ["Sci-Fi", "Thriller"],
    language: "Kannada",
    rating: 8.3,
    year: 2013,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/e/eb/Lucia_film.jpg"
  },
  {
    id: 100,
    title: "Kavaludaari",
    genres: ["Mystery", "Thriller"],
    language: "Kannada",
    rating: 7.9,
    year: 2019,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/2/2a/Kavaludaari_poster.jpg"
  },
  {
    id: 101,
    title: "Vedam",
    genres: ["Drama"],
    language: "Telugu",
    rating: 8.1,
    year: 2010,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/3/3c/Vedam-poster.jpg"
  },
  {
    id: 102,
    title: "Mallesham",
    genres: ["Biography", "Drama"],
    language: "Telugu",
    rating: 8.2,
    year: 2019,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/1/18/Mallesham_Poster.jpg"
  },
  {
    id: 103,
    title: "Oohalu Gusagusalade",
    genres: ["Romance", "Comedy"],
    language: "Telugu",
    rating: 7.9,
    year: 2014,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/7/76/Oohalu_Gusagusalade_poster.jpg"
  },
  {
    id: 104,
    title: "1: Nenokkadine",
    genres: ["Action", "Thriller"],
    language: "Telugu",
    rating: 8.0,
    year: 2014,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/b/b3/1_Nenokkadine_poster.jpg"
  },
  {
    id: 105,
    title: "Evaru",
    genres: ["Crime", "Thriller"],
    language: "Telugu",
    rating: 7.9,
    year: 2019,
    poster: "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/6/63/Evaru_poster.jpg"
  }
];

/**
 * 10 IF–THEN Rules for the Rule Engine.
 * Rules are checked IN ORDER — the FIRST matching rule is applied.
 *
 * Each rule has:
 *   - id:          Unique identifier
 *   - name:        Short human-readable name
 *   - condition:   A function(context) → boolean
 *   - conditionText: Human-readable IF description
 *   - targetGenres: Array of genres to recommend when rule fires
 *   - reason:      Explanation string shown to user
 */
const DEFAULT_RULES = [
  {
    id: 1,
    name: "New User — Popular",
    conditionText: "IF new_user = True",
    condition: (ctx) => ctx.isNewUser,
    targetGenres: ["Action", "Comedy", "Drama"],
    reason: "You're new here! Showing popular movies across top genres."
  },
  {
    id: 2,
    name: "Action + Night",
    conditionText: "IF recent_genre = Action AND time = Night",
    condition: (ctx) => ctx.recentGenre === "Action" && ctx.timeOfDay === "Night",
    targetGenres: ["Action", "Thriller"],
    reason: "Recommended based on Action + Night rule 🌙"
  },
  {
    id: 3,
    name: "Romance + Evening",
    conditionText: "IF recent_genre = Romance AND time = Evening",
    condition: (ctx) => ctx.recentGenre === "Romance" && ctx.timeOfDay === "Evening",
    targetGenres: ["Romance", "Drama"],
    reason: "Recommended based on Romance + Evening rule 🌆"
  },
  {
    id: 4,
    name: "Comedy Binge",
    conditionText: "IF recent_genre = Comedy AND watch_count > 5",
    condition: (ctx) => ctx.recentGenre === "Comedy" && ctx.watchCount > 5,
    targetGenres: ["Comedy"],
    reason: "You've watched many movies and love Comedy — here are top-rated comedies! 😄"
  },
  {
    id: 5,
    name: "Horror + Night",
    conditionText: "IF recent_genre = Horror AND time = Night",
    condition: (ctx) => ctx.recentGenre === "Horror" && ctx.timeOfDay === "Night",
    targetGenres: ["Horror", "Thriller"],
    reason: "Recommended based on Horror + Night rule 🌑"
  },
  {
    id: 6,
    name: "Sci-Fi Fan",
    conditionText: "IF recent_genre = Sci-Fi",
    condition: (ctx) => ctx.recentGenre === "Sci-Fi",
    targetGenres: ["Sci-Fi", "Action"],
    reason: "Recommended based on your love for Sci-Fi 🚀"
  },
  {
    id: 7,
    name: "Drama + Morning",
    conditionText: "IF recent_genre = Drama AND time = Morning",
    condition: (ctx) => ctx.recentGenre === "Drama" && ctx.timeOfDay === "Morning",
    targetGenres: ["Drama", "Romance"],
    reason: "Recommended based on Drama + Morning rule ☀️"
  },
  {
    id: 8,
    name: "Action Enthusiast",
    conditionText: "IF most_freq_genre = Action AND watch_count > 3",
    condition: (ctx) => ctx.mostFreqGenre === "Action" && ctx.watchCount > 3,
    targetGenres: ["Action"],
    reason: "You frequently watch Action movies — here are more! 💥"
  },
  {
    id: 9,
    name: "Thriller + Evening",
    conditionText: "IF recent_genre = Thriller AND time = Evening",
    condition: (ctx) => ctx.recentGenre === "Thriller" && ctx.timeOfDay === "Evening",
    targetGenres: ["Thriller", "Drama"],
    reason: "Recommended based on Thriller + Evening rule 🔍"
  },
  {
    id: 10,
    name: "Comedy + Morning",
    conditionText: "IF recent_genre = Comedy AND time = Morning",
    condition: (ctx) => ctx.recentGenre === "Comedy" && ctx.timeOfDay === "Morning",
    targetGenres: ["Comedy", "Family"],
    reason: "Start your day with a laugh! 🌞"
  },
  {
    id: 11,
    name: "Action + Morning",
    conditionText: "IF recent_genre = Action AND time = Morning",
    condition: (ctx) => ctx.recentGenre === "Action" && ctx.timeOfDay === "Morning",
    targetGenres: ["Action", "Adventure"],
    reason: "Kickstart your morning with high-energy action! ⚡"
  },
  {
    id: 12,
    name: "Romance Lover",
    conditionText: "IF most_freq_genre = Romance AND watch_count > 3",
    condition: (ctx) => ctx.mostFreqGenre === "Romance" && ctx.watchCount > 3,
    targetGenres: ["Romance"],
    reason: "You seem to love romance movies! ❤️"
  },
  {
    id: 13,
    name: "Drama + Night",
    conditionText: "IF most_freq_genre = Drama AND time = Night",
    condition: (ctx) => ctx.mostFreqGenre === "Drama" && ctx.timeOfDay === "Night",
    targetGenres: ["Drama", "Thriller"],
    reason: "Late night drama for intense viewing! 🌙"
  },
  {
    id: 14,
    name: "Sci-Fi + Evening",
    conditionText: "IF most_freq_genre = Sci-Fi AND time = Evening",
    condition: (ctx) => ctx.mostFreqGenre === "Sci-Fi" && ctx.timeOfDay === "Evening",
    targetGenres: ["Sci-Fi", "Fantasy"],
    reason: "Unwind with some Sci-Fi this evening! 🛸"
  },
  {
    id: 15,
    name: "Horror Fanatic",
    conditionText: "IF most_freq_genre = Horror AND watch_count > 5",
    condition: (ctx) => ctx.mostFreqGenre === "Horror" && ctx.watchCount > 5,
    targetGenres: ["Horror", "Mystery"],
    reason: "You can't get enough of Horror! 👻"
  },
  {
    id: 16,
    name: "Action Thriller Combo",
    conditionText: "IF recent_genre = Thriller AND most_freq_genre = Action",
    condition: (ctx) => ctx.recentGenre === "Thriller" && ctx.mostFreqGenre === "Action",
    targetGenres: ["Thriller", "Action"],
    reason: "A mix of your favorite Action and recent Thriller! 🔫"
  },
  {
    id: 17,
    name: "Rom-Com Fan",
    conditionText: "IF recent_genre = Romance AND most_freq_genre = Comedy",
    condition: (ctx) => ctx.recentGenre === "Romance" && ctx.mostFreqGenre === "Comedy",
    targetGenres: ["Romance", "Comedy"],
    reason: "Perfect Rom-Com blend for your taste! 💖"
  },
  {
    id: 18,
    name: "Fantasy + Night",
    conditionText: "IF recent_genre = Fantasy AND time = Night",
    condition: (ctx) => ctx.recentGenre === "Fantasy" && ctx.timeOfDay === "Night",
    targetGenres: ["Fantasy", "Adventure"],
    reason: "Escape into fantasy worlds tonight! 🌌"
  },
  {
    id: 19,
    name: "Mystery + Evening",
    conditionText: "IF recent_genre = Mystery AND time = Evening",
    condition: (ctx) => ctx.recentGenre === "Mystery" && ctx.timeOfDay === "Evening",
    targetGenres: ["Mystery", "Thriller"],
    reason: "Solve a mystery this evening! 🕵️"
  },
  {
    id: 20,
    name: "Crime Junkie",
    conditionText: "IF most_freq_genre = Crime AND watch_count > 4",
    condition: (ctx) => ctx.mostFreqGenre === "Crime" && ctx.watchCount > 4,
    targetGenres: ["Crime", "Thriller"],
    reason: "Gritty crime dramas for a superfan! 🚨"
  },
  {
    id: 21,
    name: "Animation + Morning",
    conditionText: "IF most_freq_genre = Animation AND time = Morning",
    condition: (ctx) => ctx.mostFreqGenre === "Animation" && ctx.timeOfDay === "Morning",
    targetGenres: ["Animation", "Family"],
    reason: "Morning cartoons and animated features! 🎨"
  },
  {
    id: 22,
    name: "Family + Evening",
    conditionText: "IF recent_genre = Family AND time = Evening",
    condition: (ctx) => ctx.recentGenre === "Family" && ctx.timeOfDay === "Evening",
    targetGenres: ["Family", "Comedy"],
    reason: "Wholesome entertainment for the evening! 👨‍👩‍👧‍👦"
  },
  {
    id: 23,
    name: "Adventure + Morning",
    conditionText: "IF recent_genre = Adventure AND time = Morning",
    condition: (ctx) => ctx.recentGenre === "Adventure" && ctx.timeOfDay === "Morning",
    targetGenres: ["Adventure", "Action"],
    reason: "Start your day with an adventure! 🌄"
  },
  {
    id: 24,
    name: "Documentary Enthusiast",
    conditionText: "IF most_freq_genre = Documentary",
    condition: (ctx) => ctx.mostFreqGenre === "Documentary",
    targetGenres: ["Documentary", "History"],
    reason: "Fascinating real-world stories! 🌍"
  },
  {
    id: 25,
    name: "Music + Evening",
    conditionText: "IF recent_genre = Music AND time = Evening",
    condition: (ctx) => ctx.recentGenre === "Music" && ctx.timeOfDay === "Evening",
    targetGenres: ["Music", "Drama"],
    reason: "Musical hits to end your day! 🎵"
  },
  {
    id: 26,
    name: "History + Night",
    conditionText: "IF recent_genre = History AND time = Night",
    condition: (ctx) => ctx.recentGenre === "History" && ctx.timeOfDay === "Night",
    targetGenres: ["History", "War", "Drama"],
    reason: "Dive into history tonight! 🏛️"
  },
  {
    id: 27,
    name: "War + Action Combo",
    conditionText: "IF recent_genre = War AND most_freq_genre = Action",
    condition: (ctx) => ctx.recentGenre === "War" && ctx.mostFreqGenre === "Action",
    targetGenres: ["War", "Action"],
    reason: "Intense wartime action! ⚔️"
  },
  {
    id: 28,
    name: "Western + Evening",
    conditionText: "IF recent_genre = Western AND time = Evening",
    condition: (ctx) => ctx.recentGenre === "Western" && ctx.timeOfDay === "Evening",
    targetGenres: ["Western", "Action"],
    reason: "Classic Westerns for the evening! 🤠"
  },
  {
    id: 29,
    name: "Deep Watcher",
    conditionText: "IF watch_count > 10",
    condition: (ctx) => ctx.watchCount > 10,
    targetGenres: ["Drama", "Mystery", "Sci-Fi"],
    reason: "You're a cinephile! Here are some critically acclaimed picks! 🍿"
  },
  {
    id: 30,
    name: "Fallback — Top Rated",
    conditionText: "FALLBACK — no other rule matched",
    condition: (_ctx) => true, // Always matches — last resort
    targetGenres: ["Action", "Drama", "Comedy", "Sci-Fi", "Romance", "Thriller", "Horror"],
    reason: "Showing top-rated movies across all genres (fallback rule)."
  }
];

// ==========================================
// Helper: Load movies (default + user-added)
// Excludes any movies the user has deleted.
// ==========================================
function getAllMovies() {
  const userMovies = JSON.parse(localStorage.getItem("userMovies") || "[]");
  const removedIds = JSON.parse(localStorage.getItem("removedMovies") || "[]");

  const movieMap = new Map();
  // Add default movies
  DEFAULT_MOVIES.forEach((m) => movieMap.set(m.id, m));
  // Override with user movies
  userMovies.forEach((m) => movieMap.set(m.id, m));

  // Remove deleted movies
  removedIds.forEach((id) => movieMap.delete(id));

  return Array.from(movieMap.values());
}

/**
 * Remove a movie by ID. Adds its ID to the removed list.
 */
function removeMovie(movieId) {
  let userMovies = JSON.parse(localStorage.getItem("userMovies") || "[]");

  if (userMovies.some((m) => m.id === movieId)) {
    userMovies = userMovies.filter((m) => m.id !== movieId);
    localStorage.setItem("userMovies", JSON.stringify(userMovies));
  }

  // Also remove from any user's watch history
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("watchHistory_")) {
      let history = JSON.parse(localStorage.getItem(key) || "[]");
      history = history.filter((record) => {
        const hId = record.movieId || record;
        return hId !== movieId;
      });
      localStorage.setItem(key, JSON.stringify(history));
    }
  }

  // Always add to removed list to guarantee overridden defaults are fully wiped out
  const removedIds = JSON.parse(localStorage.getItem("removedMovies") || "[]");
  if (!removedIds.includes(movieId)) {
    removedIds.push(movieId);
    localStorage.setItem("removedMovies", JSON.stringify(removedIds));
  }
}

// ==========================================
// Helper: Check if a movie matches a genre
// Works with the new multi-genre (array) format.
// ==========================================
function movieHasGenre(movie, genre) {
  if (Array.isArray(movie.genres)) {
    return movie.genres.includes(genre);
  }
  // Fallback for old single-genre format
  return movie.genre === genre;
}

/**
 * Get the primary genre of a movie (first in the array).
 */
function getMoviePrimaryGenre(movie) {
  if (Array.isArray(movie.genres) && movie.genres.length > 0) {
    return movie.genres[0];
  }
  return movie.genre || "Unknown";
}

/**
 * Get all genres of a movie as an array.
 */
function getMovieGenres(movie) {
  if (Array.isArray(movie.genres)) return movie.genres;
  if (movie.genre) return [movie.genre];
  return [];
}

// ==========================================
// Helper: Load rules (default + user-added)
// ==========================================
function getAllRules() {
  const userRules = JSON.parse(localStorage.getItem("userRules") || "[]");

  // User-added rules are simpler — they use string matching only
  const parsedUserRules = userRules.map((r) => ({
    ...r,
    condition: (ctx) => {
      let match = true;
      if (r.checkGenre && r.checkGenre !== "Any") {
        match = match && (ctx.recentGenre === r.checkGenre);
      }
      if (r.checkTime && r.checkTime !== "Any") {
        match = match && (ctx.timeOfDay === r.checkTime);
      }
      return match;
    }
  }));

  // User rules are inserted BEFORE the fallback rule (last default rule)
  const defaultCopy = [...DEFAULT_RULES];
  const fallback = defaultCopy.pop(); // remove fallback
  return [...defaultCopy, ...parsedUserRules, fallback];
}

const BACKDROPS = {
  // Baahubali 2
  1: "https://image.tmdb.org/t/p/original/rM5ZEGqT7K5wUj4oK1L3TzI3R2o.jpg",
  // RRR
  2: "https://image.tmdb.org/t/p/original/psWe2wX6Q4oB5HapTxyEInJ9oU1.jpg",
  // KGF 2
  12: "https://image.tmdb.org/t/p/original/y4qHnZ02Yf2qN8H3l95Xz40p8uY.jpg",
  // Soorarai Pottru
  22: "https://image.tmdb.org/t/p/original/1X5XQjD0FwTzWeYQy3ZtNmbzB8B.jpg",
  // Jersey
  7: "https://image.tmdb.org/t/p/original/mX99bId0i1WlVqGzYyXkH8R5D28.jpg",
  // Mahanati
  8: "https://image.tmdb.org/t/p/original/qZ8hYq74dO8HwM50A5Yg3fD2u7Z.jpg",
  // Jawan
  26: "https://image.tmdb.org/t/p/original/8pjWz2lt29KyVGoq1mEBtEPq123.jpg",
  // Pathaan
  27: "https://image.tmdb.org/t/p/original/a0A2R4L5gI6O3Zt3Z9c1i2zBwU7.jpg",
  // PK
  28: "https://image.tmdb.org/t/p/original/tAhjeWnF0eIItf2SjGtw30Q4uCj.jpg"
};

/**
 * Returns an object { url: string, isLandscape: boolean }
 * Guarantees we don't zoom in portrait posters.
 */
function getMovieBackdrop(movie) {
  if (BACKDROPS[movie.id]) {
    return { url: BACKDROPS[movie.id], isLandscape: true };
  }
  
  let fallbackUrl = movie.poster;
  if (fallbackUrl.includes("image.tmdb.org")) {
    fallbackUrl = fallbackUrl.replace("/w500/", "/original/");
  }
  // Treat standard posters as portrait
  return { url: fallbackUrl, isLandscape: false };
}

