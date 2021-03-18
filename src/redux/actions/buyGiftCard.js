import buyGiftCoinService from "redux/services/BuyGiftCoinService";
import * as ActionTypes from "../constants/index";

const GetNewBuyGiftCardTransactions = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_NEW_BUY_GIFT_CARD_TRANSACTIONS,
  })

  await buyGiftCoinService
    .getNewBuyGiftCardTransaction(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_NEW_BUY_GIFT_CARD_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_NEW_BUY_GIFT_CARD_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getNewBuyGiftCardTransactions = data => async dispatch => {
  dispatch(GetNewBuyGiftCardTransactions(data))
}

const GetAllBuyGiftCardTransactions = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_ALL_BUY_GIFT_CARD_TRANSACTIONS,
  })

  await buyGiftCoinService
    .getAllBuyGiftCardTransaction(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_ALL_BUY_GIFT_CARD_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_ALL_BUY_GIFT_CARD_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getAllBuyGiftCardTransactions = data => async dispatch => {
  dispatch(GetAllBuyGiftCardTransactions(data))
}

const GetBuyGiftCardTransactionsById = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_BUY_GIFT_CARD_DETAILS,
  })

  await buyGiftCoinService
    .getASingleBuyGiftCardTransaction(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_BUY_GIFT_CARD_DETAILS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_BUY_GIFT_CARD_DETAILS_FAILED,
        payload: err
      });
    });
    return;
}

export const getBuyGiftCardTransactionsById = data => async dispatch => {
  dispatch(GetBuyGiftCardTransactionsById(data))
}

const UpdateBuyGiftCardSettings = data => async dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_BUY_GIFT_CARD_SETTING,
  })
  console.log(data)
  await buyGiftCoinService
    .updateBuyGiftCardSettings(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_BUY_GIFT_CARD_SETTING_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.UPDATE_BUY_GIFT_CARD_SETTING_FAILED,
        payload: err
      });
    });
    return;
}

export const updateBuyGiftCardSettings = data => async dispatch => {
  dispatch(UpdateBuyGiftCardSettings(data))
}


const GetBuyGiftCardSettings = () => async dispatch => {
  dispatch({
    type: ActionTypes.GET_BUY_GIFT_CARD_SETTING,
  })

  await buyGiftCoinService
    .getBuyGiftCardSettings()
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_BUY_GIFT_CARD_SETTING_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_BUY_GIFT_CARD_SETTING_FAILED,
        payload: err
      });
    });
    return;
}

export const getBuyGiftCardSettings = () => async dispatch => {
  dispatch(GetBuyGiftCardSettings())
}
