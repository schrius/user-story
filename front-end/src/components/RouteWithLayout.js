import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithLayout = props => {
    const { layout: Layout, component: Component, ...rest } = props;
    return (
      <Route
        {...rest}
        render={matchProps => (
          <React.Fragment>
            <Layout />
            <Component {...matchProps}
          /></React.Fragment> 
        )}
      />
    );
  };

  export default RouteWithLayout;