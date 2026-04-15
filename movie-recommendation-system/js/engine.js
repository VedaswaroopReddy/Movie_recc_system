// ==========================================
// ENGINE.JS — Context Analyzer & Rule Engine
// ==========================================

/**
 * CONTEXT ANALYZER
 * Extracts context from the user's watch history.
 *
 * @param {string} username - current user
 * @returns {Object} context object
 */
function analyzeContext(username) {
  const history = JSON.parse(
    localStorage.getItem("watchHistory_" + username) || "[]"
  );
  const allMovies = getAllMovies();

  // Watch count
  const watchCount = history.length;
  const isNewUser = watchCount === 0;

  // Recent genre: PRIMARY genre of the LAST watched movie
  let recentGenre = null;
  if (history.length > 0) {
    const lastMovieId = history[0].movieId || history[0]; // Backward fallback
    const lastMovie = allMovies.find((m) => m.id === lastMovieId);
    recentGenre = lastMovie ? getMoviePrimaryGenre(lastMovie) : null;
  }

  // Most frequent genre (across all genres of each movie)
  let mostFreqGenre = null;
  if (history.length > 0) {
    const genreCount = {};
    history.forEach((record) => {
      const movieId = record.movieId || record;
      const movie = allMovies.find((m) => m.id === movieId);
      if (movie) {
        const genres = getMovieGenres(movie);
        genres.forEach((g) => {
          genreCount[g] = (genreCount[g] || 0) + 1;
        });
      }
    });
    // Find genre with highest count
    let maxCount = 0;
    for (const genre in genreCount) {
      if (genreCount[genre] > maxCount) {
        maxCount = genreCount[genre];
        mostFreqGenre = genre;
      }
    }
  }

  // Time of Day
  const hour = new Date().getHours();
  let timeOfDay;
  if (hour >= 5 && hour < 12) {
    timeOfDay = "Morning";
  } else if (hour >= 12 && hour < 19) {
    timeOfDay = "Evening";
  } else {
    timeOfDay = "Night";
  }

  return {
    recentGenre,
    mostFreqGenre,
    timeOfDay,
    watchCount,
    isNewUser,
  };
}

/**
 * RULE ENGINE
 * Iterates rules in order and returns the FIRST matching rule.
 *
 * @param {Object} context - output of analyzeContext()
 * @returns {Object} { matchedRule, targetGenres, reason }
 */
function applyRules(context) {
  const rules = getAllRules();

  for (const rule of rules) {
    try {
      if (rule.condition(context)) {
        return {
          matchedRule: rule,
          targetGenres: rule.targetGenres,
          reason: rule.reason,
        };
      }
    } catch (e) {
      console.warn("Rule error:", rule.name, e);
    }
  }

  return {
    matchedRule: null,
    targetGenres: ["Action", "Comedy", "Drama"],
    reason: "Showing popular movies (no rule matched).",
  };
}

/**
 * GET RECOMMENDATIONS
 * Full pipeline: analyze context → apply rules → filter & sort movies.
 * Uses multi-genre matching: a movie is recommended if ANY of its genres
 * matches ANY of the target genres.
 *
 * @param {string} username - current user
 * @returns {Object} { recommendations, context, ruleResult }
 */
function getRecommendations(username) {
  // Step 1: Analyze context
  const context = analyzeContext(username);

  // Step 2: Apply rules
  const ruleResult = applyRules(context);

  // Step 3: Get all movies & user's watch history
  const allMovies = getAllMovies();
  const history = JSON.parse(
    localStorage.getItem("watchHistory_" + username) || "[]"
  );

  // Step 4: Filter — match genres (multi-genre), exclude watched
  let recommendations = allMovies.filter((movie) => {
    const movieGenres = getMovieGenres(movie);
    const isTargetGenre = movieGenres.some((g) =>
      ruleResult.targetGenres.includes(g)
    );
    const alreadyWatched = history.some((h) => {
      const hId = h.movieId || h;
      return hId === movie.id;
    });
    return isTargetGenre && !alreadyWatched;
  });

  // Step 5: Sort by rating (highest first)
  recommendations.sort((a, b) => b.rating - a.rating);

  return {
    recommendations,
    context,
    ruleResult,
  };
}
