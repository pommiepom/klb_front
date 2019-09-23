import React from "react";
import { Switch, Route } from "react-router-dom";

import Signin from "./pages/Signin/index.jsx";
import Page from "./pages/Page.jsx";

class App extends React.Component {
   render() {
      return (
         <Switch>
            <Route exact path="/signin" component={Signin}></Route>
            <Route path="/" component={Page}></Route>
         </Switch>
      );
   }
}

export default App;
