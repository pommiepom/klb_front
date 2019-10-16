import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home/Home.jsx";
import Post from "../pages/Post/Post.jsx";
import Search from "../pages/Search/Search.jsx";
import SearchResult from "../pages/SearchResult/SearchResult.jsx";
import NewPost from "../pages/NewPost/NewPost.jsx";
import Profile from "../pages/Profile/Profile.jsx";

class Router extends React.Component {
	render() {
		return (
			<Switch>
				{/* <Route exact path="/page/1" component={Home}></Route> */}
				<Route exact path="/profile" component={Profile}></Route>
				<Route exact path="/page/:currentPage" component={Home}></Route>
				<Route exact path="/newpost" component={NewPost}></Route>
				<Route exact path="/search/:params" component={SearchResult}></Route>
				<Route exact path="/search" component={Search}></Route>
				<Route exact path="/post/:id" component={Post}></Route>
			</Switch>
		);
	}
}

export default Router;