import type { Movie } from "../../utils/movie";
import "./MovieCard.css";
import MovieClue from "./MovieClue/MovieClue";

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
        className={`poster poster-blur-level-${blurLevel}`}
      />

      <div className="movie-details">
        {movie.tagline && (
          <MovieClue
            clueLabel="Tagline:"
            clueContent={movie.tagline}
            isHidden={false} // Always show tagline
          />
        )}


          {movie.vote_average !== undefined && (
            <MovieClue
              clueLabel="Rating (TMDB):"
              clueContent={`${movie.vote_average.toFixed(1)}/10`}
              isHidden={false} // Always show rating
            />
          )}

          {movie.release_date && (
            <MovieClue
              clueLabel="Release Date:"
              clueContent={new Date(movie.release_date)
                .getFullYear()
                .toString()}
              isHidden={false} // Always show release date
            />
          )}

        {movie.director && (
          <MovieClue
            clueLabel="Director:"
            clueContent={movie.director}
            isHidden={blurLevel > 4}
          />
        )}
        {movie.cast != undefined && (
          <MovieClue
            clueLabel="Cast:"
            clueContent={movie.cast.join(", ")}
            isHidden={blurLevel > 3}
          />
        )}

        {movie.overview && (
          <MovieClue
            clueLabel="Synopsis:"
            clueContent={movie.overview}
            isHidden={blurLevel > 2}
          />
        )}

        {((movie.budget ?? 0) > 0 || (movie.revenue ?? 0) > 0) && (
          <MovieClue
            clueLabel="Financials:"
            clueContent={[
              (movie.budget ?? 0) > 0 &&
                `Budget: $${(movie.budget ?? 0).toLocaleString()}`,
              (movie.budget ?? 0) > 0 && (movie.revenue ?? 0) > 0 && " | ",
              (movie.revenue ?? 0) > 0 &&
                `Box Office: $${(movie.revenue ?? 0).toLocaleString()}`,
            ]
              .filter(Boolean)
              .join("")}
            isHidden={blurLevel > 1}
          />
        )}
      </div>
    </div>
  );
}
