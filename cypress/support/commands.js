Cypress.Commands.add('typeKeys', (selector, value) => {
  cy.get(selector).clear().type(value, { delay: 35 });
});
