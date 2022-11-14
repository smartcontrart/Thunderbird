import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

const PublicRoute = ({ component: Component, userLoggedIn, restricted, ...rest }) => (
  <Route
    {...rest}
      render={props => ( userLoggedIn && restricted ? <Redirect to="/save" /> :<Component {...props} /> 
    )}
  />
);

export default withRouter(PublicRoute);