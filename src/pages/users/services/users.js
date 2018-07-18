import requestApi from '../../../utils/request'

function getUsers({page = 1}){
	return requestApi(`/api/users?_page=${page}&_limit=5`)
}

export {
	getUsers
}