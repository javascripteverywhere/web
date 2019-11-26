describe('an unauthenticated user', () => {
  it('can access a protected route', () => {
    cy.loginUser().then(({ user, data }) => {
      cy.visit('/favorites')
        .url()
        .should('eq', `${Cypress.config().baseUrl}/favorites`);
    });
  });
  it('can create and delete a note', () => {
    cy.loginUser().then(({ user, data }) => {
      cy.visit('/new')
        .get('main textarea')
        .type('Pizza parties are the best parties')
        .queryByText('Save')
        .click()
        .url()
        .should('include', `${Cypress.config().baseUrl}/note`)
        .wait(500)
        .window()
        .contains('Pizza');

      cy.visit('/mynotes')
        .wait(500)
        .queryByText('Delete Note')
        .click();
      // TODO: add assertion to test that note has been deleted
    });
  });
});
