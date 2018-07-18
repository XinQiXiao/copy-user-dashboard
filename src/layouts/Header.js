/**
 * create at 08/18/18
 */
import { Menu, Icon } from 'antd'
import Link from 'umi/link'

// const 
const MenuItem = Menu.Item

function Header({location}){
	return (
		<Menu theme="dark" mode="horizontal"
			selectedKeys={[location.pathname]}
		>
			<MenuItem key="/">
				<Link to="/"><Icon type="home"/>Home</Link>
			</MenuItem>
			<MenuItem key="/users">
				<Link to="/users"><Icon type="bars"/>Users</Link>
			</MenuItem>
			<MenuItem key="/umi">
				<a href="https://github.com/umijs/umi" target="_blank">umi</a>
			</MenuItem>
			<MenuItem key="/dva">
				<a href="https://github.com/dvajs/dva" target="_blank">dva</a>
			</MenuItem>
			<MenuItem key="/404">
				<Link to="/page-you-dont-know"><Icon type="frown-circle"/>404</Link>
			</MenuItem>
		</Menu>
	)
}

export default Header