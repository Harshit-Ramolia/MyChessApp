import React, { Suspense } from "react";
// import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Fallback from "../components/Fallback";
import NavDrawerWrapper from "../components/NavDrawerWrapper";

function Routes() {
  return (
    <React.Fragment>
      <Suspense fallback={Fallback}>
      <Router>
        <NavDrawerWrapper />
        <Switch>
          <Route path="/" exact>
            <Fallback />
          </Route>
          <Route path="/about" exact>
            About
          </Route>
        </Switch>
      </Router>
      </Suspense>
    </React.Fragment>
  );
}

export default Routes;
