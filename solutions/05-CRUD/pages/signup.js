import React, { useEffect } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = props => {
  useEffect(() => {
    // update the document title
    document.title = 'Sign Up — Notedly';
  });

  return (
    // Wrap our mutation in ApolloConsumer to give direct access to `client`
    <ApolloConsumer>
      {client => (
        // render our GraphQL Mutation
        <Mutation
          mutation={SIGNUP_USER}
          onCompleted={({ signUp }) => {
            localStorage.setItem('token', signUp);
            client
              .resetStore()
              // store logged in state
              .then(() => client.writeData({ data: { isLoggedIn: true } }))
              // redirect the user
              .then(() => props.history.push('/'));
          }}
        >
          {(signUp, { loading, error }) => {
            // if loading, return a loading indicator
            if (loading) return 'Loading...';
            // if there is an error, display a message to the user
            if (error) return `Error creating account ${error.message}`;
            // our form component
            return <UserForm action={signUp} formType="signup" />;
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  );
};

export default SignUp;
