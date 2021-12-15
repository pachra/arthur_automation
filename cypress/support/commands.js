/// <reference types="cypress" />

import 'cypress-wait-until';

Cypress.Commands.add('login', (username = Cypress.env('username'), password = Cypress.env('password')) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('BaseUrl'),
        form: true,
        body: {
            'data[User][email]': username,
            'data[User][password]': password,
        },
    })
})

Cypress.Commands.add('verifyDataShouldBeVisible', (element, expectedValue) => {
    cy.contains(element, expectedValue).should('be.visible')
})

Cypress.Commands.add('inputData', (element, value) => {
    cy.get(element).type(value)
})