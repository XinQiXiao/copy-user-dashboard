/**
 * create at 07/18/18
 */
import { connect } from 'dva'
import React, { Component } from 'react'
import { Table } from 'antd'

// styles
import styles from './User.css'

// const 
const tableColumns = [
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
			</span>
		)
	}
]

class UsersComponent extends Component{
	render(){
		console.log('UsersComponent props=>', this.props)
		const {loading, dataSource} = this.props
		return (
			<div>
				<div className={styles.create}>

				</div>
				<Table loading={loading} pagination={false}
					columns={tableColumns}
					dataSource={dataSource} rowKey={record => record.id}
				/>
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