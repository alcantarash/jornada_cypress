/// <reference types="cypress" />

describe('Funcionalidade Perfil via API',  () => {

    const dayjs = require('dayjs')
    let dataAtual = dayjs().format('DD-MM-YYYY HH:mm');
    let token
    let idPostagem;
    

    beforeEach(() => {
        cy.gerarToken('sheldon@sheldon.com', 'sheldon').then((tkn) => {
            token = tkn
        })
        cy.criarPostagem(dataAtual, token).then((postagemId) =>{
            idPostagem = postagemId
        })
    });

    it('Deve Consultar uma postagem', () => {
        cy.request({
            method: 'GET',
            url: '/api/posts/' + idPostagem,
            header: {
                Cookie: token
            }
        }).should((response) => {

            expect(response.status).to.be.equal(200)
            expect(response.body.name).to.equal("Shedon AmbevTech")
            expect(response.body.text).contains(dataAtual)
        })
    });

    it('Deve deletar o post criado', () => {
        cy.request({
            method: 'DELETE',
            url: '/api/posts/' + idPostagem,
            header: {
                Cookie: token
            }
       }).then((response) => {
            expect(response.status).to.be.equal(200)
            expect(response.body.msg).to.be.equal("Post removido")

            cy.request({
                method: 'GET',
                url: '/api/posts/' + idPostagem,
                failOnStatusCode: false,
                header: {
                    Cookie: token
                }
            }).should((response2) => {

                expect(response2.status).to.be.equal(404)
                expect(response2.body.errors[0].msg).to.equal("Post não encontrado")
            })
       })
    });


});