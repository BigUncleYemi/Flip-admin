import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  admins: null,
  inviteAdminUser: false,
  deleteAdminUser: false,
}
const key = actionTypes.KEY;

const superAdminReducer = (state = initState, action) => {
	switch (action.type) {
    case actionTypes.DEL_ADMIN_INVITE_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      })
      return {
        ...state,
        deleteAdminUser: false,
        loading: true,
        error: null,
      }
    case actionTypes.INVITE_ADMIN_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      })
      return {
        ...state,
        inviteAdminUser: false,
        loading: true,
        error: null,
      }
    case actionTypes.GET_ALL_ADMIN_INVITE_PENDING:
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
    case actionTypes.DEL_ADMIN_INVITE_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        deleteAdminUser: true,
        loading: false,
        error: null,
      }
    case actionTypes.INVITE_ADMIN_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        inviteAdminUser: true,
        loading: false,
        error: null,
      }
    case actionTypes.GET_ALL_ADMIN_INVITE_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        admins: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.INVITE_ADMIN_FAILED:
    case actionTypes.GET_ALL_ADMIN_INVITE_FAILED:
    case actionTypes.DEL_ADMIN_INVITE_FAILED:
      return{
        ...state,
        loading: false,
        error: action.payload,
      }
		default:
			return state;
	}
}

export default superAdminReducer;