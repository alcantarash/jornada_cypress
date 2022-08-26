/// <reference types="cypress" />

const faker = require('faker-br');

describe('', () => {

    it.only('Cadastro e Criar Perfil', () => {
        
        let nome = 'Sheldon ' + faker.name.lastName()
        let email = faker.internet.email(nome)

        let nomeEmpresa = faker.company.companyName()
        let cidade = faker.address.city()
        let estadoSigla = faker.address.stateAbbr()
        let siteEmpresa = faker.internet.url()
        let randomSkills = faker.lorem.words()
        let biografia = faker.lorem.paragraph()

        let posicao = faker.name.jobTitle()
        let localizacaoCompany = faker.address.streetAddress() +", "+ faker.address.city() +", "+ faker.address.stateAbbr()
        let companyNameExp = faker.company.companyName()
        let descExperience = faker.name.jobDescriptor()

        let schoolName = faker.lorem.word() +' '+ faker.lorem.word()
        let schoolDegree = faker.random.hexaDecimal()
        let schoolCourse = faker.name.jobArea()
        let descCourse = faker.name.jobDescriptor()


        cy.cadastro(nome, email, 'sheldon', 'sheldon')
        cy.get('.large').should('contain', 'Dashboard')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo ' + nome)


        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.perfil(nomeEmpresa, siteEmpresa, cidade, estadoSigla, randomSkills, biografia)
        cy.get('input[value="Criar Perfil"]').click()
        cy.get('div[data-test="alert"]').should('contain', 'Perfil Criado')

        cy.addExperiencia(posicao, localizacaoCompany, companyNameExp, descExperience)

        cy.addFormacaoAcademica(schoolName, schoolDegree, schoolCourse, descCourse)

        cy.get('[data-test="navbar-logout"]').click()
    });
    
});