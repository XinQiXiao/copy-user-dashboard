import { getUsers } from '../services/users'

export default {
	namespace: 'users',
	state: {
		list: [],
	},
	subscriptions: {
		setup({ dispatch, history }){
			return history.listen(({ pathname, query }) => {
				if(pathname === '/users'){
					// console.log('subscriptions /users query=>', query)
					dispatch({ type: 'fetch', payload: query })
				}
			})
		}
	},
	effects: {
		*fetch({ payload: { page } }, { call, put }){
			const { data, headers } = yield call(getUsers, { page })
			yield put({ type: 'save', payload: { data, total: headers['x-total-count'] } })
		},
	},
	reducers: {
		save(state, { payload: { data: list, total } }){
			return { ...state, list, total }
		},
	}
}