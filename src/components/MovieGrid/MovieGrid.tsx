import css from "./MovieGrid.module.css";
import type { Movies } from "../../types/Movies";
import { getImageUrl } from "../../Services/movieService";

interface MovieGridProps {
  movies: Movies[];
  onSelect: (movie: Movies) => void;
}
export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (movies.length === 0) return null;

  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const imageUrl = getImageUrl(movie.poster_path);
        return (
          <li key={movie.id}>
            <div className={css.card} onClick={() => onSelect(movie)}>
              {imageUrl ? (
                <img
                  className={css.image}
                  src={imageUrl}
                  alt={movie.title}
                  loading="lazy"
                />
              ) : (
                <div className={css.noImage}>No image available</div> // або заглушка
              )}
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
