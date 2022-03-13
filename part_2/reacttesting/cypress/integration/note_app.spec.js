describe('Note app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            username: 'root',
            name: 'Rojas Diego',
            password: 'secret12'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('Notes')
        cy.contains('Note app, Department of Computar Sicence, University of Helsinki 2021')
    })

    it('login form can be opened', function () {
        cy.contains('login').click()
    })

    it('user can log in', function () {
        cy.contains('login').click()
        cy.get('#username').type('root')
        cy.get('#password').type('secret12')
        cy.get('#login-button').click()
        cy.contains('Rojas Diego logged in')
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'root', password: 'secret12' })
        })

        it('a note can be created', function () {
            cy.createNote({ content: 'cypress note', important: true })
            cy.contains('cypress note')
        })

        describe('and a note exists', function () {
            beforeEach(function () {
                cy.createNote({ content: 'another cypress note', important: false })
            })

            it('it can be made important', function () {
                cy.contains('another cypress note').parent().find('button').click()
                cy.contains('another cypress note').parent().should('contain', 'make not important')
            })
        })

        describe('and several notes exits', function () {
            beforeEach(function () {
                cy.createNote({ content: 'first note', imporant: false })
                cy.createNote({ content: 'second note', important: false })
                cy.createNote({ content: 'third note', imporatnt: false })
            })

            it('one of those can be made important', function () {
                cy.contains('second note').parent().find('button').as('theButton')
                cy.get('@theButton').click()
                cy.get('@theButton').should('contain', 'make not important')
            })
        })
    })


    it('login fails with wrong password', function () {
        cy.contains('login').click()
        cy.get('#username').type('root')
        cy.get('#password').type('maradona')
        cy.get('#login-button').click()

        cy.get('.error')
            .should('contain', 'Wrong Credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Rojas Diego logged in')
    })


})