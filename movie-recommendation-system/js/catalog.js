// ==========================================
// CATALOG.JS — Netflix-Style Home Experience
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  requireAuth();

  const username = getCurrentUser();
  const userNameEl = document.getElementById("userName");
  if (userNameEl) userNameEl.textContent = username;

  const movies = getAllMovies();

  // ---- Watch History ----
  function getHistory() {
    return safeJSONParse(localStorage.getItem("watchHistory_" + username), []);
  }
  function saveHistory(history) {
    localStorage.setItem("watchHistory_" + username, JSON.stringify(history));
  }
  function markAsWatched(movieId) {
    // Use the new timestamped format
    addToHistory(movieId);
    // Refresh the UI
    renderHero();
    renderCarousels();
  }

  // ---- Constant Navbar Separation (Removed Transparent Scroll) ----
  const nav = document.getElementById("mainNav");
  // Logic removed to ensure navbar stays solid and separated from banners

  // ---- Hero Banner Carousel ----
  const heroPool = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10); // Most recommended top 10
  
  let currentHeroIndex = 0;
  let heroInterval = null;

  function renderHero(index = 0) {
    const heroContent = document.getElementById("heroContent");
    const heroBackdrop = document.getElementById("heroBackdrop");
    if (!heroContent || !heroBackdrop) return;

    const heroMovie = heroPool[index];
    const genres = getMovieGenres(heroMovie);
    const history = getHistory();
    const isWatched = history.some(h => (h.movieId || h) === heroMovie.id);
    const matchPct = Math.round(80 + heroMovie.rating * 2);
    
    // Add transitioning class for fade effect
    heroContent.classList.add("transitioning");

    setTimeout(() => {
      // High-res TMDb Resolution Upgrade for Hero
      const bgData = getMovieBackdrop(heroMovie);
      heroBackdrop.style.backgroundImage = `url('${bgData.url}')`;
      if (!bgData.isLandscape) {
        heroBackdrop.style.backgroundSize = "contain";
        heroBackdrop.style.backgroundRepeat = "no-repeat";
        heroBackdrop.style.backgroundPosition = "right 10%";
        heroBackdrop.style.backgroundColor = "#000";
        heroBackdrop.style.opacity = "0.7";
      } else {
        heroBackdrop.style.backgroundSize = "cover";
        heroBackdrop.style.backgroundPosition = "center top";
        heroBackdrop.style.opacity = "0.5";
      }

      // Add dynamic cinematic descriptions
      const getHeroDescription = (movie) => {
        const g = getMovieGenres(movie).join(", ");
        return `This ${movie.year} ${movie.language} ${g} masterpiece has captivated audiences with its stellar ${movie.rating}/10 rating. Experience the thrilling journey of ${movie.title} exclusively on CineRule.`;
      };

      heroContent.innerHTML = `
        <h1 class="hero-title">${escapeHTML(heroMovie.title)}</h1>
        <div class="hero-meta">
          <span class="meta-rating">${matchPct}% Match</span>
          <span class="meta-divider"></span>
          <span class="meta-year">${heroMovie.year}</span>
          <span class="meta-divider"></span>
          <span class="meta-lang">${escapeHTML(heroMovie.language)}</span>
          <span class="meta-divider"></span>
          <span style="display:inline-flex; align-items:center; gap:6px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" alt="IMDb" style="height:16px;">
            ${Number(heroMovie.rating).toFixed(1)}/10
          </span>
        </div>
        <div class="hero-description">
          ${escapeHTML(getHeroDescription(heroMovie))}
        </div>
        <div class="hero-genres">
          ${genres.map(g => `<span class="hero-genre-tag">${escapeHTML(g)}</span>`).join("")}
        </div>
        <div class="hero-buttons">
          <button class="hero-btn hero-btn-play" onclick="window.location.href='player.html?id=${heroMovie.id}'">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
                ▶ Play
              </button>
          <button class="hero-btn hero-btn-info" onclick="window.location.href='movie.html?id=${heroMovie.id}'">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            More Info
          </button>
        </div>
      `;
      
      heroContent.classList.remove("transitioning");
    }, 300); // Small delay to sync with CSS transition
  }

  function startHeroAutoplay() {
    stopHeroAutoplay();
    heroInterval = setInterval(() => {
      currentHeroIndex = (currentHeroIndex + 1) % heroPool.length;
      renderHero(currentHeroIndex);
    }, 5000);
  }

  function stopHeroAutoplay() {
    if (heroInterval) clearInterval(heroInterval);
  }

  function manuallySwitchHero(next = true) {
    stopHeroAutoplay();
    if (next) {
      currentHeroIndex = (currentHeroIndex + 1) % heroPool.length;
    } else {
      currentHeroIndex = (currentHeroIndex - 1 + heroPool.length) % heroPool.length;
    }
    renderHero(currentHeroIndex);
    startHeroAutoplay(); // Restart timer
  }

  // ---- Build Genre Rows ----
  function buildRows() {
    const history = getHistory();
    const rows = [];

    // 1. Continue Watching (movies user has watched)
    const watchedMovies = history.map(record => {
      const id = record.movieId || record;
      return movies.find(m => m.id === id);
    }).filter(Boolean);
    if (watchedMovies.length > 0) {
      // Deduplicate in case of frequency tracking
      const uniqueWatched = [...new Map(watchedMovies.map(item => [item.id, item])).values()];
      rows.push({ title: "📺 Continue Watching", movies: uniqueWatched.slice(0, 20) });
    }

    // 2. Trending Now (all movies sorted by rating * random factor)
    const trending = [...movies].sort(() => Math.random() - 0.3).slice(0, 20);
    rows.push({ title: "🔥 Trending Now", movies: trending });

    // 3. Top Rated (Top 10 India Today format)
    const topRated = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10);
    rows.push({ title: "⭐ Top 10 Movies in India Today", movies: topRated, isTop10: true });

    // 4. By Genre
    const genreSet = new Set();
    movies.forEach(m => getMovieGenres(m).forEach(g => genreSet.add(g)));
    
    const genreOrder = ["Action", "Drama", "Romance", "Thriller", "Comedy", "Sci-Fi", "Horror"];
    const sortedGenres = [...genreSet].sort((a, b) => {
      const ai = genreOrder.indexOf(a);
      const bi = genreOrder.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });

    sortedGenres.forEach(genre => {
      const genreMovies = movies.filter(m => getMovieGenres(m).includes(genre));
      if (genreMovies.length >= 3) {
        rows.push({ title: `${genre} Movies`, movies: genreMovies });
      }
    });

    // 5. By Language
    const langs = [...new Set(movies.map(m => m.language))].sort();
    langs.forEach(lang => {
      const langMovies = movies.filter(m => m.language === lang);
      if (langMovies.length >= 3) {
        rows.push({ title: `🎬 ${lang} Cinema`, movies: langMovies });
      }
    });

    // 6. New Releases
    const newReleases = [...movies].sort((a, b) => b.year - a.year).slice(0, 20);
    rows.push({ title: "🆕 New Releases", movies: newReleases });

    return rows;
  }

  // ---- Render Carousels ----
  function renderCarousels() {
    const main = document.getElementById("netflixMain");
    main.innerHTML = "";
    const history = getHistory();
    const rows = buildRows();

    rows.forEach((row, rowIdx) => {
      const section = document.createElement("section");
      section.className = "genre-row" + (row.isTop10 ? " top-10-row" : "");
      
      const exploreLink = `catalog.html?filter=true`; // Placeholder filter logic
      section.innerHTML = `
        <h2 class="genre-row-title">
          ${escapeHTML(row.title)}
          <a href="${exploreLink}" class="row-explore">Explore All ›</a>
        </h2>
        <div class="carousel-container">
          <button class="carousel-arrow carousel-arrow-left" data-row="${rowIdx}">‹</button>
          <div class="carousel-track" id="carouselTrack_${rowIdx}">
            ${row.movies.map((movie, index) => {
              const genres = getMovieGenres(movie);
              const isWatched = history.some(h => (h.movieId || h) === movie.id);
              const matchPct = Math.round(80 + movie.rating * 2);
              
              const top10Html = row.isTop10 ? `<span class="top-10-num">${index + 1}</span>` : "";
              const cardClass = "nf-card" + (row.isTop10 ? " top-10-card" : "");

              return `
                <div class="${cardClass}" data-movie-id="${movie.id}" onclick="window.location.href='movie.html?id=${movie.id}'">
                  ${top10Html}
                  <div class="nf-card-inner">
                    <img class="nf-card-poster" 
                         src="${movie.poster}" 
                         alt="${movie.title}" 
                         loading="lazy"
                         onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=500&q=60'; this.style.opacity='0.6';">
                    <div class="nf-card-overlay">
                      <div class="nf-card-title">${escapeHTML(movie.title)}</div>
                      <div class="nf-card-actions">
                        ${isWatched
                          ? `<button class="nf-card-action-btn watched-btn" title="Watched" onclick="event.stopPropagation(); window.location.href='player.html?id=${movie.id}'">▶</button>`
                          : `<button class="nf-card-action-btn play-btn" title="Play Movie" onclick="event.stopPropagation(); window.location.href='player.html?id=${movie.id}'">▶</button>`
                        }
                        <button class="nf-card-action-btn" title="More Info" onclick="event.stopPropagation(); window.location.href='movie.html?id=${movie.id}'">ℹ</button>
                      </div>
                      <div class="nf-card-meta">
                        <span class="nf-card-match">${matchPct}%</span>
                        <span class="nf-card-year">${movie.year}</span>
                        <span class="nf-card-lang">${escapeHTML(movie.language)}</span>
                      </div>
                      <div class="nf-card-genres">
                        ${genres.map(g => escapeHTML(g)).join(' <span>•</span> ')}
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
          <button class="carousel-arrow carousel-arrow-right" data-row="${rowIdx}">›</button>
        </div>
      `;
      main.appendChild(section);
    });

    // Attach carousel arrow click handlers
    document.querySelectorAll(".carousel-arrow-left").forEach(btn => {
      btn.addEventListener("click", () => {
        const row = btn.getAttribute("data-row");
        const track = document.getElementById(`carouselTrack_${row}`);
        track.scrollBy({ left: -track.clientWidth * 0.75, behavior: "smooth" });
      });
    });
    document.querySelectorAll(".carousel-arrow-right").forEach(btn => {
      btn.addEventListener("click", () => {
        const row = btn.getAttribute("data-row");
        const track = document.getElementById(`carouselTrack_${row}`);
        track.scrollBy({ left: track.clientWidth * 0.75, behavior: "smooth" });
      });
    });

    // Card clicks are handled via inline onclick → movie.html
  }

  // ---- Movie Detail Modal ----
  const overlay = document.getElementById("movieModalOverlay");
  const modalClose = document.getElementById("modalClose");

  function openModal(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;

    const genres = getMovieGenres(movie);
    const history = getHistory();
    const isWatched = history.some(h => (h.movieId || h) === movie.id);
    const matchPct = Math.round(80 + movie.rating * 2);

    // High-res Modal Backdrop
    const modalBgData = getMovieBackdrop(movie);
    const modalBd = document.getElementById("modalBackdrop");
    modalBd.style.backgroundImage = `url('${modalBgData.url}')`;
    if (!modalBgData.isLandscape) {
      modalBd.style.backgroundSize = "contain";
      modalBd.style.backgroundRepeat = "no-repeat";
      modalBd.style.backgroundPosition = "right center";
      modalBd.style.backgroundColor = "#000";
    } else {
      modalBd.style.backgroundSize = "cover";
      modalBd.style.backgroundPosition = "center top";
    }

    document.getElementById("modalBody").innerHTML = `
      <h2 class="modal-title">${escapeHTML(movie.title)}</h2>
      <div class="modal-meta-row">
        <span class="modal-match">${matchPct}% Match</span>
        <span class="modal-year">${movie.year}</span>
        <span class="modal-lang-badge">${escapeHTML(movie.language)}</span>
        <span class="modal-rating">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" alt="IMDb">
          ${"★".repeat(Math.round(movie.rating / 2))}${"☆".repeat(5 - Math.round(movie.rating / 2))}
          ${Number(movie.rating).toFixed(1)}/10
        </span>
      </div>
      <div class="modal-genres">
        ${genres.map(g => `<span class="modal-genre-tag">${escapeHTML(g)}</span>`).join("")}
      </div>
      <div class="modal-actions">
        <button class="modal-btn modal-btn-watch" onclick="window.location.href='player.html?id=${movie.id}'">
            ▶ Play
          </button>
        <button class="modal-btn modal-btn-watched" onclick="window.location.href='movie.html?id=${movie.id}'">
            ℹ More Info
          </button>
      </div>
    `;

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // ---- Search Functionality ----
  const searchInput = document.getElementById("catalogSearchInput");
  const heroSection = document.getElementById("heroBanner");
  
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase().trim();
      const main = document.getElementById("netflixMain");

      if (term.length > 0) {
        // Search Mode
        heroSection.style.display = "none";
        const filtered = movies.filter(m => 
          m.title.toLowerCase().includes(term) ||
          m.year.toString().includes(term) ||
          m.language.toLowerCase().includes(term) ||
          getMovieGenres(m).some(g => g.toLowerCase().includes(term))
        );

        main.innerHTML = `
          <div class="genre-row" style="margin-top: 8rem;">
            <h2 class="genre-row-title">Search Results for "${escapeHTML(term)}"</h2>
            <div class="movie-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:1.5rem;">
              ${filtered.length > 0 ? filtered.map(movie => `
                <div class="nf-card" style="flex:none; width:100%;" onclick="window.location.href='movie.html?id=${movie.id}'">
                  <div class="nf-card-inner">
                    <img class="nf-card-poster" 
                         src="${movie.poster}" 
                         alt="${escapeHTML(movie.title)}" 
                         loading="lazy"
                         onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=500&q=60';">
                    <div class="nf-card-overlay">
                      <div class="nf-card-title">${escapeHTML(movie.title)}</div>
                      <div class="nf-card-actions">
                        <button class="nf-card-action-btn play-btn" onclick="event.stopPropagation(); window.location.href='player.html?id=${movie.id}'">▶</button>
                        <button class="nf-card-action-btn" onclick="event.stopPropagation(); window.location.href='movie.html?id=${movie.id}'">ℹ</button>
                      </div>
                    </div>
                  </div>
                </div>
              `).join("") : `<div class="empty-msg">No movies found matching "${escapeHTML(term)}"</div>`}
            </div>
          </div>
        `;
      } else {
        // Netflix Mode
        heroSection.style.display = "flex";
        renderCarousels();
      }
    });
  }

  // ---- Global Handlers ----
  window.__markWatched = markAsWatched;
  window.__openModal = openModal;

  // ---- Initial Render ----
  renderHero(currentHeroIndex);
  renderCarousels();
  startHeroAutoplay();

  // Hero Carousel Listeners
  document.getElementById("heroPrev")?.addEventListener("click", () => manuallySwitchHero(false));
  document.getElementById("heroNext")?.addEventListener("click", () => manuallySwitchHero(true));
});
