import "./Footer.css";

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
          TMDb API
        </a>{" "}
        but is not endorsed or certified by TMDb.
      </p>
      <p>© 2025 MovieGuessr. All rights reserved.</p>
    </footer>
  );
}
