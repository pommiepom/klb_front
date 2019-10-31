import React from "react";
import { Switch, Route, Link } from "react-router-dom";

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
            <Route exact path="/" component={Home}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/page/:currentPage" component={Home}></Route>
            <Route path="/newpost" component={NewPost}></Route>
            <Route exact path="/search" component={Search}></Route>
            <Route path="/search/:params" component={SearchResult}></Route>
            <Route path="/post/:id" component={Post}></Route>
         </Switch>
      );
   }
}

export default Router;
