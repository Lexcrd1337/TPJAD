import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../services';

// eslint-disable-next-line import/prefer-default-export
export const PrivateRoute = ({ component: Component, ...rest }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Route
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    render={(props) => {
      const currentUser = authenticationService.currentUserValue;
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }

      // authorised so return component
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...props} />;
    }}
  />
);
