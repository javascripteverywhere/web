describe('an unauthenticated user', () => {
  it('is presented the option to sign in', () => {
    cy.visit('/')
      .queryByText('Sign In')
      .should('exist')
      .queryByText('Logout')
      .should('not.exist');
  });

  it('should not be able to visit a protected page', () => {
    cy.visit('/new')
      .url()
      .should('include', '/signin');
  });

  it('clicking a link should redirect', () => {
    cy.visit('/')
      .queryByText('My Notes')
      .click()
      .url()
      .should('include', '/signin');
  });
});
