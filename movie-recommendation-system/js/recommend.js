// ==========================================
// RECOMMEND.JS — Recommendation Display
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  requireAuth();

  const username = getCurrentUser();
  const userNameEl = document.getElementById("userName");
  const reasonBox = document.getElementById("reasonBox");
  const contextBox = document.getElementById("contextBox");
  const recGrid = document.getElementById("recGrid");
  const recBtn = document.getElementById("getRecBtn");
  const watchHistoryList = document.getElementById("watchHistoryList");

  if (userNameEl) userNameEl.textContent = username;

  // Show Watch History
  function renderWatchHistory() {
    if (!watchHistoryList) return;

    const history = safeJSONParse(
      localStorage.getItem("watchHistory_" + username), []
    );
    const allMovies = getAllMovies();

    if (history.length === 0) {
      watchHistoryList.innerHTML =
        '<p class="empty-msg">No movies watched yet. Go to the catalog to mark movies as watched!</p>';
      return;
    }

    watchHistoryList.innerHTML = "";
    history.forEach((record, index) => {
      const movieId = record.movieId || record; // Read new Object format, or fallback to simple ID
      const movie = allMovies.find((m) => m.id === movieId);
      if (movie) {
        // Build pretty timestamp if it exists
        let timeStr = "";
        if (record.timestamp) {
            const dt = new Date(record.timestamp);
            timeStr = `<span class="history-time" style="font-size:0.7rem; color:#aaa; margin-left:auto;">${dt.toLocaleDateString()} ${dt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>`;
        }
        const genres = getMovieGenres(movie);
        const item = document.createElement("div");
        item.className = "history-item";
        item.style.display = "flex";
        item.style.alignItems = "center";
        item.innerHTML = `
          <span class="history-rank">#${index + 1}</span>
          <img class="history-poster" src="${movie.poster}" alt="${escapeHTML(movie.title)}" onerror="this.style.display='none';">
          <span class="history-title">${escapeHTML(movie.title)}</span>
          ${genres.map((g) => `<span class="genre-badge">${escapeHTML(g)}</span>`).join("")}
          ${timeStr}
        `;
        watchHistoryList.appendChild(item);
      }
    });
  }

  // Generate and display recommendations
  function displayRecommendations() {
    const result = getRecommendations(username);
    const { recommendations, context, ruleResult } = result;

    // Show context summary
    if (contextBox) {
      contextBox.innerHTML = `
        <h3>📊 Your Context</h3>
        <div class="context-grid">
          <div class="context-item">
            <span class="context-label">Recent Genre</span>
            <span class="context-value">${escapeHTML(context.recentGenre) || "None"}</span>
          </div>
          <div class="context-item">
            <span class="context-label">Most Watched Genre</span>
            <span class="context-value">${escapeHTML(context.mostFreqGenre) || "None"}</span>
          </div>
          <div class="context-item">
            <span class="context-label">Time of Day</span>
            <span class="context-value">${escapeHTML(context.timeOfDay)}</span>
          </div>
          <div class="context-item">
            <span class="context-label">Movies Watched</span>
            <span class="context-value">${context.watchCount}</span>
          </div>
        </div>
      `;
    }

    // Show rule reasoning (CRITICAL FOR DEMO)
    if (reasonBox) {
      const ruleName = ruleResult.matchedRule
        ? ruleResult.matchedRule.name
        : "None";
      const ruleCondition = ruleResult.matchedRule
        ? ruleResult.matchedRule.conditionText
        : "N/A";

      reasonBox.innerHTML = `
        <h3>🧠 Rule Engine Output</h3>
        <div class="reason-details">
          <div class="reason-row">
            <span class="reason-label">Matched Rule:</span>
            <span class="reason-value highlight">${escapeHTML(ruleName)}</span>
          </div>
          <div class="reason-row">
            <span class="reason-label">Condition:</span>
            <span class="reason-value code">${escapeHTML(ruleCondition)}</span>
          </div>
          <div class="reason-row">
            <span class="reason-label">Target Genres:</span>
            <span class="reason-value">${ruleResult.targetGenres.map(g => escapeHTML(g)).join(", ")}</span>
          </div>
          <div class="reason-explanation">
            <p>💡 ${escapeHTML(ruleResult.reason)}</p>
          </div>
        </div>
      `;
    }

    // Show recommended movies
    if (recGrid) {
      if (recommendations.length === 0) {
        recGrid.innerHTML = `
          <div class="empty-msg">
            <p>🎬 You've watched all matching movies! Try watching movies from a different genre.</p>
          </div>
        `;
        return;
      }

      recGrid.innerHTML = "";
      recommendations.forEach((movie) => {
        const genres = getMovieGenres(movie);
        const card = document.createElement("div");
        card.className = "movie-card recommended";
        card.innerHTML = `
          <div class="movie-poster">
            <img src="${movie.poster}" alt="${escapeHTML(movie.title)}" onerror="this.style.display='none'; this.parentElement.classList.add('poster-fallback'); this.parentElement.innerHTML='🎬';">
          </div>
          <div class="movie-info">
            <h3 class="movie-title">${escapeHTML(movie.title)}</h3>
            <div class="movie-meta">
              ${genres.map((g) => `<span class="genre-badge">${escapeHTML(g)}</span>`).join("")}
              <span class="lang-badge">${escapeHTML(movie.language)}</span>
            </div>
            <div class="movie-rating">
              ${"★".repeat(Math.round(movie.rating / 2))}${"☆".repeat(5 - Math.round(movie.rating / 2))}
              <span class="rating-num" style="display:inline-flex; align-items:center; gap:4px; margin-left:4px;"><img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" alt="IMDb" style="height: 14px;">${Number(movie.rating).toFixed(1)}/10</span>
            </div>
            <p class="movie-year">${movie.year}</p>
          </div>
        `;
        recGrid.appendChild(card);
      });
    }
  }

  // Button handler
  if (recBtn) {
    recBtn.addEventListener("click", () => {
      displayRecommendations();
      recBtn.textContent = "🔄 Refresh Recommendations";
    });
  }

  // Initial render of watch history
  renderWatchHistory();
});
