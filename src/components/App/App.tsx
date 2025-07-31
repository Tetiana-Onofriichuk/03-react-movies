// src/components/App/App.tsx

import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../Services/movieService";
import { useState } from "react";
import type { Movies } from "../../types/Movies";
import MovieGrid from "../MovieGrid/MovieGrid";

export default function App() {
  const [movies, setMovies] = useState<Movies[]>([]);

  const handleSearch = async (newQuery: string) => {
    console.log("handleSearch", newQuery);

    try {
      const results = await fetchMovies(newQuery);
      setMovies(results);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };
  const handleSelectMovie = (movie: Movies) => {
    console.log("Selected movie:", movie);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Toaster position="top-center" />

      <MovieGrid movies={movies} onSelect={handleSelectMovie} />
    </>
  );
}
