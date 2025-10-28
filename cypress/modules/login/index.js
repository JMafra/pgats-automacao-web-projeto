
class Login {
   preencherFormlarioDePreCadastro(firstName, lastName, email) {       
  
        cy.get('input[data-qa="signup-name"]').type(`${firstName} ${lastName}`)
        cy.get('input[data-qa="signup-email"]').type(email)
        cy.get('button[data-qa="signup-button"]').click()
  
    }

    preencherFormularioDeLogin(user, password) {
        cy.get('input[data-qa="login-email"]').type(user)
        cy.get('input[data-qa="login-password"]').type(password)
        cy.get('button[data-qa="login-button"]').click() 
    }
}
export default new Login()



