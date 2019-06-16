import React, { useEffect } from 'react';

const Favorites = () => {
  useEffect(() => {
    // update the document title
    document.title = 'Favorites — Notedly';
  });

  return (
    <div>
      <h1>Notedly</h1>
      <p>These are my Favorites</p>
    </div>
  );
};

export default Favorites;
