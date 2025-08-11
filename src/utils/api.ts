import axios from "axios";
import type { Movie, TMDbMovieDetails } from "./movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Weighted decade ranges: { start, end, pagesToFetch }
const decadeConfig = [
  { start: 1940, end: 1949, pages: 1 },
  { start: 1950, end: 1959, pages: 1 },
  { start: 1960, end: 1969, pages: 1 },
  { start: 1970, end: 1979, pages: 2 },
  { start: 1980, end: 1989, pages: 3 },
  { start: 1990, end: 1999, pages: 4 },
  { start: 2000, end: 2009, pages: 5 },
  { start: 2010, end: 2019, pages: 5 },
  { start: 2020, end: 2024, pages: 3 },
];

export async function fetchAllTimePopularMovies(): Promise<Movie[]> {
  const allMovies: Movie[] = [];

  for (const decade of decadeConfig) {
    for (let page = 1; page <= decade.pages; page++) {
      const url =
        `https://api.themoviedb.org/3/discover/movie?` +
        `api_key=${API_KEY}` +
        `&sort_by=popularity.desc` +
        `&vote_count.gte=1000` + // avoid obscure titles
        `&primary_release_date.gte=${decade.start}-01-01` +
        `&primary_release_date.lte=${decade.end}-12-31` +
        `&language=en-US` +
        `&page=${page}`;

      try {
        const res = await axios.get(url);
        allMovies.push(...res.data.results);
      } catch (err) {
        console.error(`Error fetching ${decade.start}s page ${page}`, err);
      }
    }
  }

  // Deduplicate by ID
  const uniqueMovies = Array.from(
    new Map(allMovies.map((m) => [m.id, m])).values()
  );

  // Shuffle
  for (let i = uniqueMovies.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniqueMovies[i], uniqueMovies[j]] = [uniqueMovies[j], uniqueMovies[i]];
  }

  return uniqueMovies;
}

export async function fetchMovieDetails(movieId: number) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`;
  const res = await axios.get<TMDbMovieDetails>(url);

  if (!res.data) {
    throw new Error(`Movie with ID ${movieId} not found`);
  }

  const data = res.data;

  const director = data.credits.crew.find(
    (person) => person.job === "Director"
  )?.name;

  const cast = data.credits.cast.slice(0, 5).map((actor) => actor.name);

  return {
    id: data.id,
    tagline: data.tagline,
    budget: data.budget,
    revenue: data.revenue,
    cast,
    director,
  };
}
