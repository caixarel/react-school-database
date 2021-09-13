import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../Context';

//private route component to prevent users who are not logged in to acess certain pages that requires a logged user
const PrivateRoute=({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props=>context.state.authenticatedUser? (
            <Component {...props} />
          ):(
            <Redirect to ={{
              pathname:'/signin',
              state:{from:props.location}
            }}/>
          )
          }
        />
      )}
    </Consumer>
  );
};
export default PrivateRoute;