import React from 'react'
import Header from './components/Header/Header'
import './App.css'
import List from './components/List/List'

function App(props) {
	return (
		<div className='app'>
			<Header />
			<List />
		</div>
	)
}

export default App
