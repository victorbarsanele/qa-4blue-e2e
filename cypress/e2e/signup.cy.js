/// <reference types="cypress" />

import locators from '../support/locators';
import signupPage from '../pages/signupPage';
import { generateUserData } from '../utils.js/helper';

describe('Signup', () => {
    let user;

    beforeEach(function () {
        signupPage.visit();
        cy.fixture('user').then((data) => {
            user = data;
        });
    });

    it('should allow a user to sign up with expected credentials', function () {
        // Deveria permitir que um usuário se cadastre com credenciais esperadas
        const newUser = generateUserData(user);

        signupPage.fillFullForm(newUser);
        signupPage.submit();

        cy.url().should('include', '/sucesso');
        cy.contains('Conta criada com sucesso').should('be.visible');
    });

    it('should show an error message when trying to sign up with an already registered email', function () {
        // Deveria exibir uma mensagem de erro ao tentar se cadastrar com um e-mail já registrado
        const newUser = generateUserData(user);
        cy.createUser(newUser); // Cria um usuário para garantir que o e-mail já esteja registrado

        cy.createUser(newUser); // Tenta criar o mesmo usuário novamente para disparar o erro

        cy.contains('E-mail já cadastrado').should('be.visible');
        cy.url().should('include', '/criar-conta');
    });

    it('should show validation errors when trying to sign up with empty data', function () {
        // Deveria exibir mensagens de validação ao tentar se cadastrar com dados em branco
        signupPage.submit();
        cy.contains('O campo nome é obrigatório').should('be.visible');
        cy.contains('O campo telefone é obrigatório').should('be.visible');
        cy.contains('O campo e-mail é obrigatório').should('be.visible');
        cy.contains('O campo senha é obrigatório').should('be.visible');
        cy.contains('O campo confirmar senha é obrigatório').should(
            'be.visible',
        );
    });

    it('should show an error message when password and confirm password do not match', function () {
        // Deveria exibir uma mensagem de erro quando a senha e a confirmação de senha não coincidem
        signupPage.fillName(user.name);
        signupPage.fillTel(user.tel);
        signupPage.fillEmail(user.email);
        signupPage.fillPasswords(user.password, 'SenhaDiferente123!');
        signupPage.submit();
        cy.contains('As senhas não coincidem').should('be.visible');
    });

    it('should edge test the name field with numbers and special characters', function () {
        // Deveria testar o campo de nome com números e caracteres especiais (teste de borda)
        signupPage.fillName('Nome123!@#');
        signupPage.fillTel(user.tel);
        signupPage.fillEmail(user.email);
        signupPage.fillPasswords(user.password, user.password);
        signupPage.submit();
        cy.contains('Formato de nome inválido').should('be.visible');
    });

    it('should edge test the telephone field with letters', function () {
        // Deveria testar o campo de telefone com letras (teste de borda)
        signupPage.fillName(user.name);
        signupPage.fillTel('TelefoneInvalido');
        signupPage.fillEmail(user.email);
        signupPage.fillPasswords(user.password, user.password);
        signupPage.submit();
        cy.contains('Formato de telefone inválido').should('be.visible');
    });

    it('should show an error message when trying to sign up with an invalid email format', function () {
        // Deveria exibir uma mensagem de erro ao tentar se cadastrar com um formato de e-mail inválido
        signupPage.fillName(user.name);
        signupPage.fillTel(user.tel);
        signupPage.fillEmail('email-invalido');
        signupPage.fillPasswords(user.password, user.password);
        signupPage.submit();
        cy.contains('Formato de e-mail inválido').should('be.visible');
    });

    it('should boundary test the name and email fields with maximum character limits', function () {
        // Deveria testar os campos de nome e e-mail com os limites máximos de caracteres (teste de limite)
        const longName = 'Nome'.repeat(50); // 200 caracteres
        const longEmail = `email${'a'.repeat(245)}@gmail.com`; // 255 caracteres
        signupPage.fillName(longName);
        signupPage.fillTel(user.tel);
        signupPage.fillEmail(longEmail);
        signupPage.fillPasswords(user.password, user.password);
        signupPage.submit();
        cy.contains('Formato de nome ou e-mail inválido').should('be.visible');
    });

    it('should show an error message when trying to sign up with a password that is too short', function () {
        // Deveria exibir uma mensagem de erro ao tentar se cadastrar com uma senha muito curta
        signupPage.fillName(user.name);
        signupPage.fillTel(user.tel);
        signupPage.fillEmail(user.email);
        signupPage.fillPasswords('123', '123');
        signupPage.submit();
        cy.contains('A senha deve ter pelo menos 8 caracteres').should(
            'be.visible',
        );
    });

    it('should show an error message when trying to sign up with a password without special characters', function () {
        // Deveria exibir uma mensagem de erro ao tentar se cadastrar com uma senha sem caracteres especiais
        signupPage.fillName(user.name);
        signupPage.fillTel(user.tel);
        signupPage.fillEmail(user.email);
        signupPage.fillPasswords('password123', 'password123');
        signupPage.submit();
        cy.contains(
            'A senha deve conter pelo menos um caractere especial',
        ).should('be.visible');
    });

    // UI Tests

    it('should display the signup form with all required fields', function () {
        // Deveria exibir o formulário de cadastro com todos os campos obrigatórios
        cy.get(locators.nameInput).should('be.visible');
        cy.get(locators.telInput).should('be.visible');
        cy.get(locators.emailInput).should('be.visible');
        cy.contains('Senha').should('be.visible');
        cy.contains('Confirmar senha').should('be.visible');
        cy.contains('button', 'Criar conta').should('be.visible');
    });

    it('should verify the width of all the input fields', function () {
        // Deveria verificar a largura de todos os campos de entrada
        // Assumindo que a largura esperada é de 200px, para que caiba no layout (exceto para o campo EMAIL)
        cy.get(locators.nameInput).should('have.css', 'width', '200px');
        cy.get(locators.telInput).should('have.css', 'width', '200px');
        // O campo de email tem uma largura diferente, então verificamos separadamente
        cy.get(locators.emailInput).should('have.css', 'width', '400px');
        cy.contains('Senha')
            .parent()
            .find('input')
            .should('have.css', 'width', '200px');
        cy.contains('Confirmar senha')
            .parent()
            .find('input')
            .should('have.css', 'width', '200px');
    });

    it('should show password strength requirements', function () {
        // Deveria mostrar os requisitos de força da senha
        cy.contains(
            'A senha precisa ter no mínimo 8 caracteres e 1 caractere especial.',
        ).should('be.visible');
    });

    it('should show login link and navigate to login page when clicked', function () {
        // Deveria mostrar o link de login e navegar para a página de login quando clicado
        cy.contains('Já tem uma conta?').should('be.visible');
        cy.contains('Voltar para login').should('be.visible');
        cy.contains('Voltar para login').should('have.attr', 'href', '/');
        cy.contains('Voltar para login').click();
        cy.url().should('include', 'qa-play-sim.lovable.app');
    });

    it('should navigate to the login page after sucessfully creating an account', function () {
        // Deveria navegar para a página de login após criar uma conta com sucesso
        // Primeiro, criamos um usuário para garantir que o e-mail já esteja registrado
        cy.createUser(user);
        // Depois, na tela seguinte, clicamos no link para voltar para o login
        cy.contains('Sair da conta').click();
        // Verificamos se estamos de volta à página de login
        cy.url().should('include', 'qa-play-sim.lovable.app');
        cy.url().should('not.include', '/sucesso');
        cy.contains('Entrar').should('be.visible');
        cy.contains('Criar conta').should('be.visible');
    });
});
