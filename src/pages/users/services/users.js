import requestApi from '../../../utils/request'
// constants
import { PAGE_SIZE } from '../constants'

// const 
const PATH_PRI = '/api/users'

function fetch({page = 1}){
	return requestApi(`${PATH_PRI}?_page=${page}&_limit=${PAGE_SIZE}`)
}

function create(values){
	return requestApi(`${PATH_PRI}`, {
		method: 'POST',
		body: JSON.stringify(values)
	})
}

function patch(id, values){
	return requestApi(`${PATH_PRI}/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(values)
	})
}

function remove(id){
	return requestApi(`${PATH_PRI}/${id}`, {
		method: 'DELETE'
	})
}

export {
	fetch,
	create,
	patch,
	remove,
}