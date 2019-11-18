import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home/Home.jsx";
import Post from "../pages/Post/Post.jsx";
import EditPost from "../pages/EditPost/EditPost.jsx";
import Search from "../pages/Search/Search.jsx";
import SearchResult from "../pages/SearchResult/SearchResult.jsx";
import NewPost from "../pages/NewPost/NewPost.jsx";
import ReportedPost from "../pages/ReportedPost/ReportedPost.jsx";
import Profile from "../pages/Profile/Profile.jsx";

class Router extends React.Component {
   render() {
      return (
         <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/page/:currentPage" component={Home}></Route>
            <Route path="/newpost" component={NewPost}></Route>
            <Route path="/report" component={ReportedPost}></Route>
            <Route exact path="/search" component={Search}></Route>
            <Route
               path="/search/title=:title?&category=:category?&fromUser=:fromUser?&fromDate=:fromDate?&toDate=:toDate?"
               component={SearchResult}
            ></Route>
            <Route path="/post/:id/edit" component={EditPost}></Route>
            <Route path="/post/:id" component={Post}></Route>
         </Switch>
      );
   }
}

export default Router;
