import locators from '../support/locators';

class SignupPage {
    visit() {
        cy.visit('/criar-conta');
    }
    fillFullForm(user) {
        cy.get(locators.nameInput).type(user.name);
        cy.get(locators.telInput).type(user.tel);
        cy.get(locators.emailInput).type(user.email);
        cy.fillByLabel('Senha', user.password);
        cy.fillByLabel('Confirmar senha', user.password);
    }

    fillName(name) {
        cy.get(locators.nameInput).clear().type(name);
    }

    fillTel(tel) {
        cy.get(locators.telInput).clear().type(tel);
    }

    fillEmail(email) {
        cy.get(locators.emailInput).clear().type(email);
    }

    fillPasswords(password, confirmation) {
        cy.fillByLabel('Senha', password);
        cy.fillByLabel('Confirmar senha', confirmation);
    }

    submit() {
        cy.contains('button', 'Criar conta').click();
    }
}

export default new SignupPage();
