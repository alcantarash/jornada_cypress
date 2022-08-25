// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('cadastro', (nome, email, senha, senha_confirmacao) => {
    
    cy.visit('/cadastrar')
    cy.get('[data-test="register-name"]').type(nome)
    cy.get('[data-test="register-email"]').type(email)
    cy.get('[data-test="register-password"]').type(senha)
    cy.get('[data-test="register-password2"]').type(senha_confirmacao)
    cy.get('[data-test="register-submit"]').click()

 })

 Cypress.Commands.add('login', (email, senha) => {
    
    cy.visit('/login')
    cy.get('[data-test="login-email"]').type(email)
    cy.get('[data-test="login-password"]').type(senha)
    cy.get('[data-test="login-submit"]').click()

 })

 Cypress.Commands.add('perfil', (nomeEmpresa, siteEmpresa, cidade, estadoSigla, randomSkills, bio) => {
   
   cy.get('#mui-component-select-status').click()
   cy.get('[data-test="status-' +Math.floor(Math.random() * 11)+ '"]').click()
   cy.get('input[name="company"]').clear().type(nomeEmpresa)
   cy.get('input[name="website"]').clear().type(siteEmpresa)
   cy.get('input[name="location"]').clear().type(cidade +", "+ estadoSigla)
   cy.get('input[name="skills"]').clear().type(randomSkills)
   cy.get('textarea[name="bio"]').clear().type(bio)
})

Cypress.Commands.add('gerarToken', (email, senha) => {
   cy.request({
      method: 'POST',
      url: '/api/auth',
      body: {
          "email": email,
          "password": senha
      }
   }).then((response) => {
      return response.body.jwt
   })
})

Cypress.Commands.add('loginApi', (email, senha) => {
   cy.request({
      method: 'POST',
      url: '/api/auth',
      body: {
         "email": email,
         "password": senha
      }
   }).then((response) => {
      //return response.body.jwt
      cy.setCookie('jwt', response.body.jwt)
   })
})

Cypress.Commands.add('criarPostagem', (text, token) => {
   
   cy.request({
      method: 'POST',
      url: '/api/posts',
      header: {
          Cookie: token
      },
      body: {
          "text": "Post " + text,
      }
  }).then((response) => {
      expect(response.status).to.be.equal(201)
      expect(response.body.text).contains(text)   
      
      return response.body._id
  })
})