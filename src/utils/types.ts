export type MovieData = {
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  adult: boolean;
  release_date: string;
  genre_ids: number[];
  title: string;
  popularity: number;
  original_title: string;
  original_language: string;
  vote_average: number;
  director: string;
};

export type MovieDataResponse = {
  page: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
};

export type AiMovieResponse = {
  title: string;
  year: string;
  director: string;
};
