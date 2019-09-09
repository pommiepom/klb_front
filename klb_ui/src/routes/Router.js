import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Components/Home'
import About from '../Components/About'
import Contact from '../Components/Contact'

class Router extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={Home}></Route>
				<Route exact path='/about' component={About}></Route>
				<Route exact path='/contact' component={Contact}></Route>
			</Switch>
		)
	}
}

export default Router