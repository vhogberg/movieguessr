import axios from "axios";
import type { Movie } from "./movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Weighted decade ranges: { start, end, pagesToFetch }
const decadeConfig = [
  { start: 1940, end: 1949, pages: 1 }, // ~20 movies
  { start: 1950, end: 1959, pages: 1 }, // ~20 movies
  { start: 1960, end: 1969, pages: 1 }, // ~20 movies
  { start: 1970, end: 1979, pages: 2 }, // ~40 movies
  { start: 1980, end: 1989, pages: 2 }, // ~40 movies
  { start: 1990, end: 1999, pages: 4 }, // ~80 movies
  { start: 2000, end: 2009, pages: 5 }, // ~100 movies
  { start: 2010, end: 2019, pages: 6 }, // ~120 movies
  { start: 2020, end: 2024, pages: 4 }, // ~80 movies
];



export async function fetchAllTimePopularMovies(): Promise<Movie[]> {
  const allMovies: Movie[] = [];

  for (const decade of decadeConfig) {
    for (let page = 1; page <= decade.pages; page++) {
      const url = `https://api.themoviedb.org/3/discover/movie?` +
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
  const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values());

  // Shuffle
  for (let i = uniqueMovies.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniqueMovies[i], uniqueMovies[j]] = [uniqueMovies[j], uniqueMovies[i]];
  }

  return uniqueMovies;
}