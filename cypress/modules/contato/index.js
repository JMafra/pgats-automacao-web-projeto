class Contato{

    preencherFormularioDeContato(nome, email, assunto, mensagem){
         
        cy.get('input[data-qa="name"]').type(nome)
        cy.get('input[data-qa="email"]').type(email)
        cy.get('input[data-qa="subject"]').type(assunto)
        cy.get('textarea[data-qa="message"]').type(mensagem)

        cy.fixture('example.json').as('arquivo')
        cy.get('input[name="upload_file"]').selectFile('@arquivo')

        cy.get('input[data-qa="submit-button"]').click()

    }
}

export default new Contato();