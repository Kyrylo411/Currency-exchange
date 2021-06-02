import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.scss'

export default function NavBar() {
	return (
		<div className='NavWrap'>
			<Link to='/'> Currency Exchange </Link>
			{/* <Link to='/choose-pare'> Выбор пары </Link>
			<Link to='/exchange-history'> История обмена </Link>
			<Link to='/main-page'> Данные </Link> */}
		</div>
	)
}
