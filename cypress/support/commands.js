import locators from '../support/locators';

Cypress.Commands.add('fillByLabel', (label, value) => {
    cy.contains(label).parent().find('input').type(value);
});

Cypress.Commands.add('createUser', (user) => {
    cy.visit('/criar-conta');
    cy.get(locators.nameInput).type(user.name);
    cy.get(locators.telInput).type(user.tel);
    cy.get(locators.emailInput).type(user.email);
    cy.fillByLabel('Senha', user.password);
    cy.fillByLabel('Confirmar senha', user.password);
    cy.contains('button', 'Criar conta').click();
});
