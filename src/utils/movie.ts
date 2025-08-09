export interface Movie {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  release_date: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  overview: string;
  
  // optional, not always available
  tagline?: string;
  cast?: [string];
  director?: string;
  budget?: number;
  revenue?: number;
}
