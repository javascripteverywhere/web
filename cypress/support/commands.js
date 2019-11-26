import '@testing-library/cypress/add-commands';
import { request, GraphQLClient } from 'graphql-request';
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

Cypress.Commands.add('loginUser', overrides => {
  // graphql mutation
  const SIGNIN_USER = `
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
  `;

  // create a new user
  cy.createUser().then(({ user }) => {
    // perform a GQL mutation to sign in a
    return request('http://localhost:4000/api', SIGNIN_USER, {
      email: user.email,
      password: user.password
    }).then(data => {
      window.localStorage.setItem('token', data.signIn);
      return { data, user };
    });
  });
});

Cypress.Commands.add('createNote', overrides => {
  // graphql mutation
  // our new note query
  const NEW_NOTE = `
    mutation newNote($content: String!) {
      newNote(content: $content) {
        id
        content
        createdAt
        favoriteCount
        favoritedBy {
          id
          username
        }
        author {
          username
          id
        }
      }
    }
  `;

  // create a new user
  cy.createUser().then(({ data, user }) => {
    // store the token
    window.localStorage.setItem('token', data.signIn);

    // create a new GraphQL client with the token as a header
    const client = new GraphQLClient('my-endpoint', {
      headers: {
        Authorization: data.signIn
      }
    });
    // perform a GQL mutation to sign in a
    return client
      .request('http://localhost:4000/api', NEW_NOTE, {
        content: 'Test note'
      })
      .then(data => {
        return data;
      });
  });
});
