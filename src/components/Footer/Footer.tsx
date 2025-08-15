import "./Footer.css";

import TMDBLogo from "../../assets/TMDB-logo.svg";

export default function Footer() {
  return (
    <footer>
      <p>
        This product uses the{" "}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TMDB API
        </a>{" "}
        but is not endorsed or certified by TMDB.
      </p>
      <img src={TMDBLogo} alt="TMDB-logo" className="TMDB-logo" />

      <p>© 2025 MovieGuessr. All rights reserved.</p>
    </footer>
  );
}
