import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response.data)
}

const create = (nameObject) => {
    const req = axios.post(baseUrl, nameObject)
    return req.then(response => response.data)
}
const deleted = (id) => {
    axios.delete(`${baseUrl}/${id}`)
    return getAll()
}
const update = (id, nameObject) => {
    const req = axios.put(`${baseUrl}/${id}`, nameObject)
    return req.then(response => response.data)
}

export default {getAll, create, deleted, update}