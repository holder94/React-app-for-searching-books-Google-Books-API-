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
		props.setQuery(input)
		if (
			(event.key === 'Enter' || event.type === 'click') &&
			event.target.value !== '' &&
			input !== ''
		) {
			props.setOpened(false)
			props.resetBooks()
			props.resetIndex(0)
			props.setLoading(true)
			const url = `https://www.googleapis.com/books/v1/volumes?q=${
				event.target.value || input
			}${
				props.currentCategory === 'all'
					? ''
					: `+subject:${props.currentCategory}`
			}&orderBy=${
				props.currentSorting
			}&startIndex=0&maxResults=30&key=${myAPIKey}`
			console.log(url)

			try {
				const res = await fetch(url)
				const data = await res.json()
				if (!data.totalItems) {
					props.setItems(0)
				} else {
					props.setItems(data.totalItems)
					props.loadBooks(data.items)
				}
			} catch (e) {
				console.log(e)
			}
			props.setLoading(false)
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
		currentCategory: state.currentCategory,
		currentSorting: state.currentSorting,
		startIndex: state.startIndex,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadBooks: (array) => dispatch(loadBooks(array)),
		setLoading: (value) => dispatch(setLoading(value)),
		setQuery: (query) => dispatch(changeQuery(query)),
		setItems: (number) => dispatch(setTotalItems(number)),
		resetBooks: () => dispatch(resetBooks()),
		resetIndex: (value) => dispatch(resetStartIndex(value)),
		setOpened: (value) => dispatch(setOpened(value)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InputLine)
