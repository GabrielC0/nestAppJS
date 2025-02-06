import React, { useState } from 'react';
import { gsap } from 'gsap';

const Reservation = () => {
  const [movie, setMovie] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Movie:', movie, 'Date:', date);
  };

  React.useEffect(() => {
    gsap.from('.reservation-container', { opacity: 0, y: -50, duration: 1 });
  }, []);

  return (
    <div className="reservation-container">
      <h2>Book a Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie Title"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Reserve</button>
      </form>
    </div>
  );
};

export default Reservation;
