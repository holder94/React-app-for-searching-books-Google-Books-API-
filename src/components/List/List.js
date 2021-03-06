import React from 'react'
import './list.css'
import { connect } from 'react-redux'
import { loadBooks, setLoading } from '../../redux/Actions/actions'
import Card from '../Card/Card'
import ClipLoader from 'react-spinners/ClipLoader'
import OpenedCard from '../OpenedCard/OpenedCard'

const myAPIKey = 'AIzaSyCgRUtnaRS_MTCQxmK0J-q-O-KFJMrEv5M'

const css = {
	borderWidth: '7px',
	display: 'block',
	margin: 'auto',
}

function List(props) {
	async function handleClick() {
		props.setLoading(true)
		const url = `https://www.googleapis.com/books/v1/volumes?q=${
			props.query
		}${
			props.currentCategory === 'all'
				? ''
				: `+subject:${props.currentCategory}`
		}&orderBy=${props.currentSorting}&startIndex=${
			props.startIndex
		}&maxResults=30&key=${myAPIKey}`

		try {
			const res = await fetch(url)
			const data = await res.json()

			if (props.books.length !== props.totalItems) {
				props.loadBooks(data.items)
			}
		} catch (e) {
			console.log(e)
		}
		props.setLoading(false)
	}

	return (
		<React.Fragment>
			<div
				className='total'
				style={{
					display: !props.isOpened ? '' : 'none',
				}}
			>
				Total found: {props.totalItems}
			</div>
			<div
				className='wrapper'
				style={{
					display:
						(props.books.length || props.loading) && !props.isOpened
							? ''
							: 'none',
				}}
			>
				<div
					className='books'
					style={{
						display: 'flex',
					}}
				>
					{props.books.map((item, index) => {
						return (
							<Card
								key={index}
								title={item.volumeInfo.title}
								authors={item.volumeInfo.authors || []}
								categories={item.volumeInfo.categories}
								imgLink={
									item.volumeInfo.imageLinks
										? item.volumeInfo.imageLinks.thumbnail
										: ' '
								}
								description={
									item.volumeInfo.description ||
									'No desription'
								}
							/>
						)
					})}
				</div>
				<ClipLoader
					size={100}
					css={css}
					color='#f7485d'
					loading={props.loading}
				/>
			</div>
			<button
				className='btn'
				style={{
					display:
						props.books.length && !props.isOpened && !props.loading
							? ''
							: 'none',
				}}
				onClick={handleClick}
			>
				Load more
			</button>
			<OpenedCard />
		</React.Fragment>
	)
}

function mapStateToProps(state) {
	return {
		books: state.books,
		currentCategory: state.currentCategory,
		currentSorting: state.currentSorting,
		startIndex: state.startIndex,
		query: state.query,
		loading: state.loading,
		totalItems: state.totalItems,
		isOpened: state.isOpened,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadBooks: (data) => dispatch(loadBooks(data)),
		setLoading: (value) => dispatch(setLoading(value)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
