import React, { useEffect } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';

import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignIn = props => {
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
          mutation={SIGNIN_USER}
          onCompleted={({ signIn }) => {
            localStorage.setItem('token', signIn);
            client
              .resetStore()
              // store logged in state
              .then(() => client.writeData({ data: { isLoggedIn: true } }))
              // redirect the user
              .then(() => props.history.push('/'));
          }}
        >
          {(signIn, { loading, error }) => {
            // if loading, return a loading indicator
            if (loading) return 'Loading...';
            // if there is an error, display a message to the user
            if (error) return `Error creating account ${error.message}`;
            // our form component
            return <UserForm action={signIn} formType="signIn" />;
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  );
};

export default SignIn;
