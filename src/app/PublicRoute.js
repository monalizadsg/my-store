import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { isAuthenticated } from "../auth/authService";
import AppContainer from "./AppContainer";

const isAuthenticated = false;

const PublicRoute = ({ component: Component, ...rest }) => {
  if (!Component) return null;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Redirect to='/' />
        ) : (
          <AppContainer>
            <Component {...props} />
          </AppContainer>
        )
      }
    />
  );
};

export default PublicRoute;
