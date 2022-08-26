/// <reference types="cypress" />

describe('Funcionalidade Perfil via API',  () => {

    let token
    before(() => {
        cy.gerarToken('sheldon@sheldon.com', 'sheldon').then((tkn) => {
            token = tkn
        })
    });

    it('Deve consultar o perfil do usuário', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: {
                "email": "sheldon@sheldon.com",
                "password": "sheldon"
            }
       }).then((response) => {
            let token1 = response.body.jwt

            cy.request({
                method: 'GET',
                url: '/api/profile/me',
                header: {
                    Cookie: token1
                }
           }).should((response) => {
            expect(response.status).to.be.equal(200)
            expect(response.body.company).to.equal("Braga, Nogueira and Braga")
            })
       })
    });

    it('Deve consultar o perfil do usuário => Usando token dinâmico', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: {
                "email": "sheldon@sheldon.com",
                "password": "sheldon"
            }
       }).then((response) => {
            //let token = response.body.jwt

            cy.request({
                method: 'GET',
                url: '/api/profile/me',
                header: {
                    Cookie: token
                }
           }).should((response) => {
            expect(response.status).to.be.equal(200)
            expect(response.body.company).to.equal("Braga, Nogueira and Braga")
            })
       })
    });

});