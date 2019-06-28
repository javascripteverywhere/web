import React, { useEffect } from 'react';

import Button from '../components/Button';

const MyNotes = () => {
  useEffect(() => {
    // update the document title
    document.title = 'My Notes — Notedly';
  });

  return (
    <div>
      <p>These are my notes</p>
      <Button>Click me!</Button>
    </div>
  );
};

export default MyNotes;
