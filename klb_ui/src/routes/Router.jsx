import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/Home.jsx";
import About from "../components/About.jsx";
import Contact from "../components/Contact.jsx";
import Signin from "../pages/Signin/Signin.jsx";

class Router extends React.Component {
   render() {
      return (
         <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/contact" component={Contact}></Route>
            <Route exact path="/signin" component={Signin}></Route>
         </Switch>
      );
   }
}

export default Router;
