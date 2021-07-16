import React, { useState } from 'react'
import './input.css'
import { connect } from 'react-redux'
import {
	loadBooks,
	setLoading,
	changeQuery,
	setTotalItems,
	resetBooks,
	resetStartIndex,
	setOpened,
} from '../../redux/Actions/actions'

const myAPIKey = 'AIzaSyCgRUtnaRS_MTCQxmK0J-q-O-KFJMrEv5M'

function InputLine(props) {
	const [input, setInput] = useState('')

	async function submit(event) {
		if (
			(event.key === 'Enter' || event.type === 'click') &&
			event.target.value !== '' &&
			input !== ''
		) {
			props.open(false)
			props.resetBooks()
			props.resetIndex()
			props.loader(true)
			const url = `https://www.googleapis.com/books/v1/volumes?q=${
				event.target.value || input
			}${
				props.category === 'all' ? '' : `+subject:${props.category}`
			}&orderBy=${
				props.sorting
			}&startIndex=0&maxResults=30&key=${myAPIKey}`

			const res = await fetch(url)
			const data = await res.json()
			if (!data.totalItems) {
				props.loader(false)
				props.setItems(0)
				return
			} else {
				props.setItems(data.totalItems)
				props.load(data.items)
				props.loader(false)
				props.setQuery(input)
			}
		}
	}
	return (
		<div className='inputwrapper'>
			<input
				autoFocus={true}
				type='text'
				onKeyPress={submit}
				className='inputline'
				onChange={(event) => setInput(event.target.value)}
			/>
			<i
				className='fa fa-search search'
				aria-hidden='true'
				onClick={submit}
			></i>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		category: state.currentCategory,
		sorting: state.currentSorting,
		startIndex: state.startIndex,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		load: (array) => dispatch(loadBooks(array)),
		loader: (value) => dispatch(setLoading(value)),
		setQuery: (query) => dispatch(changeQuery(query)),
		setItems: (number) => dispatch(setTotalItems(number)),
		resetBooks: () => dispatch(resetBooks()),
		resetIndex: () => dispatch(resetStartIndex()),
		open: (value) => dispatch(setOpened(value)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InputLine)
