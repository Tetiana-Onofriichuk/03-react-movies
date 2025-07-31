import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../Services/movieService";
import { useState } from "react";
import type { Movies } from "../../types/Movies";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";

export default function App() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = async (newQuery: string) => {
    setIsLoading(true);
    try {
      const results = await fetchMovies(newQuery);
      setMovies(results);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movies) => {
    console.log("Selected movie:", movie);
    // Можна додати відкриття модалки або деталізацію фільму
  };

  return (
    <div className={css.app}>
      <SearchBar onSearch={handleSearch} />
      <Toaster position="top-center" />

      {isLoading ? (
        <Loader />
      ) : (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
    </div>
  );
}
