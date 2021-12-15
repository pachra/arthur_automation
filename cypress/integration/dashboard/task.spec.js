/// <reference types="cypress" />

describe('Add a task related to above property', () => {
    beforeEach(() => {
        cy.login()
    })

    it('I click on Tasks dropdownn from the left-hand panel', () => {
        cy.visit(Cypress.env('dashboard'))
        cy.get('li.alias-tasks.dropdown[data-menu-alias="tasks"]').click()
        cy.contains('span', 'Tasks').parent().click()
        cy.url().should('eq', Cypress.env('task'))
    })

    it('I click on Add Task button', () => {
        cy.get('.detail > .actions > :nth-child(1) > :nth-child(1) > .btn').click()
    })

    it(' I relate this task to the property I created', () => {
        cy.get('#s2id_TaskRelatedLookupId').click()
        cy.focused().then(($el) => {
            cy.get($el[0]).type('TestB')
            cy.waitUntil(() => cy.get('li.select2-results-dept-0').should('be.visible'))
            cy.get($el[0]).type('{enter}')
        })
    })

    it('I enter all the required fields', () => {
        cy.inputData('#TaskDescription', '1 test')
        cy.inputData('.hasDatepicker', '12/12/2021')
        cy.inputData('#TaskTimeDue', '21.00')
        cy.get('#s2id_TaskAssigneePersonId').click()
        cy.focused().then(($el) => {
            cy.get($el[0]).type('Cypress{enter}')
        })
        cy.get('select[data-populate-combine="TaskType.id,TaskType.name"]').select('Inventory')
        cy.get('#EventActionTask2094618').check()
    })

    it('I click on Save Task button', () => {
        cy.contains('input[type="submit"]', 'Save Task').click()
    })

    it('I am redirected to the task view page of the newly created task', () => {
        cy.verifyDataShouldBeVisible('h3', 'Task Description')
        cy.verifyDataShouldBeVisible('h3', 'Task Details')
    })

    it('I validate that a task record related to the property (from scenario 2) has been successfully created', () => {
        cy.verifyDataShouldBeVisible('div.identifier .sub-title', 'TestB, 345, Bangkok, Silom, 10150')
        cy.verifyDataShouldBeVisible('.summary-data-container span', 'Multiple Units')
        cy.verifyDataShouldBeVisible('.summary-data-container a[data-popup-model-alias="Entity"]', 'Owner 1 - Sansiri')
        cy.verifyDataShouldBeVisible('.summary-data-container span', '2')
        cy.verifyDataShouldBeVisible('.summary-data-container a[data-popup-model-alias="Person"]', 'Cypress Tester 1')
    })

    it('I click on Task dropdown from the left-hand panel', () => {
        cy.get('li.alias-tasks.dropdown[data-menu-alias="tasks"]').click()
        cy.contains('span', 'Tasks').parent().click()
        cy.url().should('eq', Cypress.env('task'))
    })

    it('I validate that the task I have just created is visible on the task index page', () => {
        cy.verifyDataShouldBeVisible('div.table-container table.tasks tbody tr:nth-child(1) .name .description-details', '1 test')
        cy.verifyDataShouldBeVisible('div.table-container table.tasks tbody tr:nth-child(1)  .name div.unimportant.size12 a', 'TestB, 345, Bangkok, Silom, 10150')
        cy.verifyDataShouldBeVisible('div.table-container table.tasks tbody tr:nth-child(1)  .created span a div', 'Cypress Tester 1')
    })

    it('I validate that a task I have just created is visible on Dashboard Notifications section', () => {
        cy.get('a[title="Dashboard"]').click()
        cy.url().should('eq', Cypress.env('dashboard'))
        cy.waitUntil(() => cy.get('div.page.notifications.notifications.index').should('be.visible'))
        cy.get('div.page.notifications.notifications.index > div:nth-child(2) a:nth-child(1)').click()

        cy.verifyDataShouldBeVisible('div.identifier .sub-title', 'TestB, 345, Bangkok, Silom, 10150')
        cy.verifyDataShouldBeVisible('.summary-data-container span', 'Multiple Units').should('be.visible')
        cy.verifyDataShouldBeVisible('.summary-data-container a[data-popup-model-alias="Entity"]', 'Owner 1 - Sansiri')
        cy.verifyDataShouldBeVisible('.summary-data-container span', '2')
        cy.verifyDataShouldBeVisible('.summary-data-container a[data-popup-model-alias="Person"]', 'Cypress Tester 1')
    })
})
