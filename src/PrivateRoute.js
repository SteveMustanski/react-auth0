import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({ component: Component, auth, scopes, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        // redirect to login if not already logged in
        if (!auth.isAuthenticated()) return auth.login();

        // display if suer doesn't have the correct scope
        if (scopes.length > 0 && !auth.userHasScopes(scopes)) {
          return (
            <h1>
              Unauthorized -- You need to have the following scopes to view this
              page: {scopes.join(",")}.
            </h1>
          );
        }
        // render the component
        return <Component auth={auth} {...props} />;
      }}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  scopes: PropTypes.array
};

PrivateRoute.defaultProps = {
  scopes: []
};

export default PrivateRoute;
