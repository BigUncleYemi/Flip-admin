import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  users: null,
  userById: null,
  updatedUser: false,
  addAdmin:null,
  removeAdmin:null,
}
const key = actionTypes.KEY;

const userReducer = (state = initState, action) => {
	switch (action.type) {
    case actionTypes.MAKE_USER_ADMIN_PENDING:
    case actionTypes.REMOVE_USER_ADMIN_PENDING:
    case actionTypes.GET_ALL_USER_PENDING:
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
    case actionTypes.GET_USER_DETAILS_BY_ID_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      })
      return {
        ...state,
        userById: null,
        loading: true,
        error: null,
      }
    case actionTypes.GET_USER_DETAILS_BY_ID_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        userById: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_ALL_USER_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.MAKE_USER_ADMIN_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        addAdmin: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.REMOVE_USER_ADMIN_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        removeAdmin: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_USER_DETAILS_BY_ID_FAILED:
    case actionTypes.MAKE_USER_ADMIN_FAILED:
    case actionTypes.REMOVE_USER_ADMIN_FAILED:
    case actionTypes.GET_ALL_USER_FAILED:
      return{
        ...state,
        loading: false,
        error: action.payload,
      }
		default:
			return state;
	}
}

export default userReducer;