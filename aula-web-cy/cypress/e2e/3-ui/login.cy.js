/// <reference types="cypress" />
import usuarios from "../../fixtures/usuarios.json"

describe('Funcionalidade: Login', () => {
    it('Deve fazer login com sucesso customizado', () => {

        cy.login('sheldon@sheldon.com', 'sheldon')        
        cy.get('.large').should('contain', 'Dashboard')
        cy.contains('Bem-vindo').should('exist')
    });

    it('Deve fazer login com sucesso - fixture', () => {

        //cy.login('sheldon@sheldon.com', 'sheldon')        
        cy.fixture('usuario').then((user) => {
            cy.login(user.email, user.senha) 
        })
        cy.get('.large').should('contain', 'Dashboard')
        cy.contains('Bem-vindo').should('exist')
    });

    it('Deve fazer login com sucesso - importação de arquivo', () => {

        //cy.login('sheldon@sheldon.com', 'sheldon')        
        cy.login(usuarios[1].email, usuarios[1].senha) 
        cy.get('.large').should('contain', 'Dashboard')
        cy.contains('Bem-vindo').should('exist')
    });

    it.only('Deve faser login com sucesso - Usando App Actions', () => {
        
        cy.loginApi(usuarios[1].email, usuarios[1].senha)
        cy.visit('/dashboard')
        
    });


});