/// <reference types="cypress" /> 

import menu from "./menu"
import cadastro from "./cadastro"
import login from "./login"
import carrinho from "./carrinho"
import produtos from "./produtos"

import { faker } from '@faker-js/faker'

describe('Automation Exercise - Test Cases 1, 2, 3, 4, 5, 6, 8, 9, 10, 15', () => {
  let emailUsuarioCadastrado
  let senhaUsuarioCadastrado
  let nomeUsuarioCadastrado

  before(()=> {
    cy.visit('/')
    menu.irParaSignupLogin()
    cadastro
      .preencherFormulario()
      .verificarSeUsuarioEstaLogado(Cypress.env('firstName'))
    emailUsuarioCadastrado = Cypress.env('email')
    senhaUsuarioCadastrado = Cypress.env('password')
    nomeUsuarioCadastrado = Cypress.env('firstName')
    menu.irParaLogout()

  })

  beforeEach(()=> {
    cy.visit('/')
    cy.contains('Features Items').should('be.visible')
  })

  it('Test Case 1: Register User', () => {
    menu.irParaSignupLogin()
    cy.contains('New User Signup!').should('be.visible')

    cadastro
      .preencherFormulario()
      .verificarSeUsuarioEstaLogado(Cypress.env('firstName'))

    cy.screenshot()
    
    menu.irParaDelete()
    cadastro.verificaSeCadastroFoiExcluido()
   
  });

  it('Test Case 2: Login User with correct email and password', () => {
    menu.irParaSignupLogin()
    cadastro
      .preencherFormulario()
      .verificarSeUsuarioEstaLogado(Cypress.env('firstName'))    
    menu.irParaLogout()

    menu.irParaSignupLogin()
    cy.contains('Login to your account').should('be.visible')  
    login.preencherLogin(Cypress.env('email'), Cypress.env('password'))

    cadastro.verificarSeUsuarioEstaLogado(Cypress.env('firstName')) 
    menu.irParaDelete()
    cadastro.verificaSeCadastroFoiExcluido()
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    menu.irParaSignupLogin()
    cy.contains('Login to your account').should('be.visible')

    login.preencherLogin(emailUsuarioCadastrado, '54321')

    cy.get(`.login-form form p`)
      .should('contain', 'Your email or password is incorrect!')
      .and('be.visible')
  });

  it('Test Case 4: Logout User', () => {
    menu.irParaSignupLogin()
    cy.contains('Login to your account').should('be.visible')

    login.preencherLogin(emailUsuarioCadastrado, senhaUsuarioCadastrado)
    cadastro.verificarSeUsuarioEstaLogado(nomeUsuarioCadastrado)

    cy.contains(' Logout').click()

    cy.contains('Login to your account').should('be.visible')
    cy.url().should('contain', 'login')
  });

  it('Test Case 5: Register User with existing email', () => {    
    menu.irParaSignupLogin()
    cy.contains('New User Signup!').should('be.visible')
    
    cadastro.iniciarCadastro(nomeUsuarioCadastrado, emailUsuarioCadastrado)

    cy.get(`.signup-form form p`)
      .should('contain', 'Email Address already exist!')
      .and('be.visible')
  });

  it('Test Case 6: Contact Us Form', () => {
    menu.irParaContactUs()
    cy.get(`.contact-form h2`)
      .should('be.visible')
      .and('have.text', 'Get In Touch')
    
    cy.get('[data-qa="name"]').type(nomeUsuarioCadastrado)
    cy.get('[data-qa="email"]').type(emailUsuarioCadastrado)
    cy.get('[data-qa="subject"]').type('Teste do menu Contact Us')
    cy.get('[data-qa="message"]').type('Está é uma mensagem para teste do menu Contact Us')
  
    cy.fixture('example.json').as('arquivo')
    cy.get('input[name="upload_file"]').selectFile('@arquivo')
    cy.get('[data-qa="submit-button"]').click()
    
    cy.get('.status')
      .should('have.text', 'Success! Your details have been submitted successfully.')
      .and('be.visible')
    cy.get('.btn.btn-success').click()      
    cy.contains('Signup').should('be.visible')
    menu.irParaHome()
    cy.contains('Features Items').should('be.visible')
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    menu.irParaProducts()
    produtos.verPrimeiroProduto()  

    cy.contains('Blue Top').should('be.visible')
    cy.contains('Category: Women').should('be.visible')
    cy.contains('Rs. 500').should('be.visible')
    cy.get('#quantity').should('be.visible')
    cy.get('p').parent().should('contain', ' In Stock')
    cy.get('p').parent().should('contain', ' New')
    cy.get('p').parent().should('contain', ' Polo')
  });

  it('Test Case 9: Search Product', () => {
    menu.irParaProducts()
    produtos.buscarProduto('tshirt')

    cy.get('.title')
      .should('be.visible')
      .and('contain', 'Searched Products')
  
    cy.get('.single-products')
    .should('be.visible')
    .and('have.length.at.least', 1)
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    cy.get('.single-widget').should('contain', 'Subscription')
    cy.get('input#susbscribe_email')
      .scrollIntoView()
      .type(emailUsuarioCadastrado)
    cy.get('button#subscribe').click()
    cy.contains('You have been successfully subscribed!').should('be.visible')
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    menu.irParaSignupLogin()
    cy.contains('New User Signup!').should('be.visible')
    cadastro
      .preencherFormulario()
      .verificarSeUsuarioEstaLogado(Cypress.env('firstName'))
    menu.irParaProducts()
    produtos.buscarProduto('Blue Top')
    produtos.verPrimeiroProduto()
    carrinho.addCart()
    cy.get('.modal-footer > .btn')
    .should('contain', 'Continue Shopping')
    .and('be.visible')
    .click()

    menu.irParaCart()
    cy.get('tbody').should('have.length', 1)
    cy.get('#product-1')
      .should('be.visible')
      .and('contain', 'Blue Top')
      .and('contain', 'Rs. 500')

    carrinho
      .proceedToCheckout()
      .verificarAddressDetails()
      .verificarReviewYourOrdem()
      
    cy.get(':nth-child(4) > .cart_total_price').should('have.text', 'Rs. 500')
    cy.get('[name="message"]').type('Comentário sobre a compra')
    cy.get('.btn.btn-default.check_out')
      .should('be.visible')
      .and('contain', 'Place Order')
      .click()
    cy.get('[data-qa="name-on-card"]').type(`${Cypress.env('firstName')} ${Cypress.env('lastName')}`)
    cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
    cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
    cy.get('[data-qa="expiry-month"]').type(10)
    cy.get('[data-qa="expiry-year"]').type(2028)
    cy.get('[data-qa="pay-button"]').click()
    cy.get('[data-qa="order-placed"]').should('be.visible')

    menu.irParaDelete()
    cadastro.verificaSeCadastroFoiExcluido()
    cy.get('[data-qa="continue-button"]').click()
  });

  after(() => {
    menu.irParaSignupLogin()
    login.preencherLogin(emailUsuarioCadastrado,senhaUsuarioCadastrado)
    menu.irParaDelete()
    cadastro.verificaSeCadastroFoiExcluido()
  });
})