import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  token: localStorage.getItem(actionTypes.AUTH_TOKEN),
  userId: localStorage.getItem(actionTypes.AUTH_TOKEN_ID),
  user: null,
  updatedUser: false,
  updatedUserBank: false,
  updatedTransactionPin: false,
}
const key = actionTypes.KEY;

const authReducer = (state = initState, action) => {
	switch (action.type) {
    case actionTypes.LOGIN_PENDING:
    case actionTypes.REGISTER_PENDING:
    case actionTypes.GET_USER_CURRENT_BY_ID_PENDING:
    case actionTypes.GET_USER_DETAILS_BY_ID_PENDING:
    case actionTypes.CHANGE_USER_PASSWORD_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      })
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.GET_USER_CURRENT_BY_ID_SUCCESS:
    case actionTypes.GET_USER_DETAILS_BY_ID_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_USER_DETAILS_BY_ID_FAILED:
    case actionTypes.GET_USER_CURRENT_BY_ID_FAILED:
    case actionTypes.REGISTER_FAILED:
    case actionTypes.LOGIN_FAILED:
      return{
        ...state,
        loading: false,
        error: action.payload,
      }
		default:
			return state;
	}
}

export default authReducer;