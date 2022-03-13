describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', {
            username: 'root',
            name: 'Rojas Diego',
            password: 'secret12'
        })
        cy.request('POST', 'http://localhost:3003/api/users', {
            username: 'user1',
            name: 'Usuario 1',
            password: 'user1'
        })
        cy.visit('http://localhost:3000')
    })
    it('Login form is shown', function () {
        cy.contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('root')
            cy.get('#password').type('secret12')
            cy.get('#login-button').click()

            cy.contains('Rojas Diego is logged in')
        })

        it('fails with incorrect credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('root')
            cy.get('#password').type('secret12333333333')
            cy.get('#login-button').click()

            cy.contains('invalid username or password')
            cy.get('html').should('not.contain', 'Rojas Diego logged in')
        })

        it('error notification has the right css properties', function () {
            cy.contains('login').click()
            cy.get('#username').type('root')
            cy.get('#password').type('secret12333333333')
            cy.get('#login-button').click()
            cy.get('.error').should('contain', 'invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
                .and('not.contain', 'Rojas Diego logged in')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'root', password: 'secret12' })
        })
        it('A blog can be added', function () {
            cy.contains('Create new blog').click()
            cy.get('#title').type('new blog from cypress')
            cy.get('#author').type('Rojas Diego Armando')
            cy.get('#url').type('www.test.com.ar')
            cy.get('#newBlog-button').click()

            cy.contains('new blog from cypress')
            cy.get('.add').contains('a new blog new blog from cypress by Rojas Diego Armando added')
        })

        it('A blog can be liked', function () {
            const newBlog = {
                title: 'new blog to like',
                author: 'Rojas Diego Armando',
                url: 'www.test.com.ar'
            }
            cy.createBlog(newBlog)

            cy.contains('new blog to like').contains('view').click()

            cy.contains('new blog to like').parent().contains('button', 'like').click()
            cy.contains('new blog to like').parent().contains('likes 1')
            cy.get('.add').contains('Like added to new blog to like')
        })

        it('A blog can be deleted by the user who created it', function () {
            const newBlog = {
                title: 'new blog to delete',
                author: 'Rojas Diego Armando',
                url: 'www.test.com.ar'
            }
            cy.createBlog(newBlog)

            cy.contains('new blog to delete').contains('view').click()
            cy.contains('new blog to delete').parent().contains('button', 'Delete').click()
            cy.contains('new blog to delete deleted!')
        })

        //error: you cant delete other users blogs
        it('A blog can not be deleted by other user', function () {
            const newBlog = {
                title: 'new blog to delete',
                author: 'Rojas Diego Armando',
                url: 'www.test.com.ar'
            }
            cy.createBlog(newBlog)

            cy.contains('Logout').click()
            cy.login({ username: 'user1', password: 'user1' })

            cy.contains('new blog to delete').contains('view').click()
            cy.contains('new blog to delete').parent().contains('button', 'Delete').click()

            cy.get('.error').should('contain', 'error: you cant delete other users blogs')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })

    describe('sort blogs', function () {
        beforeEach(function () {
            cy.login({ username: 'root', password: 'secret12' })
            cy.createBlog({ title: 'Blog with less likes', author: 'La roca', url: 'www.roca.com', likes: 5 })
            cy.createBlog({ title: 'Blog with most likes', author: 'La roca', url: 'www.roca.com', likes: 15 })
            cy.createBlog({ title: 'Blog with some likes', author: 'La roca', url: 'www.roca.com', likes: 10 })

        })

        it('the blogs are ordered according to likes', function () {
            //cy.visit('http://localhost:3000')
            cy.get('#blog-all div:first')
                .should('contain', 'Blog with most likes')
        })
    })
})