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
    // the default state includes a local isLoggedIn boolean
    defaults: {
      isLoggedIn: !!localStorage.getItem('token')
    },
    resolvers: {},
    connectToDevTools: true
  },
  request: operation => {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token') || ''
      }
    });
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
