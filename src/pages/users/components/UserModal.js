/**
 * create at 07/18/18
 */
import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

// const 
const FormItem = Form.Item

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 }
}

class UserEditModal extends Component{
	constructor(props){
		super(props)

		this.state = { 
			visible: false
		}
	}

	_showModalHandler = (e) => {
		console.log('_showModalHandler e=>', e)
		if(e)
			e.stopPropagation()
		this.setState({
			visible: true
		})
	}
	_hideModalHandler = () => {
		this.setState({
			visible: false
		})
	}
	_okHandler = () => {
		const { modalConfirmPress, form = {} } = this.props
		const { validateFields } = form
		validateFields((err, values) => {
			console.log('_okHandler validateFields err=>', err, ' values=>', values)
			if(!err){
				modalConfirmPress(values)
				this._hideModalHandler()
			}
		})
	}

	render(){
		const { visible } = this.state
		const { children, form = {}, record = {} } = this.props
		const { getFieldDecorator } = form
		const { name, email, website } = record
		return (
			<span>
				<span onClick={this._showModalHandler}>{children}</span>
				<Modal visible={visible} title="Edit User"
					onCancel={this._hideModalHandler} onOk={this._okHandler}
				>
					<Form horizontal="true" onSubmit={this._okHandler}>
						<FormItem {...formItemLayout} label="Name">
							{
								getFieldDecorator('name', {
									initialValue: name
								})(<Input />)
							}
						</FormItem>
						<FormItem {...formItemLayout} label="Email">
							{
								getFieldDecorator('email', {
									initialValue: email
								})(<Input />)
							}
						</FormItem>
						<FormItem {...formItemLayout} label="Website">
							{
								getFieldDecorator('website', {
									initialValue: website
								})(<Input />)
							}
						</FormItem>
					</Form>
				</Modal>
			</span>
		)
	}
}

export default Form.create()(UserEditModal)