class Produto {
    buscarProduto(produto){
        cy.get('.title.text-center').should('contain', 'All Products')
        cy.get('#search_product')
          .should('be.visible')
          .type(produto)
        cy.get('#submit_search').click()

        return this
    }
    verPrimeiroProduto() {
        cy.get('.single-products')
        .should('be.visible')
        .and('have.length.at.least', 1)
        .first()
        .parent()
        .contains('View Product')
        .click()

        cy.get('.product-information > h2').should('be.visible')
        cy.get('.product-information p').should('be.visible').and('have.length', 4)
        cy.get('.product-information span span').should('be.visible')

        return this
    }

} 

export default new Produto()