import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getSession } from "./helper";
import { AUTH_TOKEN } from '../redux/constants'
import { AUTH_PREFIX_PATH } from 'configs/AppConfig'

export const PrivateRoute = ({ allow, component: Component, ...rest }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return (
    <Route
      {...rest}
      exact
      render={props =>
        token && getSession(token) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: AUTH_PREFIX_PATH, state: { from: props.location } }} />
        )
      }
    />
  );
};
