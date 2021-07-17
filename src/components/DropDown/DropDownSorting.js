import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'
import {
	changeSorting,
	showSorting,
	loadBooks,
	resetBooks,
	resetStartIndex,
	setLoading,
	setTotalItems,
} from '../../redux/Actions/actions'

const myAPIKey = 'AIzaSyCgRUtnaRS_MTCQxmK0J-q-O-KFJMrEv5M'

function DropDownCategory(props) {
	const array = ['relevance', 'newest']

	async function handleClick(value) {
		props.changeSorting(value)
		props.sorting(false)
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
			}${
				props.category === 'all' ? '' : `+subject:${props.category}`
			}&orderBy=${value}&startIndex=${start}&maxResults=30&key=${myAPIKey}`
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
		query: state.query,
		books: state.books,
		category: state.currentCategory,
		startIndex: state.startIndex,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		changeSorting: (sorting) => dispatch(changeSorting(sorting)),
		sorting: (value) => dispatch(showSorting(value)),
		loadBooks: (data) => dispatch(loadBooks(data)),
		resetStartIndex: (value) => dispatch(resetStartIndex(value)),
		resetBooks: () => dispatch(resetBooks()),
		setLoading: (value) => dispatch(setLoading(value)),
		setTotal: (value) => dispatch(setTotalItems(value)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownCategory)
