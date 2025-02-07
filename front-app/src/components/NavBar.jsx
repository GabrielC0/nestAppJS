import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/reservation">reservation</a>
        </li>
        <li>
          <a href="/catalogue">Catalogue</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
