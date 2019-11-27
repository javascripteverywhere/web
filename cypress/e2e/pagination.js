describe('pagination', () => {
  it('clicks the Load more button to load additional notes', () => {
    cy.visit('/');
    cy.get('main button')
      .click() // click the "Load more" button
      .wait(500)
      .get('.note-feed article') // select all of the articles
      .its('length')
      .should('be.greaterThan', 11); // there should be more than 10 notes on the page
  });
});
