/// <reference types="cypress" />

import { getRandomEmail } from '../support/helpers';

import {faker} from '@faker-js/faker';
import menu from '../modules/menu';
import login from '../modules/login';
import cadastro from '../modules/cadastro';
import contato from '../modules/contato';
import carrinho from '../modules/carrinho';

describe('Automation Exercise', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com/')
  })

  it('TC01: Register User', () => {   
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName(); 
    const email = getRandomEmail();

    menu.navegarParaLogin()
    login.preencherFormlarioDePreCadastro(firstName, lastName, email)
    cadastro.preencherFormularioDeCadastroCompleto()
   
    cy.url().should('include', '/account_created')
    cy.contains('b','Account Created!')
    
  })  

  it('TC02: Login User with correct email and password ', () => {   
    menu.navegarParaLogin() 
    login.preencherFormularioDeLogin('mafra-1761507151471@gmail.com','Mafra@2024')

    cy.contains('Logged in as Juliana Mafra').should('be.visible')    
    cy.contains('a', 'Logout').should('be.visible')
    
  });

  it('TC03: Login User with incorrect email and password', () => {  
    menu.navegarParaLogin() 
    login.preencherFormularioDeLogin('mafra-00000@gmail.com','Mafra@2024')
  
    cy.contains('p', 'Your email or password is incorrect!').should('be.visible')
    cy.contains('a', 'Signup / Login').should('be.visible')
  });

  it('TC04: Logout User', () => {  
    menu.navegarParaLogin()
    login.preencherFormularioDeLogin('mafra-1761507151471@gmail.com','Mafra@2024')  
 
    cy.contains('a', 'Logged in as').should('be.visible')
    cy.contains('a', 'Logout').should('be.visible')

    menu.efetuarLogout()
    cy.url().should('include', '/login')  
    cy.contains('a', 'Signup / Login').should('be.visible')
    
  });

  it('TC05: Register User with existing email', () => {  
    const firstName = 'Juliana'
    const lastName = 'Mafra'
    const email= 'mafra-1761507151471@gmail.com'

    menu.navegarParaLogin() 
    login.preencherFormlarioDePreCadastro(firstName, lastName, email)

    cy.contains('p', 'Email Address already exist!').should('be.visible')   
    
  });

  it('TC06: Contact Us Form', () => {   
    const nome = faker.person.fullName()
    const email = getRandomEmail() 
    const assunto = faker.lorem.words(3)
    const mensagem = faker.lorem.sentence()

    menu.navegarParaContato()
    contato.preencherFormularioDeContato(nome, email, assunto, mensagem)
   
    cy.contains('div', 'Success! Your details have been submitted successfully.').should('be.visible')
       
  });

  it('TC08: Verify All Products and product detail page', () => {       
    menu.navegarParaProdutos()
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
    const produto = 'Dress'
    menu.navegarParaProdutos() 
    carrinho.buscarProdutoNoCarrinho(produto)    

    cy.contains('h2', 'Searched Products').should('be.visible')
    cy.get('div[class="features_items"] .product-image-wrapper').should('have.length.greaterThan', 0) 
   
  });

  it('TC10: Verify Subscription in home page', () => {    
    cy.get('input[id="susbscribe_email"]').type('mafra-1761507151471@gmail.com')
    cy.get('button[id="subscribe"]').click()
   
    cy.contains('div', 'You have been successfully subscribed!').should('be.visible')
   
  });

  it('TC15: Place Order-Register before Checkout', () => {  
    menu.navegarParaLogin()  
    login.preencherFormularioDeLogin('mafra-1761507151471@gmail.com','Mafra@2024')
    menu.navegarParaProdutos()   
    
    carrinho.adicionarProdutoAoCarrinho() 
    carrinho.adicionarInformacoesDePagamentoEFinalizarCompra()    

    cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible')    
    
  });
})  




