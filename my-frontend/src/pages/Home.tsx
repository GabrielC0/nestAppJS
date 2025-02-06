import React from 'react';
import { gsap } from 'gsap';

const Home = () => {
  React.useEffect(() => {
    gsap.from('.home-container', { opacity: 0, scale: 0.5, duration: 1 });
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to MovieHub</h1>
      <p>Your favorite movie reservation platform.</p>
    </div>
  );
};

export default Home;
