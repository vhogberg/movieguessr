import type { Movie } from "../../utils/movie";
import "./MovieCard.css";

export default function MovieCard({
  movie,
  blurLevel,
}: {
  movie: Movie;
  blurLevel: number;
}) {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} poster`}
        className={`poster-blur-level-${blurLevel}`}
      />

      {movie.tagline && (
        <p>
          <span>Tagline:</span> {movie.tagline}
        </p>
      )}

      {movie.release_date && (
        <p>
          <span>Release Date:</span>{" "}
          {new Date(movie.release_date).getFullYear()}
        </p>
      )}

      {movie.vote_average !== undefined && (
        <p>
          <span>Rating (TMDb):</span> {movie.vote_average.toFixed(1)}/10
        </p>
      )}

      {movie.cast != undefined && (
        <p>
          <span>Cast:</span> {movie.cast.join(", ")}.
        </p>
      )}

      {movie.director && (
        <p>
          <span>Director: </span> {movie.director}.
        </p>
      )}

      {movie.overview && (
        <p>
          <span>Synopsis: </span>
          {movie.overview}
        </p>
      )}

      <span>Financials:</span>
      {((movie.budget ?? 0) > 0 || (movie.revenue ?? 0) > 0) && (
        <p>
          {(movie.budget ?? 0) > 0 &&
            `Budget: $${(movie.budget ?? 0).toLocaleString()}`}
          {(movie.budget ?? 0) > 0 && (movie.revenue ?? 0) > 0 && " | "}
          {(movie.revenue ?? 0) > 0 &&
            `Box Office: $${(movie.revenue ?? 0).toLocaleString()}`}
        </p>
      )}
    </div>
  );
}
