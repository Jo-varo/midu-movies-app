import { Movie, Response } from '../types/types';

const apiURL = (query: string) =>
  `https://www.omdbapi.com/?s=${query}&type=movie&apikey=614449fd`;

export const fetchMovies = async ({ query }: { query: string }) => {
  try {
    if (query === '') throw new Error();
    const res = await fetch(apiURL(query.trim()));
    if (!res.ok) throw new Error();
    const data: Response = await res.json();

    const mappedMovies: Movie[] = data.Search?.map((movie) => ({
      id: movie.imdbID,
      poster: movie.Poster,
      title: movie.Title,
      year: movie.Year,
    }));

    return mappedMovies;
  } catch (e) {
    console.log(e);
    throw new Error('Error at fetching movies');
  }
};
