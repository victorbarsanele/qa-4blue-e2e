/// <reference types="cypress" />

import locators from '../support/locators';
import loginPage from '../pages/loginPage';
import { generateUserData } from '../utils.js/helper';

describe('Login', () => {
    let user;

    beforeEach(function () {
        loginPage.visit();
        cy.fixture('user').then((data) => {
            user = data;
        });
    });

    it('should allow a user to log in with valid credentials', function () {
        // Deveria permitir que um usuário faça login com credenciais válidas
        const newUser = generateUserData(user);
        cy.wrap(newUser).as('newUser');
        cy.createUser(newUser); // Cria um usuário para garantir que as credenciais sejam válidas

        // Reutiliza exatamente os mesmos dados usados no cadastro
        cy.get('@newUser').then((createdUser) => {
            loginPage.visit();
            loginPage.fillLoginForm(createdUser.email, createdUser.password);
            loginPage.submit();
        });

        cy.url().should('include', '/sucesso');
        cy.contains('Login realizado com sucesso').should('be.visible');
    });

    it('should show an error message when trying to log in with invalid credentials', function () {
        // Deveria exibir uma mensagem de erro ao tentar fazer login com credenciais inválidas
        loginPage.fillLoginForm('email@invalido.com', 'SenhaInvalida');
        loginPage.submit();
        // Verifica se o alerta é exibido com a mensagem correta
        cy.get('@alert').should(
            'have.been.calledWith',
            'Conta não encontrada. Crie uma conta primeiro.',
        );

        cy.url().should('not.include', '/sucesso');
    });

    it('should show validation errors when trying to log in with empty fields', function () {
        // Deveria exibir mensagens de validação ao tentar fazer login com campos vazios
        cy.contains('button', 'Entrar').click();
        cy.contains('O campo e-mail é obrigatório').should('be.visible');
        cy.contains('O campo senha é obrigatório').should('be.visible');
        cy.url().should('not.include', '/sucesso');
    });

    it('should show an error message when trying to log in with an unregistered email', function () {
        // Deveria exibir uma mensagem de erro ao tentar fazer login com um e-mail não registrado
        loginPage.fillLoginForm('email@nao-registrado.com', 'SenhaQualquer');
        loginPage.submit();

        cy.get('@alert').should(
            'have.been.calledWith',
            'Conta não encontrada. Crie uma conta primeiro.',
        );
        cy.url().should('not.include', '/sucesso');
    });

    it('should show an error message when trying to log in with a password that is too short', function () {
        // Deveria exibir uma mensagem de erro ao tentar fazer login com uma senha muito curta
        loginPage.fillLoginForm(user.email, 'short');
        loginPage.submit();

        cy.get('@alert').should(
            'have.been.calledWith',
            'A senha deve conter pelo menos 8 caracteres.',
        );
        cy.url().should('not.include', '/sucesso');
    });

    it('should show an error message when trying to log in with a password without special characters', function () {
        // Deveria exibir uma mensagem de erro ao tentar fazer login com uma senha sem caracteres especiais
        loginPage.fillLoginForm(user.email, 'Password123');
        loginPage.submit();

        cy.get('@alert').should(
            'have.been.calledWith',
            'A senha deve conter pelo menos um caractere especial.',
        );
        cy.url().should('not.include', '/sucesso');
    });

    // UI Tests

    it('should navigate to the signup page when clicking on the "Criar conta" link', function () {
        // Deveria navegar para a página de cadastro ao clicar no link "Criar conta"

        cy.contains('a', 'Criar conta').click();
        cy.url().should('include', '/criar-conta');
    });

    it('should display the login form with all required fields', function () {
        // Deveria exibir o formulário de login com todos os campos obrigatórios

        cy.get(locators.emailInput).should('be.visible');
        cy.contains('Senha').should('be.visible');
        cy.contains('button', 'Entrar').should('be.visible');
        cy.contains('a', 'Criar conta').should('be.visible');
        cy.contains('a', 'Esqueci minha senha').should('be.visible');
    });

    it('should verify the width of all the input fields', function () {
        // Deveria verificar a largura de todos os campos de entrada
        // Assumindo que a largura esperada seja não mais de 500px, para que caiba no layout
        cy.get(locators.emailInput)
            .should('have.css', 'width')
            .and((width) => {
                const widthValue = parseFloat(width);
                expect(widthValue).to.be.lessThan(500);
            });
        cy.contains('Senha')
            .parent()
            .find('input')
            .should('have.css', 'width')
            .and((width) => {
                const widthValue = parseFloat(width);
                expect(widthValue).to.be.lessThan(500);
            });
    });
    it('should show password strength requirements', function () {
        // Deveria mostrar os requisitos de força da senha
        cy.contains(
            'A senha precisa ter no mínimo 8 caracteres e 1 caractere especial.',
        ).should('be.visible');
    });

    it('should logout when clicking in "Sair da conta"', function () {
        // Deveria sair da conta ao clicar em "Sair da conta"
        // Primeiro, criamos um usuário e fazemos login para garantir que estamos logados
        const newUser = generateUserData(user);
        cy.wrap(newUser).as('newUser');
        cy.createUser(newUser);

        // Depois, tentamos fazer login com as mesmas credenciais
        cy.get('@newUser').then((createdUser) => {
            loginPage.visit();
            loginPage.fillLoginForm(createdUser.email, createdUser.password);
            loginPage.submit();
        });

        cy.url().should('include', '/sucesso');
        cy.contains('Login realizado com sucesso').should('be.visible');
        // Na tela seguinte, clicamos no link para sair da conta
        cy.contains('Sair da conta').click();
        cy.url().should('not.include', '/sucesso');
    });
});
