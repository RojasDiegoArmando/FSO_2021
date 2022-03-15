import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateVote = async (object) => {
    const id = object.id
    const response = await axios.put(`${baseUrl}/${id}`, object, { new: true })
    return response.data
}

export default { getAll, createNew, updateVote }