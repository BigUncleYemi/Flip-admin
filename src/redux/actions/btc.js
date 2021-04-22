import btcService from "redux/services/BTCService";
import * as ActionTypes from "../constants/index";

const GetBuyCoinTransactions = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_ALL_COINS_BUY_TRANSACTIONS_PENDING,
  })

  await btcService
    .getBuyCoinTransactions(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_ALL_COINS_BUY_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_ALL_COINS_BUY_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getBuyCoinTransactions = data => async dispatch => {
  dispatch(GetBuyCoinTransactions(data))
}

const GetSellCoinTransactions = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_ALL_COINS_SELL_TRANSACTIONS_PENDING,
  })

  await btcService
    .getSellCoinTransactions(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_ALL_COINS_SELL_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_ALL_COINS_SELL_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getSellCoinTransactions = data => async dispatch => {
  dispatch(GetSellCoinTransactions(data))
}

const GetSendCoinTransactions = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_ALL_COINS_SEND_TRANSACTIONS_PENDING,
  })

  await btcService
    .getSendCoinTransactions(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_ALL_COINS_SEND_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_ALL_COINS_SEND_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getSendCoinTransactions = data => async dispatch => {
  dispatch(GetSendCoinTransactions(data))
}

const GetP2PCoinTransactions = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_ALL_COINS_P2P_TRANSACTIONS_PENDING,
  })

  await btcService
    .getP2PCoinTransactions(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_ALL_COINS_P2P_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_ALL_COINS_P2P_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getP2PCoinTransactions = data => async dispatch => {
  dispatch(GetP2PCoinTransactions(data))
}

const GetBuyCoinTransactionsById = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_COIN_DETAILS_BUY_TRANSACTIONS_PENDING,
  })

  await btcService
    .getBuyCoinTransactionDetails(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_COIN_DETAILS_BUY_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_COIN_DETAILS_BUY_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getBuyCoinTransactionsById = data => async dispatch => {
  dispatch(GetBuyCoinTransactionsById(data))
}

const GetSellCoinTransactionsById = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_COIN_DETAILS_SELL_TRANSACTIONS_PENDING,
  })

  await btcService
    .getSellCoinTransactionDetails(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_COIN_DETAILS_SELL_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_COIN_DETAILS_SELL_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getSellCoinTransactionsById = data => async dispatch => {
  dispatch(GetSellCoinTransactionsById(data))
}

const GetSendCoinTransactionsById = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_COIN_DETAILS_SEND_TRANSACTIONS_PENDING,
  })

  await btcService
    .getSendCoinTransactionDetails(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_COIN_DETAILS_SEND_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_COIN_DETAILS_SEND_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getSendCoinTransactionsById = data => async dispatch => {
  dispatch(GetSendCoinTransactionsById(data))
}

const GetP2PCoinTransactionsById = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_COIN_DETAILS_P2P_TRANSACTIONS_PENDING,
  })

  await btcService
    .getP2PCoinTransactionDetails(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_COIN_DETAILS_P2P_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_COIN_DETAILS_P2P_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getP2PCoinTransactionsById = data => async dispatch => {
  dispatch(GetP2PCoinTransactionsById(data))
}

const UpdateBTCSettings = data => async dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_COINS_SETTING_PENDING,
  })

  await btcService
    .updateBTCSettings(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_COINS_SETTING_SUCCESS,
        payload: response.data
      });
      dispatch(getBTCSettings());
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.UPDATE_COINS_SETTING_FAILED,
        payload: err
      });
    });
    return;
}

export const updateBTCSettings = data => async dispatch => {
  dispatch(UpdateBTCSettings(data))
}


const GetBTCSettings = () => async dispatch => {
  dispatch({
    type: ActionTypes.GET_COINS_SETTING_PENDING,
  })

  await btcService
    .getBTCSettings()
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_COINS_SETTING_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_COINS_SETTING_FAILED,
        payload: err
      });
    });
    return;
}

export const getBTCSettings = () => async dispatch => {
  dispatch(GetBTCSettings())
}
