const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

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
    }
]

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int! 
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ) : Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ) : Author
  }
`


const filterBooks = ({ author, genre }) => {
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
}

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => {
            return authors.length
        },
        allBooks: (root, args) => {
            if (args.author || args.genre) {
                const result = filterBooks(args)
                return result
            }
            return books
        },
        allAuthors: () => {
            return authors
        }
    },
    Author: {
        bookCount: (root) => {
            const { name } = root
            const bookCount = books.filter(book => book.author === name).length
            return bookCount
        }
    },
    Mutation: {
        addBook: (root, args) => {
            const newBook = { ...args, id: uuid() }
            books = books.concat(newBook)

            if (!authors.find(author => author.name === newBook.author)) {
                const newAuthor = {
                    name: newBook.author,
                    born: null,
                    id: uuid()
                }
                authors = authors.concat(newAuthor)
            }
            return newBook
        },
        editAuthor: (root, args) => {
            authors = authors.map(author => author.name === args.name ? { ...author, born: args.setBornTo } : author)
            return authors.find(author => author.name === args.name)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})