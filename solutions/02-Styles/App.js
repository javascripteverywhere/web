import React from 'react';
import ReactDOM from 'react-dom';

import GlobalStyle from '/components/GlobalStyle';

// import our routes
import Pages from '/pages';

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Pages />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
