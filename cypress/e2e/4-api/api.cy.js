describe('Teste de API',  () => {
    
    var dojo = {
        aula: "API",
        duracao: 3,
        professor: "Fábio"
    }

    var usuarios = [
        {
            "email": "sheldon@sheldon.com",
            "senha": "sheldon"
        },
        {
            "email": "SheldonSaraiva_Martins31@bol.com.br",
            "senha": "sheldon"
        },
        {
            "email": "sheldon2@sheldon.com",
            "senha": "sheldon",
            "perfil": "Cooper"
        }
    ]

    it('Teste Dojo', () => {
        expect(dojo.aula).to.equal("API")
    });

    it('Teste Usuarios', () => {
        expect(usuarios[0].email).contains("com")
        expect(usuarios[1].senha).to.equal("sheldon")
        cy.log(usuarios[2].perfil)
    });

});