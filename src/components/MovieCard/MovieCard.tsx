import type { Movie } from "../../utils/movie";
import "./MovieCard.css";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} poster`}
      />

      {movie.tagline && <p>Tagline: {movie.tagline}</p>}

      {movie.release_date && (
        <p>Release Date: {new Date(movie.release_date).getFullYear()}</p>
      )}

      {movie.vote_average !== undefined && (
        <p>Rating (TMDb): {movie.vote_average.toFixed(1)}/10</p>
      )}

      {movie.cast != undefined && <p>Cast: {movie.cast.join(", ")}.</p>}

      {movie.director && <p>Director: {movie.director}.</p>}

      {movie.overview && <p>Synopsis: {movie.overview}</p>}

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
