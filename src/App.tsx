import { useRef, useState } from 'react';
import './App.css';
import { fetchMovies } from './services/api';
import { Movie } from './types/types';
import { useDebouncedCallback } from 'use-debounce';
import MoviesList from './components/MoviesList';

function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getMovies = async ({ query }: { query: string }) => {
    setLoading(true);
    const movies = await fetchMovies({ query });
    setMovies(movies);
    setLoading(false);
  };

  return { movies, loading, getMovies };
}

function App() {
  const { movies, loading, getMovies } = useMovies();
  const [firstSearch, setFirstSearch] = useState(true);
  const prevQuery = useRef('');

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const query = String(new FormData(evt.currentTarget).get('query'));
    if (prevQuery.current === query) return;
    prevQuery.current = query;
    getMovies({ query });
  };

  const debouncedGetMovies = useDebouncedCallback(
    (query: string) => getMovies({ query }),
    300
  );

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFirstSearch(false);
    const query = evt.target.value;
    debouncedGetMovies(query);
  };

  return (
    <div className="app">
      <header>
        <h1>App movie</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="query" onChange={handleChange} />
          <button type="submit">Search</button>
        </form>
      </header>
      <main>
        {firstSearch ? (
          <p>Try to search something</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <MoviesList movies={movies} />
        )}
      </main>
    </div>
  );
}

export default App;
