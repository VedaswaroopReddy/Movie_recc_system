# 🍿 CineRule: Next-Gen OTT Recommendation Platform

A professional-grade, modern OTT personalization engine and video streaming interface built for a Capstone Project. 

## 🚀 Key Features

*   **Modern Netflix-Style UI**: A fully responsive, dark-mode cinematic interface with hero carousels and genre-based movie rows.
*   **Structured Watch History (M3 Snapshot)**: Tracks every movie viewed with exact timestamps and genre metadata, enabling deep behavioral analysis.
*   **Context-Aware Recommendation Engine**: Analyzes your "Current Context" (Recent Genre, Most Watched Genre, Time of Day) in real-time.
*   **IF-THEN Rule Engine (Dynamic Filtering)**: Implements custom business logic (e.g., "If Time is Evening and Favorite Genre is Action, then recommend Top 5 Action thrillers").
*   **Interactive Admin Panel**: Allows administrators to manage movie metadata and live-configure the recommendation rules.
*   **Bonus: Native OTT Video Player**: Fully integrated HTML5 cinematic video player with custom overlays and automatic telemetry logging.

## 🛠️ Technology Stack

*   **Frontend**: HTML5, Vanilla JavaScript, CSS3 (Custom Netflix Design System).
*   **Data Layer**: LocalStorage-based persistent telemetry and rule engine (Scalable to Backend).
*   **Assets**: TMDB High-Resolution Posters & Dynamic API-driven Metadata.

## 📖 How to Run

1.  Clone this repository:
    ```bash
    git clone https://github.com/your-username/cinerule-ott.git
    ```
2.  Open `index.html` in any modern browser.
3.  For full functionality (like the admin panel and search), we recommend using a simple local server:
    ```bash
    python -m http.server 8080
    ```
    Then visit `http://localhost:8080/`.

## 🎓 Capstone Presentation Credits

Designed and Modernized as a Capstone Project for academic review. 
Special focus on **Requirement M3 (Data Snapshots)** and **M6 (Contextual Integration)**.
