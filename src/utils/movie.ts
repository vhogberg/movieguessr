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
  cast?: string[];
  director?: string;
  budget?: number;
  revenue?: number;
}

interface TMDbCastMember {
  name: string;
}

interface TMDbCrewMember {
  job: string;
  name: string;
}

interface TMDbCredits {
  cast: TMDbCastMember[];
  crew: TMDbCrewMember[];
}

export interface TMDbMovieDetails {
  id: number;
  title: string;
  tagline: string;
  budget: number;
  revenue: number;
  credits: TMDbCredits;
}
