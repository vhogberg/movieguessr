import { useEffect, useState } from "react";
import { fetchAllTimePopularMovies, type Movie } from "../../utils/api";

export default function Main() {

  // movies to guess
  const [movies, setMovies] = useState<Movie[]>([]);

  // movies already used (just id)
  const [usedMovies] = useState<Movie[]>([]);

  // loading state (optional but recommended)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const fetchedMovies = await fetchAllTimePopularMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
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

  console.log(movies[0]);

  return (
    <main>
      <h1>Welcome to MovieGuessr!</h1>
      <p>Get ready to test your movie knowledge.</p>
      <p>Loaded {movies.length} movies!</p>
      <p>Used movies: {usedMovies.length}</p>

      <p>Click on a movie to start guessing!</p>

      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title} ({new Date(movie.release_date).getFullYear()})</p>
          </li>
        ))}
      </ul>
    </main>
  );
}