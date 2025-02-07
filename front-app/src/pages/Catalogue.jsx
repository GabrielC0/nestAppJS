import React, { useEffect } from 'react';

import './catalogue.css';

function Catalogue() {
  useEffect(() => {
    fetch('https://nestappjs.onrender.com/movies/getMovies?query=batman&page=1')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .finally(() => console.log('Catalogue fetched'));
  }, []);

  return (
    <div className="catalogue-container">
      <h1>Catalogue</h1>
    </div>
  );
}

export default Catalogue;
