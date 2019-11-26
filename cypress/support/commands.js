import '@testing-library/cypress/add-commands';
import { request } from 'graphql-request';
import { userBuilder } from './generate';

// createUser command
Cypress.Commands.add('createUser', overrides => {
  // graphql mutation
  const SIGNUP_USER = `
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
  `;

  // create a new user and logout
  const user = userBuilder();

  // perform a GQL mutation to create a new user
  return request('http://localhost:4000/api', SIGNUP_USER, {
    email: user.email,
    username: user.username,
    password: user.password
  }).then(data => {
    return { data, user };
  });
});
