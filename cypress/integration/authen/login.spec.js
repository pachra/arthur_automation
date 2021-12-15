/// <reference types="cypress" />

describe('Login to system', () => {
    it("I procees to the AUT's login page", () => {
        cy.visit(Cypress.env('BaseUrl'))
    })

    it('I enter username and password', () => {
        cy.inputData('input[name="data[User][email]"]', Cypress.env('username'))
        cy.inputData('input[name="data[User][password]"]', Cypress.env('password'))
    })

    it('I click on the login button', () => {
        cy.get('input[type=submit]').click()
    })

    it('I will be able to login to the AUT', () => {
        cy.url().should('eq', Cypress.env('dashboard'))
    })
})
