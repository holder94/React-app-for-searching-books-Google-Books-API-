import React from 'react'
import './card.css'
import { connect } from 'react-redux'
import { setOpened, updateCard } from '../../redux/Actions/actions'

function Card(props) {
	function openCard(title, categories, authors, link) {
		props.open(true)
		const obj = {
			title,
			categories,
			authors,
			link,
			description: props.description,
		}
		props.update(obj)
	}
	return (
		<div
			className='card'
			onClick={() => {
				openCard(
					props.title,
					props.categories,
					props.authors,
					props.imgLink
				)
			}}
		>
			{props.imgLink === ' ' ? <div className="altpic">No picture</div> : <img src={props.imgLink} width='100%' alt='no pic' />}
			<br />
			<div className='title'>{props.title}</div>
			<div className='category'>
				Category: {props.categories || 'Not stated'}
			</div>
			<div className='authors'>
				Authors:{' '}
				{props.authors.length === 0
					? 'Not stated'
					: props.authors.map((author, index) => {
							return `${author}${
								index === props.authors.length - 1 ? '' : ', '
							}`
					  })}
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {
		open: (value) => dispatch(setOpened(value)),
		update: (obj) => dispatch(updateCard(obj)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
