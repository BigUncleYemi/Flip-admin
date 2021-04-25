import dashboardService from "redux/services/DashboardService";
import generalService from "redux/services/GeneralService";
import * as ActionTypes from "../constants/index";

//Dashboard
const GetDashboardData = () => async (dispatch) => {
  let token = localStorage.getItem(ActionTypes.AUTH_TOKEN);
  console.log("token3", token);
  dispatch({
    type: ActionTypes.GET_DASHBOARD_DATA,
  });

  await dashboardService
    .getDashboardStat({ token })
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_DASHBOARD_DATA_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log("respinse", err);
      dispatch({
        type: ActionTypes.GET_DASHBOARD_DATA_FAILED,
        payload: err,
      });
    });
  // return;
};

export const getDashboardData = () => (dispatch) => {
  dispatch(GetDashboardData());
};

const GetWalletBalances = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.GET_WALLET_BALANCES_DATA_PENDING,
  });

  await dashboardService
    .getWalletBalances()
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_WALLET_BALANCES_DATA_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log("respinse", err);
      dispatch({
        type: ActionTypes.GET_WALLET_BALANCES_DATA_FAILED,
        payload: err,
      });
    });
  // return;
};

export const getWalletBalances = () => (dispatch) => {
  dispatch(GetWalletBalances());
};

const GetValidCoins = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.GET_VALID_COINS_PENDING,
  });
  await generalService
    .getValidCoins()
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_VALID_COINS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.GET_VALID_COINS_FAILED,
        payload: err,
      });
    });
};
export const getValidCoins = () => (dispatch) => {
  dispatch(GetValidCoins());
};

const GetValidFiats = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.GET_VALID_FIATS_PENDING,
  });
  await generalService
    .getValidFiats()
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_VALID_FIATS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.GET_VALID_FIATS_FAILED,
        payload: err,
      });
    });
};
export const getValidFiats = () => (dispatch) => {
  dispatch(GetValidFiats());
};
