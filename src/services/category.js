import axios from 'axios'
const baseUrl = 'http://localhost:3001/categories'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}

const create = newElement => {
	const request = axios.post(baseUrl, newElement)
	return request.then((response) => response.data)
}

export default { getAll, create }
