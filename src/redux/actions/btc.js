import btcService from "redux/services/BTCService";
import * as ActionTypes from "../constants/index";

const GetAllBTCTransactions = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_ALL_BTC_TRANSACTIONS,
  })

  await btcService
    .getAllBTCTransaction(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_ALL_BTC_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_ALL_BTC_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getAllBTCTransactions = data => async dispatch => {
  dispatch(GetAllBTCTransactions(data))
}

const GetBTCTransactionsById = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_BTC_DETAILS,
  })

  await btcService
    .getASingleBTCTransaction(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_BTC_DETAILS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_BTC_DETAILS_FAILED,
        payload: err
      });
    });
    return;
}

export const getBTCTransactionsById = data => async dispatch => {
  dispatch(GetBTCTransactionsById(data))
}

const UpdateBTCSettings = data => async dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_BTC_SETTING,
  })

  await btcService
    .updateBTCSettings(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_BTC_SETTING_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.UPDATE_BTC_SETTING_FAILED,
        payload: err
      });
    });
    return;
}

export const updateBTCSettings = data => async dispatch => {
  dispatch(UpdateBTCSettings(data))
}


const GetBTCSettings = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_BTC_SETTING,
  })

  await btcService
    .getBTCSettings(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_BTC_SETTING_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_BTC_SETTING_FAILED,
        payload: err
      });
    });
    return;
}

export const getBTCSettings = data => async dispatch => {
  dispatch(GetBTCSettings(data))
}
