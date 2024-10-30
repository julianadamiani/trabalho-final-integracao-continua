class Carrinho {
    addCart(produto) {
        cy.contains("Add to cart").click()

        return this
    }

    proceedToCheckout() {
        cy.get('.btn.btn-default.check_out')
        .should('contain', 'Proceed To Checkout')
        .and('be.visible')
        .click()  
        
        return this
    }

    verificarAddressDetails() {
        cy.get('#address_delivery')
        .should('contain', Cypress.env('firstName'))
        .and('contain',Cypress.env('lastName'))   
        .and('contain', Cypress.env('address'))
        .and('contain', Cypress.env('address2'))
        .and('contain', Cypress.env('city'))  
        .and('contain', Cypress.env('zipCode'))  
        .and('contain', Cypress.env('state'))  
        .and('contain', Cypress.env('phoneNumber'))

        cy.get('#address_invoice')
        .should('contain', Cypress.env('firstName'))
        .and('contain',Cypress.env('lastName'))  
        .and('contain', Cypress.env('address'))
        .and('contain', Cypress.env('address2'))
        .and('contain', Cypress.env('city'))  
        .and('contain', Cypress.env('zipCode'))  
        .and('contain', Cypress.env('state'))  
        .and('contain', Cypress.env('phoneNumber'))

        return this
    }  

    verificarReviewYourOrdem() {
        cy.contains('Review Your Order').should('be.visible')
        cy.get('.table.table-condensed')
        .scrollIntoView()
        .should('be.visible')
        .and('have.length.at.least', 1)   
        
        return this
    }
}

export default new Carrinho()