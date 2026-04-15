// ==========================================
// ADMIN.JS — Admin Panel Logic
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  requireAuth();

  const username = getCurrentUser();
  
  if (username !== "admin") {
    alert("Access Denied: You must be logged in as 'admin' to view this page.");
    window.location.href = "catalog.html";
    return;
  }

  const userNameEl = document.getElementById("userName");
  if (userNameEl) userNameEl.textContent = username;

  // ---- MOVIE MANAGEMENT ----
  const addMovieForm = document.getElementById("addMovieForm");
  const movieTableBody = document.getElementById("movieTableBody");
  const adminSortDropdown = document.getElementById("adminSortDropdown");
  const sortDropdownTrigger = document.getElementById("sortDropdownTrigger");
  const sortDropdownMenu = document.getElementById("sortDropdownMenu");
  const currentSortLabel = document.getElementById("currentSortLabel");
  const adminSearchInput = document.getElementById("adminSearchInput");

  let currentSortValue = "default";

  if (adminSearchInput) {
    adminSearchInput.addEventListener("input", renderMovieTable);
  }

  if (adminSortDropdown && sortDropdownTrigger) {
    // Toggle dropdown
    sortDropdownTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      adminSortDropdown.classList.toggle("open");
    });

    // Close on click outside
    document.addEventListener("click", () => {
      adminSortDropdown.classList.remove("open");
    });

    // Handle selection
    sortDropdownMenu.querySelectorAll(".dropdown-item").forEach(item => {
      item.addEventListener("click", () => {
        const value = item.getAttribute("data-value");
        const label = item.querySelector("span:last-child").textContent;
        
        // Update UI
        sortDropdownMenu.querySelectorAll(".dropdown-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        currentSortLabel.textContent = label;
        currentSortValue = value;
        
        // Close and trigger render
        adminSortDropdown.classList.remove("open");
        
        // Animate table change
        const fullSection = document.querySelector(".full-width-section");
        fullSection.classList.add("sort-changing");
        
        setTimeout(() => {
          renderMovieTable();
          fullSection.classList.remove("sort-changing");
        }, 300);
      });
    });
  }

  function renderMovieTable() {
    if (!movieTableBody) return;
    let movies = getAllMovies();
    movieTableBody.innerHTML = "";

    // Filter by search query
    if (adminSearchInput) {
      const query = adminSearchInput.value.toLowerCase();
      if (query) {
        movies = movies.filter(movie => {
          const genres = getMovieGenres(movie).join(" ").toLowerCase();
          return (
            movie.title.toLowerCase().includes(query) ||
            movie.year.toString().includes(query) ||
            movie.language.toLowerCase().includes(query) ||
            genres.includes(query)
          );
        });
      }
    }

    const sortVal = currentSortValue;
    if (sortVal === "name_asc") movies.sort((a,b) => a.title.localeCompare(b.title));
    else if (sortVal === "name_desc") movies.sort((a,b) => b.title.localeCompare(a.title));
    else if (sortVal === "date_desc") movies.sort((a,b) => b.year - a.year);
    else if (sortVal === "date_asc") movies.sort((a,b) => a.year - b.year);
    else if (sortVal === "rating_desc") movies.sort((a,b) => b.rating - a.rating);
    else if (sortVal === "rating_asc") movies.sort((a,b) => a.rating - b.rating);
    else if (sortVal === "language") movies.sort((a,b) => a.language.localeCompare(b.language));
    else if (sortVal === "genre") movies.sort((a,b) => (getMovieGenres(a)[0] || "").localeCompare(getMovieGenres(b)[0] || ""));

    movies.forEach((movie) => {
      const genres = getMovieGenres(movie);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <div class="table-movie">
            <img class="table-poster" src="${movie.poster}" alt="${escapeHTML(movie.title)}" onerror="this.style.display='none';">
            <span>${escapeHTML(movie.title)}</span>
          </div>
        </td>
        <td>${genres.map((g) => `<span class="genre-badge">${escapeHTML(g)}</span>`).join(" ")}</td>
        <td>${escapeHTML(movie.language)}</td>
        <td>${"★".repeat(Math.round(movie.rating))} ${movie.rating}</td>
        <td>${movie.year}</td>
        <td>
          <button class="btn btn-edit-sm" data-id="${movie.id}" title="Edit movie">✏️</button>
          <button class="btn btn-remove-sm" data-id="${movie.id}" title="Remove movie">🗑️</button>
        </td>
      `;
      movieTableBody.appendChild(row);
    });

    // Attach remove handlers
    movieTableBody.querySelectorAll(".btn-remove-sm").forEach((btn) => {
      btn.addEventListener("click", () => {
        const movieId = parseInt(btn.getAttribute("data-id"));
        if (confirm("Remove this movie from the catalog?")) {
          removeMovie(movieId);
          renderMovieTable();
          showAdminMsg("Movie removed successfully.", "success");
        }
      });
    });

    // Attach edit handlers
    movieTableBody.querySelectorAll(".btn-edit-sm").forEach((btn) => {
      btn.addEventListener("click", () => {
        const movieId = parseInt(btn.getAttribute("data-id"));
        const movie = movies.find(m => m.id === movieId);
        if (movie) populateEditForm(movie);
      });
    });
  }

  const addMovieTitleEl = document.getElementById("addMovieTitle");
  const editMovieIdInput = document.getElementById("editMovieId");
  const submitBtn = addMovieForm ? addMovieForm.querySelector(".btn-submit") : null;

  function populateEditForm(movie) {
    if (!editMovieIdInput) return;
    editMovieIdInput.value = movie.id;
    addMovieTitleEl.textContent = "✏️ Edit Movie";
    submitBtn.textContent = "💾 Save Changes";

    document.getElementById("movieTitle").value = movie.title;
    document.getElementById("movieLang").value = movie.language;
    document.getElementById("movieRating").value = movie.rating;
    document.getElementById("movieYear").value = movie.year;
    document.getElementById("moviePoster").value = movie.poster || "";

    const genres = getMovieGenres(movie);
    document.querySelectorAll('input[name="movieGenre"]').forEach(cb => {
      cb.checked = genres.includes(cb.value);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetFormMode() {
    if (!addMovieForm) return;
    addMovieForm.reset();
    editMovieIdInput.value = "";
    addMovieTitleEl.textContent = "🎬 Add New Movie";
    submitBtn.textContent = "➕ Add Movie";
  }

  if (addMovieForm) {
    addMovieForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("movieTitle").value.trim();
      const genreCheckboxes = document.querySelectorAll('input[name="movieGenre"]:checked');
      const genres = Array.from(genreCheckboxes).map((cb) => cb.value);
      const language = document.getElementById("movieLang").value.trim();
      const rating = parseFloat(document.getElementById("movieRating").value);
      const year = parseInt(document.getElementById("movieYear").value);
      const poster = document.getElementById("moviePoster").value.trim();

      if (!title || genres.length === 0 || !language || isNaN(rating) || isNaN(year)) {
        showAdminMsg("Please fill in all fields and select at least one genre.", "error");
        return;
      }

      const editId = editMovieIdInput.value;

      if (editId) {
        // Edit mode
        const movieId = parseInt(editId);
        const updatedMovie = {
          id: movieId,
          title,
          genres,
          language,
          rating: Math.min(5, Math.max(1, rating)),
          year,
          poster: poster || "",
        };

        const userMovies = JSON.parse(localStorage.getItem("userMovies") || "[]");
        const existingIdx = userMovies.findIndex(m => m.id === movieId);
        
        if (existingIdx !== -1) {
          userMovies[existingIdx] = updatedMovie;
        } else {
          userMovies.push(updatedMovie);
        }
        localStorage.setItem("userMovies", JSON.stringify(userMovies));
        showAdminMsg(`"${title}" updated successfully!`, "success");
      } else {
        // Add Mode
        const allMovies = getAllMovies();
        const maxId = [...DEFAULT_MOVIES, ...allMovies].reduce(
          (max, m) => Math.max(max, m.id),
          0
        );

        const newMovie = {
          id: maxId + 1,
          title,
          genres,
          language,
          rating: Math.min(5, Math.max(1, rating)),
          year,
          poster: poster || "",
        };

        const userMovies = safeJSONParse(localStorage.getItem("userMovies"), []);
        userMovies.push(newMovie);
        localStorage.setItem("userMovies", JSON.stringify(userMovies));
        showAdminMsg(`"${title}" added successfully!`, "success");
      }

      resetFormMode();
      renderMovieTable();
    });
  }

  // ---- RULE MANAGEMENT ----
  const addRuleForm = document.getElementById("addRuleForm");
  const rulesListEl = document.getElementById("rulesList");
  
  const rulesModal = document.getElementById("rulesModal");
  const openRulesBtn = document.getElementById("openRulesBtn");
  const closeRulesBtn = document.getElementById("closeRulesBtn");

  if (openRulesBtn && rulesModal) {
    openRulesBtn.addEventListener("click", () => {
      rulesModal.showModal();
      document.body.style.overflow = "hidden";
    });
  }

  if (closeRulesBtn && rulesModal) {
    closeRulesBtn.addEventListener("click", () => rulesModal.close());
    
    // Listen for native dialog close (covers button and Escape key)
    rulesModal.addEventListener("close", () => {
      document.body.style.overflow = "auto";
    });
  }

  function renderRules() {
    if (!rulesListEl) return;
    const rules = getAllRules();
    rulesListEl.innerHTML = "";

    rules.forEach((rule, index) => {
      const ruleCard = document.createElement("div");
      ruleCard.className = "rule-card";
      ruleCard.innerHTML = `
        <div class="rule-header">
          <span class="rule-number">#${index + 1}</span>
          <span class="rule-name">${escapeHTML(rule.name)}</span>
        </div>
        <div class="rule-body">
          <p class="rule-condition"><strong>IF:</strong> ${escapeHTML(rule.conditionText)}</p>
          <p class="rule-action"><strong>THEN:</strong> Recommend ${rule.targetGenres.map(g => escapeHTML(g)).join(", ")}</p>
          <p class="rule-reason"><strong>Reason:</strong> ${escapeHTML(rule.reason)}</p>
        </div>
      `;
      rulesListEl.appendChild(ruleCard);
    });
  }

  if (addRuleForm) {
    addRuleForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("ruleName").value.trim();
      const checkGenre = document.getElementById("ruleGenre").value;
      const checkTime = document.getElementById("ruleTime").value;
      const targetGenresStr = document
        .getElementById("ruleTargetGenres")
        .value.trim();
      const reason = document.getElementById("ruleReason").value.trim();

      if (!name || !targetGenresStr || !reason) {
        showAdminMsg("Please fill in all rule fields.", "error");
        return;
      }

      const targetGenres = targetGenresStr.split(",").map((g) => g.trim()).filter(Boolean);
      if (targetGenres.length === 0) {
        showAdminMsg("Please provide at least one valid target genre.", "error");
        return;
      }

      const condParts = [];
      if (checkGenre && checkGenre !== "Any")
        condParts.push(`recent_genre = ${checkGenre}`);
      if (checkTime && checkTime !== "Any")
        condParts.push(`time = ${checkTime}`);
      const conditionText =
        condParts.length > 0 ? "IF " + condParts.join(" AND ") : "IF always";

      const userRules = safeJSONParse(
        localStorage.getItem("userRules"), []
      );
      const maxId = [...DEFAULT_RULES, ...userRules].reduce(
        (max, r) => Math.max(max, r.id),
        0
      );

      userRules.push({
        id: maxId + 1,
        name,
        conditionText,
        checkGenre,
        checkTime,
        targetGenres,
        reason,
      });

      localStorage.setItem("userRules", JSON.stringify(userRules));
      addRuleForm.reset();
      renderRules();
      showAdminMsg(`Rule "${name}" added successfully!`, "success");
    });
  }

  // ---- HELPERS ----
  const adminMsg = document.getElementById("adminMessage");
  function showAdminMsg(text, type) {
    if (!adminMsg) return;
    adminMsg.textContent = text;
    adminMsg.className = "admin-msg " + type;
    setTimeout(() => {
      adminMsg.textContent = "";
      adminMsg.className = "admin-msg";
    }, 3000);
  }

  // Initial render
  renderMovieTable();
  renderRules();
});
