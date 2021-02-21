import giftCardService from "redux/services/GiftCardService";
import * as ActionTypes from "../constants/index";


const GetGiftCardCodes = (data) => async (dispatch) => {
  dispatch({
    type: ActionTypes.GET_CARD_CODES_PENDING,
  });

  await giftCardService
    .getGiftCardCodes(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_CARD_CODES_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.GET_CARD_CODES_FAILED,
        payload: err,
      });
    });
  return;
};

export const getGiftCardCodes = (data) => (dispatch) => {
  dispatch(GetGiftCardCodes(data));
};

const ApproveGiftCardTransaction = data => async dispatch => {
  dispatch({
    type: ActionTypes.APPROVE_GIFTCARD_TRANSACTION,
  })
  await giftCardService
    .approveGiftCardTransaction(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.APPROVE_GIFTCARD_TRANSACTION_SUCCESS,
        payload: response.data
      });
      dispatch(getAllGiftCardsTransactions({ skip: 0, limit: 5 }));
      dispatch(getNewGiftCardsTransactions({ skip: 0, limit: 5 }));
      dispatch(getGiftCardTransactionsById({transactionId: data.transactionId}));
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.APPROVE_GIFTCARD_TRANSACTION_FAILED,
        payload: err
      });
    });
    return;
}

export const approveGiftCardTransaction = data => async dispatch => {
  dispatch(ApproveGiftCardTransaction(data))
}

const DeclineGiftCardTransaction = data => async dispatch => {
  dispatch({
    type: ActionTypes.DECLINE_GIFTCARD_TRANSACTION,
  })

  await giftCardService
    .declineGiftCardTransaction(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.DECLINE_GIFTCARD_TRANSACTION_SUCCESS,
        payload: response.data
      });
      dispatch(getAllGiftCardsTransactions({ skip: 0, limit: 5 }));
      dispatch(getNewGiftCardsTransactions({ skip: 0, limit: 5 }));
      dispatch(getGiftCardTransactionsById({transactionId: data.transactionId}));
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.DECLINE_GIFTCARD_TRANSACTION_FAILED,
        payload: err
      });
    });
    return;
}

export const declineGiftCardTransaction = data => async dispatch => {
  dispatch(DeclineGiftCardTransaction(data))
}

const GetNewGiftCardsTransactions = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_NEW_GIFTCARD_TRANSACTIONS,
  })

  await giftCardService
    .getNewGiftCardTransactions(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_NEW_GIFTCARD_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_NEW_GIFTCARD_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getNewGiftCardsTransactions = data => async dispatch => {
  dispatch(GetNewGiftCardsTransactions(data))
}

const GetAllGiftCardsTransactions = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_ALL_GIFTCARD_TRANSACTIONS,
  })

  await giftCardService
    .getGiftCardTransactions(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_ALL_GIFTCARD_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_ALL_GIFTCARD_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getAllGiftCardsTransactions = data => async dispatch => {
  dispatch(GetAllGiftCardsTransactions(data))
}

const GetGiftCardTransactionsById = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_GIFTCARD_DETAILS,
  })

  await giftCardService
    .getGiftCardTransactionDetails(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_GIFTCARD_DETAILS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_GIFTCARD_DETAILS_FAILED,
        payload: err
      });
    });
    return;
}

export const getGiftCardTransactionsById = data => async dispatch => {
  dispatch(GetGiftCardTransactionsById(data))
}

const UpdateGiftCardsSettings = data => async dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_GIFTCARD_RATE,
  })

  await giftCardService
    .updateCardRate(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_GIFTCARD_RATE_SUCCESS,
        payload: response.data
      });
      dispatch(getGiftCardCodes({ cardCode: "all" }))
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.UPDATE_GIFTCARD_RATE_FAILED,
        payload: err
      });
    });
    return;
}

export const updateGiftCardsSettings = data => async dispatch => {
  dispatch(UpdateGiftCardsSettings(data))
}
