import React from 'react'
import withRouter from 'umi/withRouter'

// components
import Header from './Header'

// styles 
import styles from './index.css'

function Layout({ children, location }){
	return (
		<div className={styles.normal}>
			<Header location={location}/>
			<div className={styles.content}>
				<div className={styles.main}>
					{children}
				</div>
			</div>
		</div>
	)
}

export default withRouter(Layout)