import React, { Suspense } from "react";
// import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Fallback from "../components/Fallback";

import NavDrawerCombined from "../components/NavDrawerCombined";

const NavDrawerWrapper = React.lazy(() => import("../components/Wrapper"));
const Home = React.lazy(() => import("./home"));
const Playground = React.lazy(() => import("./playground"));
const Game = React.lazy(() => import("./game"));
const Invitations = React.lazy(() => import("./invitations"));

function Routes() {
  return (
    <React.Fragment>
      <Router>
        <NavDrawerCombined />
        <Suspense fallback={Fallback}>
          <NavDrawerWrapper>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/playground" exact>
                <Playground />
              </Route>
              <Route path="/game" exact>
                <Game />
              </Route>
              <Route path="/invitations" exact>
                <Invitations />
              </Route>
              <Redirect to="/" />
            </Switch>
          </NavDrawerWrapper>
        </Suspense>
      </Router>
    </React.Fragment>
  );
}

export default Routes;
