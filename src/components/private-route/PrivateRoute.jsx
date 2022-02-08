import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, auth, ...rest }) => (
   <Route
      {...rest}
      render={({ location }) =>
         auth ? (
            children
         ) : (
            <Redirect
               to={{
                  pathname: "/sign-in",
                  state: { from: location }
               }}
            />
         )
      }
   />
);

PrivateRoute.propTypes = {
   children: PropTypes.element.isRequired,
   auth: PropTypes.bool.isRequired
};

export default PrivateRoute;
