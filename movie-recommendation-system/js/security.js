/**
 * SECURITY.JS - Security utility functions
 * Provides XSS protection and safe data handling.
 */

/**
 * Escapes HTML characters to prevent XSS.
 * @param {string} str - The string to escape.
 * @returns {string} - The escaped string.
 */
function escapeHTML(str) {
  if (!str) return "";
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Safely parses JSON strings.
 * @param {string} str - The JSON string.
 * @param {any} fallback - The fallback value if parsing fails.
 * @returns {any} - The parsed object or fallback.
 */
function safeJSONParse(str, fallback = []) {
  try {
    return JSON.parse(str) || fallback;
  } catch (e) {
    console.warn("JSON Parse Error:", e);
    return fallback;
  }
}

// Export to window for global access
window.escapeHTML = escapeHTML;
window.safeJSONParse = safeJSONParse;
