import axios from 'axios'
const baseUrl = '/api/bloglist'
let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    }
    console.log(newBlog, config)
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const put = async (modifiedBlog, id) => {
    const response = await axios.put(`${baseUrl}/${id}`, modifiedBlog, {
        new: true,
    })
    return response.data
}

const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const blogService = {
    getAll,
    create,
    put,
    deleteBlog,
    setToken,
}

export default blogService
