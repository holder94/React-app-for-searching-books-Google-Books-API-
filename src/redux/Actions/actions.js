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
} from './actionTypes'

export function changeCategory(category) {
	return {
		type: CHANGE_CATEGORY,
		value: category,
	}
}

export function changeSorting(sorting) {
	return {
		type: CHANGE_SORTING,
		value: sorting,
	}
}

export function showCategory(value) {
	return {
		type: SHOW_CATEGORY,
		value,
	}
}

export function showSorting(value) {
	return {
		type: SHOW_SORTING,
		value,
	}
}

export function loadBooks(array) {
	return {
		type: LOAD_BOOKS,
		array,
	}
}

export function setLoading(value) {
	return {
		type: SET_LOADING,
		value,
	}
}

export function changeQuery(query) {
	return {
		type: CHANGE_QUERY,
		query,
	}
}

export function setTotalItems(value) {
	return {
		type: SET_TOTAL_ITEMS,
		value,
	}
}

export function setOpened(value) {
	return {
		type: SET_OPENED,
		value,
	}
}

export function updateCard(object) {
	return {
		type: UPDATE_CARD,
		object,
	}
}

export function resetStartIndex() {
	return {
		type: RESET_START_INDEX,
	}
}

export function resetBooks() {
	return {
		type: RESET_BOOKS,
	}
}
