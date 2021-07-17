import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'
import {
	changeCategory,
	showCategory,
	loadBooks,
	resetBooks,
	resetStartIndex,
	setLoading,
	setTotalItems,
} from '../../redux/Actions/actions'

const myAPIKey = 'AIzaSyCgRUtnaRS_MTCQxmK0J-q-O-KFJMrEv5M'

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

	async function handleClick(value) {
		props.changeCategory(value)
		props.category(false)
		if (!props.query) return
		const length = props.books.length
		let times = Math.floor(length / 30) + (length % 30 ? 1 : 0)
		if (times === 0) times++
		let total = 0
		let start = 0
		props.resetBooks()
		props.setLoading(true)

		for (let i = 0; i < times; i++) {
			const url = `https://www.googleapis.com/books/v1/volumes?q=${
				props.query
			}${value === 'all' ? '' : `+subject:${value}`}&orderBy=${
				props.currentSorting
			}&startIndex=${start}&maxResults=30&key=${myAPIKey}`
			console.warn(url)

			const res = await fetch(url)
			const data = await res.json()
			if (data.totalItems === 0) {
				props.setTotal(total)
				props.resetStartIndex(start)
				props.setLoading(false)
				return
			}
			props.loadBooks(data.items)
			total += data.totalItems
			start += 30
		}
		props.resetStartIndex(start)
		props.setTotal(total)
		props.setLoading(false)
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
		query: state.query,
		books: state.books,
		category: state.currentCategory,
		startIndex: state.startIndex,
		currentSorting: state.currentSorting,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		changeCategory: (category) => dispatch(changeCategory(category)),
		category: (value) => dispatch(showCategory(value)),
		loadBooks: (data) => dispatch(loadBooks(data)),
		resetStartIndex: (value) => dispatch(resetStartIndex(value)),
		resetBooks: () => dispatch(resetBooks()),
		setLoading: (value) => dispatch(setLoading(value)),
		setTotal: (value) => dispatch(setTotalItems(value)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownCategory)
