import React, { Suspense } from "react";
// import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Fallback from "../components/Fallback";

const NavDrawerWrapper = React.lazy(
  () => import("../components/NavDrawerWrapper")
);
const Home = React.lazy(() => import("./home"));
const Playground = React.lazy(() => import("./playground"));

function Routes() {
  return (
    <React.Fragment>
      <Suspense fallback={Fallback}>
        <Router>
          <NavDrawerWrapper>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/playground" exact>
                <Playground />
              </Route>
              <Redirect to="/" />
            </Switch>
          </NavDrawerWrapper>
        </Router>
      </Suspense>
    </React.Fragment>
  );
}

export default Routes;
