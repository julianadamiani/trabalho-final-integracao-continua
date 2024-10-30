import { faker } from '@faker-js/faker'
class Cadastro{
    iniciarCadastro(nomeUsusario, emailUsuario) {
        cy.get('[data-qa="signup-name"]').type(nomeUsusario)
        cy.get('[data-qa="signup-email"]').type(emailUsuario)
        cy.contains('button', 'Signup').click()

        return this
    }

    preencherFormulario(){       
        const person = {
            firstName: faker.person.firstName('female'),
            lastName: faker.person.lastName(),
            phoneNumber: faker.phone.number()
        }
        const login = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const addressInformation = {
            address: faker.location.streetAddress(),
            address2: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: 'United States'
        }

        Cypress.env('firstName', person.firstName)
        Cypress.env('lastName', person.lastName)
        Cypress.env('phoneNumber', person.phoneNumber)
        Cypress.env('email', login.email)
        Cypress.env('password', login.password)
        Cypress.env('address', addressInformation.address)
        Cypress.env('address2', addressInformation.address2)
        Cypress.env('city', addressInformation.city)
        Cypress.env('state', addressInformation.state)
        Cypress.env('zipCode', addressInformation.zipCode)
        Cypress.env('country', addressInformation.country)

        cy.get('[data-qa="signup-name"]').type(Cypress.env('firstName'))
        cy.get('[data-qa="signup-email"]').type(Cypress.env('email'))
        cy.contains('button', 'Signup').click()

        cy.contains('Enter Account Information').should('be.visible')

        cy.get('input[type=radio]').check('Mrs')
        cy.get('[type=password]').type(Cypress.env('password'), {log: false})
        cy.get('[data-qa="days"]').select('5')
        cy.get('[data-qa="months"]').select('August')
        cy.get('[data-qa="years"]').select('1989')
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()
        cy.get('[data-qa="first_name"]').type(Cypress.env('firstName'))
        cy.get('[data-qa="last_name"]').type(Cypress.env('lastName'))
        cy.get('[data-qa="company"]').type(faker.company.name())
        cy.get('[data-qa="address"]').type(Cypress.env('address'))
        cy.get('[data-qa="address2"]').type(Cypress.env('address2'))
        cy.get('[data-qa="country"]').select(Cypress.env('country'))
        cy.get('[data-qa="state"]').type(Cypress.env('state'))
        cy.get('[data-qa="city"]').type(Cypress.env('city'))
        cy.get('[data-qa="zipcode"]').type(Cypress.env('zipCode'))
        cy.get('[data-qa="mobile_number"]').type(Cypress.env('phoneNumber'))

        cy.get('[data-qa="create-account"]').click()

        cy.url().should('includes', 'account_created')

        cy.get('[data-qa="account-created"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()

        return this
    }  

    verificarSeUsuarioEstaLogado(usuario) {
        cy.get('i.fa-user').parent().should('contain', `Logged in as ${usuario}`)

        return this
    }

    verificaSeCadastroFoiExcluido() {
        cy.get('[data-qa="account-deleted"]')
          .should('be.visible')
          .and('contain', 'Account Deleted!')

        return this
    }
}

export default new Cadastro()