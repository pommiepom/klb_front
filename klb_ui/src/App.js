import React from 'react';
import './App.css';
import Navigation from './Components/Navigation'
import Router from './routes/Router'

class App extends React.Component {
	render() {
		return (
			<div className='app'>
				<h1>React Router Demo</h1>
				<Navigation />
				<Router />
			</div> 
		)
	}
}

export default App;
