import locators from '../support/locators';

class LoginPage {
    visit() {
        cy.visit('/', {
            onBeforeLoad(win) {
                cy.stub(win, 'alert').as('alert');
            },
        });
    }

    fillLoginForm(email, password) {
        cy.get(locators.emailInput).type(email);
        cy.contains('Senha').parent().find('input').type(password);
    }

    submit() {
        cy.contains('button', 'Entrar').click();
    }
}

export default new LoginPage();
