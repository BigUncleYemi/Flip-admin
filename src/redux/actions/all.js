import dashboardService from "redux/services/DashboardService";
import * as ActionTypes from "../constants/index";

//Dashboard
const GetDashboardData = () => async (dispatch) => {
  let token = localStorage.getItem(ActionTypes.AUTH_TOKEN)
  console.log('token3',token)
  dispatch({
    type: ActionTypes.GET_DASHBOARD_DATA,
  })

  await dashboardService
    .getDashboardStat({token})
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_DASHBOARD_DATA_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      console.log('respinse',err)
      dispatch({
        type: ActionTypes.GET_DASHBOARD_DATA_FAILED,
        payload: err
      });
    });
    // return;
}

export const getDashboardData = () => dispatch => {
  dispatch(GetDashboardData())
}

const GetWalletBalances = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.GET_WALLET_BALANCES_DATA_PENDING,
  })

  await dashboardService
    .getWalletBalances()
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_WALLET_BALANCES_DATA_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      console.log('respinse',err)
      dispatch({
        type: ActionTypes.GET_WALLET_BALANCES_DATA_FAILED,
        payload: err
      });
    });
    // return;
}

export const getWalletBalances = () => dispatch => {
  dispatch(GetWalletBalances())
}