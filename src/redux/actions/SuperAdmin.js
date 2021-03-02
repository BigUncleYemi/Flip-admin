import superAdminServices from "redux/services/SuperAdminService";
import * as actionTypes from "../constants";
// import { history } from "../store";

const InviteAdminUser = data => async dispatch => {
  dispatch({
    type: actionTypes.INVITE_ADMIN_PENDING,
  })
  await superAdminServices
    .inviteAdmin(data)
    .then((response) => {
      dispatch({
        type: actionTypes.INVITE_ADMIN_SUCCESS,
        payload: response.data
      });
      dispatch(getAllAdminUserInvites({skip: 0, limit: 10}));
    })
    .catch(err => {
      dispatch({
        type: actionTypes.INVITE_ADMIN_FAILED,
        payload: err
      });
    });
  return;
}// done

export const inviteAdminUser = data => dispatch => {
  dispatch(InviteAdminUser(data));
};// done

const GetAllAdminUserInvites = data => async dispatch => {
  dispatch({
    type: actionTypes.GET_ALL_ADMIN_INVITE_PENDING,
  })
  await superAdminServices
    .getAllAdminInvite(data)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_ALL_ADMIN_INVITE_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_ALL_ADMIN_INVITE_FAILED,
        payload: err
      });
    });
  return;
}// done

export const getAllAdminUserInvites = data => dispatch => {
  dispatch(GetAllAdminUserInvites(data));
};// done

const DeleteAdminUserInvite = data => async dispatch => {
  dispatch({
    type: actionTypes.DEL_ADMIN_INVITE_PENDING,
  })
  await superAdminServices
    .deleteUserInvite(data)
    .then((response) => {
      dispatch({
        type: actionTypes.DEL_ADMIN_INVITE_SUCCESS,
        payload: response.data
      });
      dispatch(getAllAdminUserInvites({skip: 0, limit: 10}));
    })
    .catch(err => {
      dispatch({
        type: actionTypes.DEL_ADMIN_INVITE_FAILED,
        payload: err
      });
    });
  return;
}// done

export const deleteAdminUserInvite = data => dispatch => {
  dispatch(DeleteAdminUserInvite(data));
};// done
