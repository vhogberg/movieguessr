import { useEffect, useState } from "react";
import { fetchAllTimePopularMovies, fetchMovieDetails } from "../../utils/api";
import type { Movie } from "../../utils/movie";
import GuessingField from "../GuessingField/GuessingField";
import MovieCard from "../MovieCard/MovieCard";

import "./Main.css";

export default function Main() {
  // movies to guess
  const [movies, setMovies] = useState<Movie[]>([]);

  // movies already used (just id)
  const [usedMovies, setUsedMovies] = useState<Movie[]>([]);

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
        prev.map((m) => (m.id === currentMovie.id ? { ...m, ...details } : m))
      );
    });
  }, [currentMovie]);

  const [blurLevel, setBlurLevel] = useState(5);

  function checkGuess(guess: string) {
    if (isCloseMatch(guess, currentMovie.title)) {
      alert("Correct!");
      setBlurLevel(0);
    } else {
      alert("Wrong!");
    }
  }

  function isCloseMatch(guess: string, answer: string, tolerance = 2): boolean {
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/\bthe\b/g, "") // remove "the"
        .replace(/\s+/g, " ")
        .replace(/[^\p{L}\p{N}\s]/gu, "") // strip punctuation
        .replace(/\bii\b/g, "2") // roman numeral 2
        .replace(/\biii\b/g, "3") // roman numeral 3
        .replace(/\biv\b/g, "4")
        .replace(/\bi\b/g, "1");

    const normGuess = normalize(guess);
    const normAnswer = normalize(answer);

    // Direct match
    if (normGuess === normAnswer) return true;

    // Check typo tolerance
    return levenshteinDistance(normGuess, normAnswer) <= tolerance;
  }

  function levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

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
      <p>
        Guess the movie based on the clues provided. You can unblur further
        clues and the poster by clicking the button below. Good luck!
      </p>

      {currentMovie && <MovieCard movie={currentMovie} blurLevel={blurLevel} />}

      {/* Hide guessing field if user has given up or guessed correctly */}
      {blurLevel > 0 && <GuessingField onSubmit={checkGuess} />}

      <div className="game-control-buttons">
        {blurLevel > 0 ? (
          <>
            <button onClick={() => setBlurLevel(Math.max(1, blurLevel - 1))}>
              Reveal Clue
            </button>

            <button
              onClick={() => {
                setBlurLevel(0);
              }}
            >
              Give Up
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              usedMovies.push(currentMovie);
              setUsedMovies([...usedMovies]);
              setCurrentIndex((prev) =>
                prev + 1 < movies.length ? prev + 1 : 0
              );
              setBlurLevel(5); // reset blur level for the next movie
            }}
          >
            Next Movie
          </button>
        )}
      </div>
    </main>
  );
}
