import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Address from "./pages/Address";
import Logout from "./pages/Logout";
import Perfil from "./pages/Perfil";
import Interest from "./pages/Interest";
import Signature from "./pages/Signature";
import History from "./pages/History";

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);
const IndexRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Redirect
            to={{ pathname: `/dashboard`, state: { from: props.location } }}
          />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <IndexRoute exact path="/" />

      <AuthRoute path="/signin" component={SignIn} />

      <Route path="/undefined">
        <Redirect to="/" />
      </Route>

      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/address" component={Address} />
      <PrivateRoute path="/perfil" component={Perfil} />
      <PrivateRoute path="/interest" component={Interest} />
      <PrivateRoute path="/signature" component={Signature} />
      <PrivateRoute path="/history" component={History} />

      <PrivateRoute path="/logout" component={Logout} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
