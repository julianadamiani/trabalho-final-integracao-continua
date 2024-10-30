class Login {
    preencherLogin(email, password) {
        cy.contains('Login to your account').should('be.visible')
        cy.get('[data-qa="login-email"]').type(email)
        cy.get('[data-qa="login-password"]').type(password, { log: false })
       
        cy.get('[data-qa="login-button"]').click()
    }
}

export default new Login()