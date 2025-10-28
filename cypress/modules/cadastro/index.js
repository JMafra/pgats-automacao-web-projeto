import { faker } from '@faker-js/faker';

class Cadastro{
  preencherFormularioDeCadastroCompleto(){
    cy.get('input[id="id_gender2"]').check()
    cy.get('input[id="password"]').type('Mafra@2024')
    cy.get('select[id="days"]').select('10')  
    cy.get('select[id="months"]').select('May')
    cy.get('select[id="years"]').select('1990')
    cy.get('input[id="newsletter"]').check()
    cy.get('input[id="optin"]').check()

    cy.get('input[id="first_name"]').type(faker.person.firstName())
    cy.get('input[id="last_name"]').type(faker.person.lastName())
    cy.get('input[id="company"]').type(faker.company.name())
    cy.get('input[id="address1"]').type(faker.location.streetAddress())
    cy.get('input[id="address2"]').type('Apt 4B')
    cy.get('select[id="country"]').select('Canada')
    cy.get('input[id="state"]').type(faker.location.state())
    cy.get('input[id="city"]').type(faker.location.city())
    cy.get('input[id="zipcode"]').type(faker.location.zipCode())
    cy.get('input[id="mobile_number"]').type('+14161234567')
    cy.get('button[data-qa="create-account"]').click()

  }
}
export default new Cadastro()