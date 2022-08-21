let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]
/*
const booksByAuthor = (books) => {
    let booksByAuthor = new Map()
    books.forEach(book => {
        const name = book.author
        if (booksByAuthor.has(name)) {
            booksByAuthor.set(name, { name, bookCount: booksByAuthor.get(name).bookCount + 1 })
        } else {
            booksByAuthor.set(name, { name, bookCount: 1 })
        }
    })

    return [...booksByAuthor.values()]
}

const result = booksByAuthor(books)

console.log(result)
console.log(`Con forEach: ${result.length}`)

let resultado = books.reduce((acc, curr) => {
    const name = curr.author
    if (acc.has(name)) {
        acc.set(name, { name, bookCount: acc.get(name).bookCount + 1 })
    } else {
        acc.set(name, { name, bookCount: 1 })
    }
    return acc
}, new Map())
console.log(resultado)
console.log(`Con reduce: ${resultado.size}`)
*/

let result = []
books.forEach(book => {
    let res = book.genres.filter(genre => genre === 'refactoring')

    if (res[0] === 'refactoring') {
        result.push({ ...book })
    }
})

let result2 = books.map(book => {
    let res = book.genres.filter(genre => genre === 'refactoring')
    if (res[0] === 'refactoring') {
        return { ...book }
    }
    return null
})
//console.log(result)

//console.log(result2)

const filterBooks = ({ author, genre }) => {
    console.log(author, genre)
    let result
    let newRes = []
    if (author) {
        result = books.filter(b => b.author === author)
    }

    if (genre) {
        if (result) {
            result.forEach(book => {
                let res = book.genres.filter(genre => genre === genre)
                if (res[0] === genre) {
                    newRes.push({ ...book })
                }
            })
        } else {
            books.forEach(book => {
                let res = book.genres.filter(genre => genre === genre)
                if (res[0] === genre) {
                    newRes.push({ ...book })
                }
            })
        }
    }

    if (genre) return newRes
    if (author) return result
    return books
}

let res3 = filterBooks({ author: "Robert Martin" })
console.log(res3)