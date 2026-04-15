document.addEventListener("DOMContentLoaded", () => {
  requireAuth();
  
  const currentUser = getCurrentUser();
  const userNameEl = document.getElementById("userName");
  if (userNameEl) userNameEl.textContent = currentUser;

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = parseInt(urlParams.get('id'));
  
  const allMovies = getAllMovies();
  const movie = allMovies.find(m => m.id === movieId);
  if (!movie) {
    document.getElementById("movieContent").innerHTML = "<h1 style='color:white;text-align:center;margin-top:200px;'>Movie Not Found</h1>";
    return;
  }

  // Render Hero
  const matchPct = Math.round(80 + movie.rating * 2);
  const content = document.getElementById("movieContent");
  const bgData = getMovieBackdrop(movie);
  const bgStyle = bgData.isLandscape ? 
    `background-image: url('${bgData.url}'); background-size: cover; background-position: center top; opacity: 0.5;` :
    `background-image: url('${bgData.url}'); background-size: contain; background-repeat: no-repeat; background-position: right 10%; background-color: #000; opacity: 1;`;

  content.innerHTML = `
    <div class="movie-page-hero">
      <div class="mp-backdrop" style="${bgStyle}"></div>
      <div class="mp-gradient"></div>
      <div class="mp-content">
        <h1 class="mp-title">${escapeHTML(movie.title)}</h1>
        <div class="mp-meta">
          <span class="mp-match">${matchPct}% Match</span>
          <span>${movie.year}</span>
          <span>${escapeHTML(movie.language)}</span>
          <span style="border:1px solid #777; padding:0 5px;">IMDb ${movie.rating}</span>
        </div>
        <p class="mp-synopsis">This ${movie.year} ${escapeHTML(movie.language)} ${getMovieGenres(movie).map(g => escapeHTML(g)).join(", ")} masterpiece has captivated audiences with its stellar ${movie.rating}/10 rating. Experience the thrilling journey of ${escapeHTML(movie.title)} exclusively on CineRule.</p>
        <div class="mp-cast">
          Starring: <span>Top Actors of ${escapeHTML(movie.language)} Cinema</span><br>
          Director: <span>Acclaimed Director</span>
        </div>
        <div class="mp-actions">
          <button class="mp-btn mp-btn-play" onclick="window.location.href='player.html?id=${movie.id}'">▶ Play</button>
          <button class="mp-btn mp-btn-add">✚ My List</button>
        </div>
      </div>
    </div>
  `;

  // Render Similar
  const history = getHistory();
  const similarMovies = allMovies.filter(m => m.id !== movieId && m.language === movie.language).sort(() => Math.random() - 0.5).slice(0, 7);
  const similarTrack = document.getElementById("similarMovies");
  
  similarTrack.innerHTML = similarMovies.map(m => {
    const mMatch = Math.round(80 + m.rating * 2);
    return `
      <div class="nf-card" onclick="window.location.href='movie.html?id=${m.id}'">
        <div class="nf-card-inner">
          <img class="nf-card-poster" src="${m.poster}" alt="${escapeHTML(m.title)}" loading="lazy">
          <div class="nf-card-overlay">
            <div class="nf-card-title">${escapeHTML(m.title)}</div>
            <div class="nf-card-actions">
              <button class="nf-card-action-btn play-btn" onclick="event.stopPropagation(); window.location.href='player.html?id=${m.id}'">▶</button>
            </div>
            <div class="nf-card-meta">
              <span class="nf-card-match">${mMatch}%</span>
              <span class="nf-card-year">${m.year}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
});

function getHistory() {
  const user = getCurrentUser();
  if (!user) return [];
  const key = "watchHistory_" + user;
  return safeJSONParse(localStorage.getItem(key), []);
}

function getMovieGenres(movie) {
  if (Array.isArray(movie.genres)) return movie.genres;
  if (typeof movie.genre === "string") return movie.genre.split(",").map(g => g.trim());
  if (Array.isArray(movie.genre)) return movie.genre;
  return ["Drama"];
}
