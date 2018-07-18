/**
 * create at 07/18/18
 */
import { connect } from 'dva'
import React, { Component } from 'react'
import { Table, Popconfirm, Button, Pagination } from 'antd'
import { routerRedux } from 'dva/router'

// components
import UserModal from './UserModal'

// styles
import styles from './User.css'

// const
import { PAGE_SIZE } from '../constants'

class UsersComponent extends Component{
	tableColumns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: text => <a href="">{text}</a>
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
		},
		{
			title: 'Website',
			dataIndex: 'website',
			key: 'website',
		},
		{
			title: 'Operation',
			key: 'operation',
			render: (text, record) => (
				<span className={styles.operation}>
					<UserModal record={record} modalConfirmPress={(values) => this._editHandler(record.id, values)}>
						<a>Edit</a>
					</UserModal>
					<Popconfirm title="Confirm to delete" onConfirm={() => this._deleteHandler(record.id)}>
						<a href="" >Delete</a>
					</Popconfirm>
				</span>
			)
		}
	]

	_editHandler = (id, values) => {
		console.log('_editHandler id=>', id, ' values=>', values)
		const { dispatch } = this.props
		dispatch({
			type: 'users/patch',
			payload: { id, values }
		})
	}
	_deleteHandler = (id) => {
		const { dispatch } = this.props
		console.log('_deleteHandler id=>', id)
		dispatch({
			type: 'users/remove',
			payload: id
		})
	}
	_createHandler = (values) => {
		const { dispatch } = this.props
		console.log('_createHandler values=>', values)
		dispatch({
			type: 'users/create',
			payload: values
		})
	}

	_pageChangeHandler = (page) => {
		const { dispatch } = this.props
		dispatch(routerRedux.push({
			pathname: '/users',
			query: {page}
		}))
	}

	render(){
		const {loading, dataSource, total, current} = this.props
		return (
			<div className={styles.normal}>
				<div>
					<div className={styles.create}>
						<UserModal record={{}} modalConfirmPress={this._createHandler}>
							<Button type="primary">Create User</Button>
						</UserModal>
					</div>
					<Table loading={loading} pagination={false}
						columns={this.tableColumns}
						dataSource={dataSource} rowKey={record => record.id}
					/>
					<Pagination className="ant-table-pagination"
						total={total} current={current} pageSize={PAGE_SIZE}
						onChange={this._pageChangeHandler}
					/>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	const { list, total, page } = state.users
	return {
		dataSource: list,
		total,
		current: page,
		loading: state.loading.models.users,
	}
}

export default connect(mapStateToProps)(UsersComponent)