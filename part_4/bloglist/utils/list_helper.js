const dummy = (...blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesArray = blogs.map(blog => blog.likes)
    return likesArray.length === 0
        ? 0
        : likesArray.reduce((acc, curr) => acc + curr)
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))
    const mostLikesBlog = blogs.find(blog => blog.likes === mostLikes)
    delete mostLikesBlog._id
    delete mostLikesBlog.__v
    delete mostLikesBlog.url
    return mostLikesBlog
}

const mostBlogs = (blogs) => {
    let blogsByAuthor = blogs.reduce((acc, curr) => {
        const { author } = curr
        if (acc.has(author)) {
            acc.set(author, { author: author, blogs: acc.get(author).blogs + 1 })
        } else {
            acc.set(author, { author: author, blogs: 1 })
        }
        return acc
    }, new Map())

    let authorWithMostBlogs = [...blogsByAuthor.values()]
        .reduce((max, author) => max.blogs > author.blogs ? max : author)
    return authorWithMostBlogs
}

const mostLikes = (blogs) => {
    let likesByAuthor = blogs.reduce((acc, curr) => {
        const { author, likes } = curr
        if (acc.has(author)) {
            acc.set(author, { author: author, likes: acc.get(author).likes + likes })
        } else {
            acc.set(author, { author: author, likes: likes })
        }
        return acc
    }, new Map())

    let authorWithMostLikes = [...likesByAuthor.values()]
        .reduce((max, author) => max.likes > author.likes ? max : author)
    return authorWithMostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}