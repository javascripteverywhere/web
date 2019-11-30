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
        .click()
        .get('article')
        .should('not.exist')
        .queryByText('No notes yet')
        .should('exist');
    });
  });

  it('can create and edit a note', () => {
    cy.loginUser().then(({ user, data }) => {
      cy.visit('/new')
        .get('main textarea')
        .type('Pizza parties are the best parties')
        .queryByText('Save')
        .click();

      cy.visit('/mynotes')
        .wait(500)
        .queryByText('Edit')
        .click()
        .get('main textarea')
        .type('!')
        .queryByText('Save')
        .click()
        .wait(500)
        .window()
        .queryByText('Pizza parties are the best parties!')
        .should('exist');
    });
  });

  it('can toggle note favorites', () => {
    cy.loginUser().then(({ user, data }) => {
      cy.visit('/')
        .wait(500)
        .get('[data-cy=favorite]')
        .first()
        .click();

      cy.visit('/favorites')
        .get('article')
        .should('exist')
        .get('[data-cy=favorite]')
        .first()
        .click()
        .get('article')
        .should('not.exist');
    });
  });
});
