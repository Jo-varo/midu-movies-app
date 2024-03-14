import { Movie } from '../types/types';

interface Props {
  movies: Movie[];
}

export default function MoviesList({ movies }: Props) {
  return (
    <>
      {movies?.length > 0 ? (
        <ul className="movies">
          {movies?.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <img
                src={movie.poster}
                alt={`Poster of the movie "${movie.title}"`}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no movies to show, search something else</p>
      )}
    </>
  );
}
