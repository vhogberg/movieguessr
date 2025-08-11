import { useEffect, useState } from "react";
import { fetchAllTimePopularMovies, fetchMovieDetails } from "../../utils/api";
import type { Movie } from "../../utils/movie";
import MovieCard from "../MovieCard/MovieCard";

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

  const currentMovie = movies[currentIndex];

  // Fetch details only for the current movie
  useEffect(() => {
    if (!currentMovie) return; // nothing to fetch yet
    if (currentMovie.tagline) return; // already fetched details

    fetchMovieDetails(currentMovie.id).then((details) => {
      setMovies((prev) =>
        prev.map((m) =>
          m.id === currentMovie.id ? { ...m, ...details } : m
        )
      );
    });
  }, [currentMovie]);

  if (loading) {
    return (
      <main>
        <h1>Welcome to MovieGuessr!</h1>
        <p>Loading movies...</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Welcome to MovieGuessr!</h1>
      <p>Get ready to test your movie knowledge.</p>
      <p>Loaded {movies.length} movies!</p>
      <p>Used movies: {usedMovies.length}</p>

      {currentMovie && (
        <MovieCard
          movie={currentMovie}
        />
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
