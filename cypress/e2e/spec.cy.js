describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://jacksgarden.netlify.app/')
    cy.contains('login').click();
  })
})