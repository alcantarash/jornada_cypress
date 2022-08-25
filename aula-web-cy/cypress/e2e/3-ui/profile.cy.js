/// <reference types="cypress" />
import mockProfile from "../../fixtures/profile.json";


describe('Fuuncionalidade: Visualizar Perfil', () => {
    beforeEach(() => {
        cy.visit('perfis')
    });

    it.only('Deve validar o primeiro item da lista ', () => {
        cy.intercept({
            method:'GET',
            url: '/api/profile'
        },{
            statusCode: 200,
            body: mockProfile
        })

        //cy.get('[data-test="profile-name"]').first().should('have.text', 'Pedro Guerra')
    });

    it('Deve validar o último item da lista ', () => {
        cy.get('[data-test="profile-name"]').last().should('have.text', 'Roberto dos Santos Filho')        
    });

    it('Deve validar o quarto item da lista ', () => {
        cy.get('[data-test="profile-name"]').eq(3).should('have.text', 'Wedney Santos Silva')        
    });
});