import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import GlobalStyle from '/components/GlobalStyle';

const uri = process.env.API_URI;
// configure Apollo Client
const client = new ApolloClient({
  uri,
  clientState: {
    connectToDevTools: true
  }
});

// import our routes
import Pages from '/pages';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
