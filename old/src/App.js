import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useEffect } from "react";
import { useCallback } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setisLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }

    setisLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  let content = <p>No movies found.</p>;
  if (!isLoading && movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (!isLoading && error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading Content...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
