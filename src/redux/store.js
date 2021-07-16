import { createStore } from 'redux'
import reducer from './reducer'

export const initialState = {
	currentCategory: 'all',
	currentSorting: 'relevance',
	showCategory: false,
	showSorting: false,
	startIndex: 0,
	books: [],
	loading: false,
	query: '',
	totalItems: 0,
	isOpened: false,
	openedCard: {
		title: '',
		categories: [],
		authors: [],
		link: '',
		description: '',
	},
}

const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store
