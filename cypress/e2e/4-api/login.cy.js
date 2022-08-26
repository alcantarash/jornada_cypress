/// <reference types="cypress" />

describe('Funcionalidade Login via API',  () => {

    it('Deve fazer login com sucesso', () => {
       cy.request({
            method: 'POST',
            url: '/api/auth',
            body: {
                "email": "sheldon@sheldon.com",
                "password": "sheldon"
            }
       }).should((response) => {
            cy.log(response.status)
            expect(response.status).to.be.equal(200)
            expect(response.body).to.have.property("jwt")
       })
    });

});