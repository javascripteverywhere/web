import React from 'react';
import ReactDOM from 'react-dom';

// import our routes
import Pages from '/pages';

const App = () => {
  return (
    <div>
      <Pages />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
