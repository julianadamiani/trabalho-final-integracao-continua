class Menu {
    irParaHome() {
        cy.contains('Home').click()
    }

    irParaSignupLogin() {
        cy.contains('Signup').click()
        cy.url().should('contain', 'login')
    }

    irParaProducts() {
        cy.contains('Products').click()
        cy.url().should('contain', 'products')
    }

    irParaLogout() {
        cy.contains(' Logout').click()
        cy.url().should('contain', 'login')
    }

    irParaContactUs() {
        cy.contains(' Contact us').click()
        cy.url().should('contain', 'contact_us')
    }

    irParaCart() {
        cy.contains(' Cart').click()
        cy.url().should('contain', 'view_cart')

    }

    irParaDelete() {
        cy.contains(' Delete Account').click()
        cy.url().should('includes', 'delete_account')
    }
}
export default new Menu()