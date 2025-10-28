/// <reference types="cypress" />

import { getRandomEmail } from '../support/helpers';

import {faker} from '@faker-js/faker';


describe('Automation Exercise', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com/')
  })

  it.only('TC01: Register User', () => {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
   
    cy.get('a[href="/login"]').click()
    cy.get('input[data-qa="signup-name"]').type(`${firstName} ${lastName}`)
    cy.get('input[data-qa="signup-email"]').type(`${getRandomEmail()}`)
    cy.get('button[data-qa="signup-button"]').click()

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

    cy.url().should('include', '/account_created')
    cy.contains('b','Account Created!')
    
  })  

  it('TC02: Login User with correct email and password ', () => {    
    cy.get('a[href="/login"]').click()
    cy.get('input[data-qa="login-email"]').type('mafra-1761507151471@gmail.com')
    cy.get('input[data-qa="login-password"]').type('Mafra@2024')
    cy.get('button[data-qa="login-button"]').click() 

    cy.contains('Logged in as Juliana Mafra').should('be.visible')    
    cy.contains('a', 'Logout').should('be.visible')
    
  });

  it('TC03: Login User with incorrect email and password', () => {   
    cy.get('a[href="/login"]').click()
    cy.get('input[data-qa="login-email"]').type('mafra-00000@gmail.com')
    cy.get('input[data-qa="login-password"]').type('Mafra@2024')
    cy.get('button[data-qa="login-button"]').click() 

    cy.contains('p', 'Your email or password is incorrect!').should('be.visible')
    cy.contains('a', 'Signup / Login').should('be.visible')
  });

   it('TC04: Logout User', () => {  
    cy.get('a[href="/login"]').click()
    cy.get('input[data-qa="login-email"]').type('mafra-1761507151471@gmail.com')
    cy.get('input[data-qa="login-password"]').type('Mafra@2024')
    cy.get('button[data-qa="login-button"]').click() 

    cy.contains('a', 'Logged in as').should('be.visible')
    cy.contains('a', 'Logout').should('be.visible')

    cy.get('a[href="/logout"]').click()
    cy.url().should('include', '/login')  
    cy.contains('a', 'Signup / Login').should('be.visible')
    
  });

  it('TC05: Register User with existing email', () => {    
    cy.get('a[href="/login"]').click()   
    cy.get('input[data-qa="signup-name"]').type('Juliana Mafra')
    cy.get('input[data-qa="signup-email"]').type('mafra-1761507151471@gmail.com')
    cy.get('button[data-qa="signup-button"]').click()

    cy.contains('p', 'Email Address already exist!').should('be.visible')   
    
  });

   it('TC06: Contact Us Form', () => {   
    cy.get('a[href="/contact_us"]').click()   
    cy.get('input[data-qa="name"]').type('Juliana Mafra')
    cy.get('input[data-qa="email"]').type('mafra-1761507151471@gmail.com')
    cy.get('input[data-qa="subject"]').type('Reclamação sobre produto não entregue')
    cy.get('textarea[data-qa="message"]').type('Comprei um produto há duas semanas e ainda não recebi a entrega. Gostaria de saber o status do meu pedido e quando posso esperar a entrega.')

    cy.fixture('example.json').as('arquivo')
    cy.get('input[name="upload_file"]').selectFile('@arquivo')

    cy.get('input[data-qa="submit-button"]').click()

    cy.contains('div', 'Success! Your details have been submitted successfully.').should('be.visible')
       
  });

   it('TC08: Verify All Products and product detail page', () => {   
    cy.get('a[href="/products"]').click()   
    cy.get('a[href="/product_details/1"]').click()

    cy.contains('h2', 'Blue Top').should('be.visible')
    cy.get('div[class="product-information"]').should('be.visible') 
    cy.get('div[class="product-information"] img').should('be.visible')
    cy.contains('span', 'Rs. 500').should('be.visible')
    cy.contains('p', 'Category: Women > Tops').should('be.visible')
    cy.contains('p', 'Availability: In Stock').should('be.visible')
    cy.contains('p', 'Condition: New').should('be.visible')
    cy.contains('p', 'Brand: Polo').should('be.visible')
       
  });

  it('TC09: Search Product', () => {    
    cy.get('a[href="/products"]').click()   
    cy.get('input[id="search_product"]').type('Dress')
    cy.get('button[id="submit_search"]').click()

    cy.contains('h2', 'Searched Products').should('be.visible')
    cy.get('div[class="features_items"] .product-image-wrapper').should('have.length.greaterThan', 0) 
   
  });

   it('TC10: Verify Subscription in home page', () => {    
    cy.get('input[id="susbscribe_email"]').type('mafra-1761507151471@gmail.com')
    cy.get('button[id="subscribe"]').click()
   
    cy.contains('div', 'You have been successfully subscribed!').should('be.visible')
   
  });

   it('TC15: Place Order-Register before Checkout', () => {    
    cy.get('a[href="/login"]').click()
    cy.get('input[data-qa="login-email"]').type('mafra-1761507151471@gmail.com')
    cy.get('input[data-qa="login-password"]').type('Mafra@2024')
    cy.get('button[data-qa="login-button"]').click() 
    cy.get('a[href="/products"]').click()   
    cy.get('a[href="/product_details/1"]').click()
    cy.get('button[class="btn btn-default cart"]').click()
    cy.contains('a', 'View Cart').click()  
    cy.get('a[class="btn btn-default check_out"]').click()
    cy.get('a[class="btn btn-default check_out"]').click()
    cy.get('input[name="name_on_card"]').type('Juliana Mafra')
    cy.get('input[name="card_number"]').type('4111111111111111')
    cy.get('input[name="cvc"]').type('123')
    cy.get('input[name="expiry_month"]').type('12')
    cy.get('input[name="expiry_year"]').type('2025')
    cy.get('button[id="submit"]').click()

    cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible')    
   
  });
})  




