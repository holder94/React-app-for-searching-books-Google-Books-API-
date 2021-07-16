import { initialState } from './store'
import {
	CHANGE_CATEGORY,
	CHANGE_SORTING,
	SHOW_CATEGORY,
	SHOW_SORTING,
	LOAD_BOOKS,
	SET_LOADING,
	CHANGE_QUERY,
	SET_TOTAL_ITEMS,
	SET_OPENED,
	UPDATE_CARD,
	RESET_START_INDEX,
	RESET_BOOKS,
} from './Actions/actionTypes'

function reducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_CATEGORY: {
			return { ...state, currentCategory: action.value }
		}
		case CHANGE_SORTING: {
			return { ...state, currentSorting: action.value }
		}
		case SHOW_CATEGORY: {
			return { ...state, showCategory: action.value }
		}
		case SHOW_SORTING: {
			return { ...state, showSorting: action.value }
		}
		case LOAD_BOOKS: {
			const books = state.books.concat(action.array)
			return { ...state, books, startIndex: state.startIndex + 30 }
		}
		case SET_LOADING: {
			return {
				...state,
				loading: action.value,
			}
		}
		case CHANGE_QUERY: {
			return {
				...state,
				query: action.query,
			}
		}
		case SET_TOTAL_ITEMS: {
			return {
				...state,
				totalItems: action.value,
			}
		}
		case SET_OPENED: {
			return {
				...state,
				isOpened: action.value,
			}
		}
		case UPDATE_CARD: {
			return {
				...state,
				openedCard: action.object,
			}
		}
		case RESET_START_INDEX: {
			return {
				...state,
				startIndex: 0,
			}
		}
		case RESET_BOOKS: {
			return {
				...state,
				books: [],
			}
		}
		default:
			return state
	}
}

export default reducer
