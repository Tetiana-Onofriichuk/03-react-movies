// src/services/movieService.ts
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const IMAGE_SIZE = "original";
import axios from "axios";
import type { Movies } from "../types/Movies";

interface FetchMoviesResponse {
  results: Movies[];
}

export async function fetchMovies(query: string): Promise<Movies[]> {
  const response = await axios.get<FetchMoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    }
  );

  return response.data.results;
}

export function getImageUrl(path: string) {
  if (!path) return null;
  return `${IMAGE_BASE_URL}${IMAGE_SIZE}${path}`;
}
