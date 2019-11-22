import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

// import global styles
import GlobalStyle from '/components/GlobalStyle';
// import our routes
import Pages from '/pages';

const uri = process.env.API_URI;
const cache = new InMemoryCache();

// configure Apollo Client
const client = new ApolloClient({
  cache,
  uri,
  clientState: {
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

const initialCache = new Object({
  data: {
    isLoggedIn: !!localStorage.getItem('token')
  }
});

// write the cache data on initial load
cache.writeData(initialCache);
// write the cache data after the stored cache is reset
client.onResetStore(() => cache.writeData(initialCache));

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
