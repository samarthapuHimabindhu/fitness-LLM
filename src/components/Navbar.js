import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  if (location.pathname === '/videos') {
    return null;
  }

  return (
    <div style={{ color: 'white', padding: '10px', textAlign: 'center', fontSize: '20px', flexShrink: 0 }}>
      <h1>FITNESS TRACKER</h1>
    </div>
  );
};

export default Navbar;
