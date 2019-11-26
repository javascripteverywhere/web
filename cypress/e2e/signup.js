import { userBuilder } from '../support/generate';

describe('user registration', () => {
  it('should register a new user', () => {
    const user = userBuilder();
    cy.visit('/')
      .queryByText('Sign Up')
      .click()
      .queryByLabelText('Username:')
      .type(user.username)
      .queryByLabelText('Email:')
      .type(user.email)
      .queryByLabelText('Password:')
      .type(user.password)
      .queryByText('Submit')
      .click()
      .url()
      .should('eq', `${Cypress.config().baseUrl}/`)
      .window()
      .its('localStorage.token')
      .should('be.a', 'string');
  });
});
