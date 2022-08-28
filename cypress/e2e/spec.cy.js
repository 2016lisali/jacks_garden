describe('Logging In - Basic Auth', function () {
  // we can use these values to log in
  const username = 'test@gmail.com'
  const password = 'Test1234&'
  const BASE_URL = 'https://jacks-garden-server.herokuapp.com/api'

  context('cy.request', () => {
    it('without authorization gets 400', () => {
      cy.request({
        url: `${BASE_URL}/users/login`,
        failOnStatusCode: false,
        method: 'POST',
      }).then((response) => {
        expect(response.status, 'status').to.equal(400)
      })
    })

    it('loin with test account', () => {
      cy.request({
        url: `${BASE_URL}/users/login`,
        method: 'POST',
        body: {
          'email': username,
          'password': password
        },
      }).then((response) => {
        expect(response.status, 'status').to.equal(200)
        expect(response.body.isAdmin).to.deep.equal(0)
      })
    })
  })

  // confirm that all static resources have loaded
  // cy.get('#app-message').should('not.be.empty')
  // cy.log('app.js loaded')

  // cy.contains('h1', 'Red').should('have.css', 'color', 'rgb(255, 0, 0)')
  // cy.log('app.css loaded')
  // })
  // })
})