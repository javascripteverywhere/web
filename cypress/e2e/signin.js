describe('user sign in flow', () => {
  it('should allow a user to sign in and out', () => {
    cy.createUser().then(({ user }) => {
      // test the signin functionality
      cy.visit('/')
        .queryByText('Sign In')
        .click()
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
        .should('exist')
        .queryByText('Logout')
        .click()
        .window()
        .its('localStorage.token')
        .should('not.exist');
    });
  });
});
