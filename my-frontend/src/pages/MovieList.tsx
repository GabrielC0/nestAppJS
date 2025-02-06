import React, { useState } from 'react';
import { gsap } from 'gsap';

const MovieList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<string[]>([
    'Inception',
    'Titanic',
    'The Dark Knight',
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Ideally, here you'd call your API to get the filtered list
  };

  React.useEffect(() => {
    gsap.from('.movie-list-container', { opacity: 0, x: -100, duration: 1 });
  }, []);

  return (
    <div className="movie-list-container">
      <h2>Movie List</h2>
      <input
        type="text"
        placeholder="Search Movies"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {movies
          .filter((movie) =>
            movie.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
      </ul>
    </div>
  );
};

export default MovieList;
