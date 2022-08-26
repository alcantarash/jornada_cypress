/// <reference types="cypress" />

describe('Funcionalidade Cadastro via API',  () => {

    it('Deve fazer cadastro com sucesso', () => {
       
        var email = `sheldon${Math.floor(Math.random() * 100000)}@teste.com`
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": "Sheldon Random",
                "email": email,
                "password": "sheldon"
            }
       }).then((response) => {
            cy.log(response.status)
            expect(response.status).to.be.equal(201)
            expect(response.body).to.have.property("jwt")
       })
    });

});