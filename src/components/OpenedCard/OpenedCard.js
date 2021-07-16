import React from 'react'
import './openedcard.css'
import { connect } from 'react-redux'
import { setOpened } from '../../redux/Actions/actions'

function OpenedCard(props) {
	return (
		<div
			className='openedcard'
			style={{ display: props.isOpened ? 'flex' : 'none' }}
		>
			<img src={props.data.link} alt='no pic' className='picture' />
			<div className='main'>
				<div className='categories'>
					Categories:&nbsp;
					{props.data.categories || 'Not stated'}
					<i
						className='fa fa-times icon'
						aria-hidden='true'
						onClick={() => {
							props.open(false)
						}}
					></i>
				</div>
				<div className='Title'>Title: {props.data.title}</div>
				<div className='Authors'>
					Authors:&nbsp;
					{props.data.authors.length === 0 ? 'Not stated' : ''}
					{props.data.authors.map(function (author, i) {
						return `${author}${i === props.data.authors.length - 1 ? '' : ', '}`
					})}
				</div>
				<div className='description'>
					Description:
					<br />
					{props.data.description}
				</div>
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		data: state.openedCard,
		isOpened: state.isOpened,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		open: (value) => dispatch(setOpened(value)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenedCard)
