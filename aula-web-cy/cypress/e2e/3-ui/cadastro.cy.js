/// <reference types="cypress" />
const faker = require('faker-br');

describe('Funcionalidade: Cadastro', () => {

beforeEach(() =>{
    //cy.visit('/cadastrar')
});
    it('Cadastro com Sucesso', () => {
        //Pré reuiquisito
        //Ação: preencher os campos
        //Resultado esperado: Validar se cadastrou
        //cy.visit('https://conexaoqa.herokuapp.com/cadastrar')
        let nome = 'Sheldon ' + faker.name.lastName()
        let email = faker.internet.email(nome)

        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(nome)
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('alguem')
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('alguem')
        cy.get('[data-test="register-submit"]').click()

        cy.get('.large').should('contain', 'Dashboard')
        cy.contains('Bem-vindo').should('exist')
    });

    it('Deve validar usuário já registrado', () => {
        //Pré reuiquisito
        //Ação: preencher os campos
        //Resultado esperado: Validar se cadastrou
        //cy.visit('https://conexaoqa.herokuapp.com/cadastrar')
        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type('Alguém Dali')
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type('alguem2@alguem.com')
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('alguem')
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('alguem')
        cy.get('[data-test="register-submit"]').click()

        cy.get('[data-test="alert"]').should('contain','Usuário já registrado')
        
    });
    
    it.only('Cadastro comando customizado', () => {
        
        let nome = 'Sheldon ' + faker.name.lastName()
        let email = faker.internet.email(nome)

        cy.cadastro(nome, email, 'sheldon', 'sheldon')
        cy.get('.large').should('contain', 'Dashboard')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo ' + nome)

        cy.get('[data-test="navbar-logout"]').click()

        cy.cadastro(nome, email, 'sheldon', 'sheldon')
        cy.get('[data-test="alert"]').should('contain','Usuário já registrado')
    });

}); 