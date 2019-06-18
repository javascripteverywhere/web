import React, { useEffect } from 'react';

const MyNotes = () => {
  useEffect(() => {
    // update the document title
    document.title = 'My Notes — Notedly';
  });

  return (
    <div>
      <p>These are my notes</p>
    </div>
  );
};

export default MyNotes;
