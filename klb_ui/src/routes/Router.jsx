import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home/Home.jsx";
import Post from "../pages/Post/Post.jsx";
import Search from "../pages/Search/Search.jsx";
import NewPost from "../pages/NewPost/NewPost.jsx";

class Router extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route exact path="/newpost" component={NewPost}></Route>
				<Route exact path="/search" component={Search}></Route>
				<Route exact path="/post/:id" component={Post}></Route>
			</Switch>
		);
	}
}

export default Router;