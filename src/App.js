import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import Home from "./pages/Home";
import Locked from "./pages/Locked";
import Dashboard from "./pages/Dashboard";
import { oktaConfig } from "./lib/oktaConfig";
const CALLBACK_PATH = "/login/callback";

const oktaAuth = new OktaAuth(oktaConfig);

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} >
      
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path={CALLBACK_PATH} exact component={LoginCallback} />
        <SecureRoute path="/locked" exact component={Locked} />
        <SecureRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </Security>
  );
};

export default App;
