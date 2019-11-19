import React from 'react';
import ReactDOM from 'react-dom';

// import Apollo Client libraries
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// global styles
import GlobalStyle from '/components/GlobalStyle';
// import our routes
import Pages from '/pages';

const uri = process.env.API_URI;

// configure Apollo Client
const client = new ApolloClient({
  uri,
  clientState: {
    connectToDevTools: true
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Pages />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
