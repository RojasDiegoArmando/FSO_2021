Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username, password
    }).then(response => {
        localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    cy.request({
        url: 'http://localhost:3003/api/bloglist',
        method: 'POST',
        body: {
            title,
            author,
            url,
            likes: likes || 0
        },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
        }
    })
    cy.visit('http://localhost:3000')
})