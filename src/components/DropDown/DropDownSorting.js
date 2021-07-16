import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'
import { changeSorting, showSorting } from '../../redux/Actions/actions'

function DropDownCategory(props) {
	const array = ['relevance', 'newest']

	function handleClick(value) {
		props.changeSorting(value)
		props.sorting(false)
	}

	return (
		<div className='cover'>
			<div className='label'>Sort by</div>
			<div
				className='dropdown'
				onMouseEnter={() => {
					props.sorting(true)
				}}
				onMouseLeave={() => {
					props.sorting(false)
				}}
			>
				<div className='current'>
					{props.currentSorting}
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
					style={{ display: !props.displaySorting ? 'none' : '' }}
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
		currentSorting: state.currentSorting,
		displaySorting: state.showSorting,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		changeSorting: (sorting) => dispatch(changeSorting(sorting)),
		sorting: (value) => dispatch(showSorting(value)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownCategory)
