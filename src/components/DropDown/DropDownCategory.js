import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'
import { changeCategory, showCategory } from '../../redux/Actions/actions'

function DropDownCategory(props) {
	const array = [
		'all',
		'art',
		'biography',
		'computers',
		'history',
		'medical',
		'poetry',
	]

	function handleClick(value) {
		props.changeCategory(value)
		props.category(false)
	}

	return (
		<div className='cover'>
			<div className='label'>Category</div>
			<div
				className='dropdown'
				onMouseEnter={() => {
					props.category(true)
				}}
				onMouseLeave={() => {
					props.category(false)
				}}
			>
				<div className='current'>
					{props.currentCategory}
					<i
						className='fa fa-arrow-down arrow'
						aria-hidden='true'
						style={{
							float: 'right',
							marginTop: '2px',
							marginRight: '2px',
						}}
					></i>
				</div>
				<ul
					className='list'
					style={{ display: !props.displayCategory ? 'none' : '' }}
				>
					{array.map((item, index) => {
						return (
							<li onClick={() => handleClick(item)} key={index}>
								{item}
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		currentCategory: state.currentCategory,
		displayCategory: state.showCategory,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		changeCategory: (category) => dispatch(changeCategory(category)),
		category: (value) => dispatch(showCategory(value)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownCategory)
