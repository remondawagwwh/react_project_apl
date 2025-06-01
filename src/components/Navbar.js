import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/favorites" style={styles.link}>Favorites</Link>
      <Link to="/login" style={styles.link}>Login</Link>
      <Link to="/register" style={styles.link}>Register</Link>
    </nav>
  );
}

const styles = {
  nav: {
    background: '#333',
    padding: '10px',
  },
  link: {
    color: '#fff',
    marginRight: '15px',
    textDecoration: 'none',
  }
};

export default Navbar;
