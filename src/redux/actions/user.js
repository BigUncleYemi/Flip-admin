import superAdminServices from "redux/services/SuperAdminService";
import * as actionTypes from "../constants";
import generalService from "../services/GeneralService";
// import { history } from "../store";

const GetUserDetailsById = userId => async dispatch => {
  dispatch({
    type: actionTypes.GET_USER_DETAILS_BY_ID_PENDING,
  })
  await generalService
    .getUserDetails(userId)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_USER_DETAILS_BY_ID_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_USER_DETAILS_BY_ID_FAILED,
        payload: err
      });
    });
  return;
}// done

export const getUserDetailsById = userId => dispatch => {
  dispatch(GetUserDetailsById(userId));
};// done

const GetAllUser = (params) => async dispatch => {
  dispatch({
    type: actionTypes.GET_ALL_USER_PENDING,
  })

  await generalService
    .getAllUsers(params)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_ALL_USER_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_ALL_USER_FAILED,
        payload: err
      });
    });
  return;
}// done

export const getAllUser = (params) => dispatch => {
  dispatch(GetAllUser(params));
};// done

const MakeUserAdmin = data => async dispatch => {
  dispatch({
    type: actionTypes.MAKE_USER_ADMIN_PENDING,
  })
  await superAdminServices
    .makeAdmin(data)
    .then((response) => {
      dispatch({
        type: actionTypes.MAKE_USER_ADMIN_SUCCESS,
        payload: response.data
      });
      dispatch(GetAllUser({skip: 0, limit: 10}));
    })
    .catch(err => {
      dispatch({
        type: actionTypes.MAKE_USER_ADMIN_FAILED,
        payload: err
      });
    });
  return;
}// done

export const makeUserAdmin = data => dispatch => {
  dispatch(MakeUserAdmin(data));
};// done

const RemoveUserAdmin = data => async dispatch => {
  dispatch({
    type: actionTypes.REMOVE_USER_ADMIN_PENDING,
  })
  await superAdminServices
    .makeAdmin(data)
    .then((response) => {
      dispatch({
        type: actionTypes.REMOVE_USER_ADMIN_SUCCESS,
        payload: response.data
      });
      dispatch(GetAllUser({skip: 0, limit: 10}));
    })
    .catch(err => {
      dispatch({
        type: actionTypes.REMOVE_USER_ADMIN_FAILED,
        payload: err
      });
    });
  return;
}// done

export const removeUserAdmin = data => dispatch => {
  dispatch(RemoveUserAdmin(data));
};// done


const LogOutUser = () => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT_PENDING,
  });

  await localStorage.clear();
  window.location.href = "/";

  dispatch({
    type: actionTypes.LOGIN_SUCCESS,
  });
}; // done

export const logOutUser = () => (dispatch) => {
  dispatch(LogOutUser());
}; // done


const GetCurrentUser = () => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_USER_CURRENT_BY_ID_PENDING,
  });

  await generalService
    .getUserDetails({ id: userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_USER_CURRENT_BY_ID_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_USER_CURRENT_BY_ID_FAILED,
        payload: err,
      });
    });
  return;
}; // done

export const getCurrentUser = () => (dispatch) => {
  dispatch(GetCurrentUser());
}; // done
