import * as actionTypes from "../constants";
import authService from "../services/AuthService";
// import { history } from "../store";

const LoginUser = data => async dispatch => {
  dispatch({
    type: actionTypes.LOGIN_PENDING,
  })

  await authService
    .loginAccount(data)
    .then((response) => {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: response.data
      });
      localStorage.setItem(actionTypes.AUTH_TOKEN, response.data.token);
      localStorage.setItem(actionTypes.AUTH_TOKEN_ID, response.data.user.id);
      localStorage.setItem("type", response.data.user.type);
      window.location.href = "/app/home";
    })
    .catch(err => {
      dispatch({
        type: actionTypes.LOGIN_FAILED,
        payload: err
      });
    });
} // done

export const loginUser = data => dispatch => {
  dispatch(LoginUser(data));
}; // done

const RegisterUser = data => async dispatch => {
  dispatch({
    type: actionTypes.REGISTER_PENDING,
  })

  await authService
    .createAccount(data)
    .then((response) => {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        payload: response.data
      });
      localStorage.setItem(actionTypes.AUTH_TOKEN, response.data.token);
      localStorage.setItem(actionTypes.AUTH_TOKEN_ID, response.data.user.id);
      localStorage.setItem("type", response.data.user.type);
      window.location.href = "/app/home";
    })
    .catch(err => {
      dispatch({
        type: actionTypes.REGISTER_FAILED,
        payload: err
      });
    });
} // done

export const registerUser = data => dispatch => {
  dispatch(RegisterUser(data));
}; // done
