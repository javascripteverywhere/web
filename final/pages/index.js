// import React and our routing dependencies
import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// import our shared layout component
import Layout from '../components/Layout';

// import our routes
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Note from './note';
import SignUp from './signup';
import SignIn from './signin';
import NewNote from './new';
import EditNote from './edit';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

// define our routes
const Pages = props => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/mynotes" component={MyNotes} />
        <PrivateRoute path="/favorites" component={Favorites} />
        <Route path="/note/:id" component={Note} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute path="/new" component={NewNote} />
        <PrivateRoute path="/edit/:id" component={EditNote} />
      </Layout>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Query query={IS_LOGGED_IN}>
    {({ data }) => (
      <Route
        {...rest}
        render={props =>
          data.isLoggedIn === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )}
  </Query>
);

export default Pages;
