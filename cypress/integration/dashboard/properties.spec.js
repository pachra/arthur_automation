/// <reference types="cypress" />

describe('Add a property with a multiple rentable units', () => {
    beforeEach(() => {
        cy.login()

    })

    it('I click on Properties dropdown on the left-hand panel', () => {
        cy.visit(Cypress.env('dashboard'))
        cy.get('li.alias-properties.dropdown[data-menu-alias="properties"]').click()
        cy.get('span').contains('Properties').parent().click()
        cy.url().should('eq', Cypress.env('properties'))
    })

    it('I click on the Add property button', () => {
        cy.get('a i.fa-plus').parent().click()
    })

    it('I select Property with a multiple rentable units option', () => {
        cy.get('img[title=multiple-unit]').click()
    })

    it('I enter all the required fields in the input text boxes', () => {

        cy.inputData('#ProfileAddressName', 'TestB')
        cy.get('#s2id_PropertyOwnerId').click()
        cy.focused().then(($el) => {
            cy.get($el[0]).type('Owner{enter}')
        })
        cy.inputData('#ProfileAddress1', '345')
        cy.inputData('#ProfileCity', 'Bangkok')
        cy.inputData('#ProfilePostcode', '10150')
        cy.inputData('#ProfileCounty', 'Silom')
        cy.get('#ProfileCountryId').select('Thailand')
        cy.get('select[data-populate-combine="Area.id,Area.name"]').select('fag')

        cy.get('input#s2id_autogen8').click()
        cy.focused().then(($el) => {
            cy.get($el[0]).type('EPC{enter}')
        })

        cy.get('#PropertyFullAccess').and('have.value', '1')
        cy.get('#PropertyUnitCount').clear()
        cy.inputData('#PropertyUnitCount', '2')
        cy.get('input.next-page.btn.btn-default').click({ force: true })
    })

    it('I click on the “Next, Units Settings” button', () => {
        cy.get('input.next-page.btn.btn-default').click({ force: true })
    })

    it('I select all fields under Unit Settings section', () => {
        cy.get('select[data-populate-combine="UnitType.id,UnitType.name"].widthEm10').select('Flat')

        cy.get('#s2id_PrefixUnitUnitManagerManagerPersonId').click()
        cy.focused().then(($el) => {
            cy.get($el[0]).type('Cypress{enter}')
        })

        cy.get('#s2id_PrefixUnitUnitAgentEntityId').click()
        cy.focused().then(($el) => {
            cy.get($el[0]).type('Real{enter}')
        })

        cy.get('#s2id_RequiredCertificateMultiUnitUnitRequiredCertificateTypeIds').click()
        cy.focused().then(($el) => {
            cy.get($el[0]).type('EPC{enter}')
        })
        cy.get('#PrefixUnitUnitFullAccess').should('be.checked')
        cy.get('button.btn.apply-prefix').click({ force: true })

    })

    it('I click on Add Property button', () => {
        cy.get('input[type=submit]').contains('Add Property').click()
    })

    it('I have successfully added a property with a multiple units', () => {
        cy.waitUntil(() => cy.contains('h2', 'Multiple Units Added').should('be.visible'))
    })

    it('I click  on Properties dropdown from the left-hand panel', () => {
        cy.get('li.alias-properties.dropdown[data-menu-alias="properties"]').click()
        cy.contains('span', 'Properties').parent().click()
    })

    it(' I validate that the property I have just created is visible on the property index page', () => {
        cy.inputData('input[type="search"][data-model="Property"]', 'TestB')
        cy.contains('input[type="submit"]', 'Search').click()
        cy.waitUntil(() => cy.contains('.properties > tbody > tr > td.name > span a', 'TestB').should('be.visible'))

        cy.verifyDataShouldBeVisible(':nth-child(1) > .name > .table-info > a', 'TestB')
        cy.verifyDataShouldBeVisible(':nth-child(2) > td.property-type > .table-info > .property-type-container > .property-type > :nth-child(2)', 'Residential')
        cy.verifyDataShouldBeVisible(':nth-child(1) > td.property-description > .table-info > .property-description-container > .property-description > .multi', 'Multiple Units')
        cy.verifyDataShouldBeVisible(':nth-child(1) > .owner > .table-info > a', 'Owner 1 - Sansiri')
        cy.verifyDataShouldBeVisible(':nth-child(1) > .rentable-units > .table-info', '2/2')
    })
})
