import React from 'react'
import './header.css'
import DropDownCategory from '../DropDown/DropDownCategory'
import DropDownSorting from '../DropDown/DropDownSorting'
import InputLine from '../InputLine/InputLine'

function Header(props) {
	return (
		<React.Fragment>
			<div className='text'>Search for books</div>
			<InputLine />
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-evenly',
					position: 'absolute',
					zIndex: 2,
					width: '100%',
				}}
			>
				<DropDownCategory />
				<DropDownSorting />
			</div>
		</React.Fragment>
	)
}

export default Header
