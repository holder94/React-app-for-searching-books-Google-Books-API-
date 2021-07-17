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
		props.loader(true)
		const url = `https://www.googleapis.com/books/v1/volumes?q=${
			props.query
		}${
			props.category === 'all' ? '' : `+subject:${props.category}`
		}&orderBy=${props.sorting}&startIndex=${
			props.startIndex
		}&maxResults=30&key=${myAPIKey}`

		const res = await fetch(url)
		const data = await res.json()

		if (props.array.length !== props.totalItems) {
			props.load(data.items)
		}
		props.loader(false)
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
						(props.array.length || props.loading) && !props.isOpened
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
					{props.array.map((item, index) => {
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
						props.array.length && !props.isOpened && !props.loading
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
		array: state.books,
		category: state.currentCategory,
		sorting: state.currentSorting,
		startIndex: state.startIndex,
		query: state.query,
		loading: state.loading,
		totalItems: state.totalItems,
		isOpened: state.isOpened,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		load: (data) => dispatch(loadBooks(data)),
		loader: (value) => dispatch(setLoading(value)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
