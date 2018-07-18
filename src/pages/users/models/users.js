import { fetch, create, patch, remove } from '../services/users'

export default {
	namespace: 'users',

	state: {
		list: [],
		total: null,
		page: 0
	},

	subscriptions: {
		setup({ dispatch, history }){
			return history.listen(({ pathname, query }) => {
				if(pathname === '/users'){
					dispatch({ type: 'fetch', payload: query })
				}
			})
		}
	},

	effects: {
		*fetch({ payload: { page = 1 } }, { call, put }){
			const { data, headers } = yield call(fetch, { page })
			yield put({ 
				type: 'save', 
				payload: { 
					data, 
					total: Number.parseInt(headers['x-total-count'], 10),
					page: Number.parseInt(page, 10) 
				} 
			})
		},

		*remove({ payload: id }, { call, put, select }){
			yield call(remove, id)
			const page = yield select(state => state.users.page)
			yield put({ 
				type: 'fetch', 
				payload: { page } 
			})
		},

		*patch({ payload: { id, values } }, { call, put, select }){
			yield call(patch, id, values)
			const page = yield select(state => state.users.page)
			yield put({
				type: 'fetch', 
				payload: { page }
			})
		},

		*create({ payload: values }, { call, put, select }){
			yield call(create, values)
			const page = yield select(state => state.users.page)
			yield put({
				type: 'fetch',
				payload: { page }
			})
		}
	},

	reducers: {
		save(state, { payload: { data: list, total, page } }){
			return { ...state, list, total, page }
		},
	}
}