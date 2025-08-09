import { useEffect, useState } from "react";
import { fetchAllTimePopularMovies } from "../../utils/api";
import type { Movie } from "../../utils/movie";

export default function Main() {
  // movies to guess
  const [movies, setMovies] = useState<Movie[]>([]);

  // movies already used (just id)
  const [usedMovies] = useState<Movie[]>([]);

  // loading state
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const fetchedMovies = await fetchAllTimePopularMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Welcome to MovieGuessr!</h1>
        <p>Loading movies...</p>
      </main>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <main>
      <h1>Welcome to MovieGuessr!</h1>
      <p>Get ready to test your movie knowledge.</p>
      <p>Loaded {movies.length} movies!</p>
      <p>Used movies: {usedMovies.length}</p>

      {currentMovie && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
            alt="Movie poster"
          />
          <p>
            {currentMovie.title} (
            {new Date(currentMovie.release_date).getFullYear()})
          </p>
        </div>
      )}

      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev + 1 < movies.length ? prev + 1 : 0))
        }
      >
        Next Movie
      </button>
    </main>
  );
}
