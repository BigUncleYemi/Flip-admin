import withdrawalService from "redux/services/WithdrawalsService";
import * as ActionTypes from "../constants/index";


const ApproveWithdrawalTransaction = data => async dispatch => {
  dispatch({
    type: ActionTypes.APPROVE_WITHDRAWAL_TRANSACTION,
  })
  await withdrawalService
    .approveWithdrawalTransaction(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.APPROVE_WITHDRAWAL_TRANSACTION_SUCCESS,
        payload: response.data
      });
      dispatch(getAllWithdrawalsTransactions({ skip: 0, limit: 10 }));
      dispatch(getNewWithdrawalsTransactions({ skip: 0, limit: 10 }));
      dispatch(getWithdrawalTransactionsById({transactionId: data.transactionId}));
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.APPROVE_WITHDRAWAL_TRANSACTION_FAILED,
        payload: err
      });
    });
    return;
}

export const approveWithdrawalTransaction = data => async dispatch => {
  dispatch(ApproveWithdrawalTransaction(data))
}

const DeclineWithdrawalTransaction = data => async dispatch => {
  dispatch({
    type: ActionTypes.DECLINE_WITHDRAWAL_TRANSACTION,
  })

  await withdrawalService
    .declineWithdrawalTransaction(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.DECLINE_WITHDRAWAL_TRANSACTION_SUCCESS,
        payload: response.data
      });
      dispatch(getAllWithdrawalsTransactions({ skip: 0, limit: 10 }));
      dispatch(getNewWithdrawalsTransactions({ skip: 0, limit: 10 }));
      dispatch(getWithdrawalTransactionsById({transactionId: data.transactionId}));
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.DECLINE_WITHDRAWAL_TRANSACTION_FAILED,
        payload: err
      });
    });
    return;
}

export const declineWithdrawalTransaction = data => async dispatch => {
  dispatch(DeclineWithdrawalTransaction(data))
}

const GetNewWithdrawalsTransactions = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_NEW_WITHDRAWAL_TRANSACTIONS,
  })

  await withdrawalService
    .getNewWithdrawalTransactions(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_NEW_WITHDRAWAL_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_NEW_WITHDRAWAL_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getNewWithdrawalsTransactions = data => async dispatch => {
  dispatch(GetNewWithdrawalsTransactions(data))
}

const GetAllWithdrawalsTransactions = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_ALL_WITHDRAWAL_TRANSACTIONS,
  })

  await withdrawalService
    .getWithdrawalTransactions(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_ALL_WITHDRAWAL_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_ALL_WITHDRAWAL_TRANSACTIONS_FAILED,
        payload: err
      });
    });
    return;
}

export const getAllWithdrawalsTransactions = data => async dispatch => {
  dispatch(GetAllWithdrawalsTransactions(data))
}

const GetWithdrawalTransactionsById = data => async dispatch => {
  dispatch({
    type: ActionTypes.GET_WITHDRAWAL_DETAILS,
  })

  await withdrawalService
    .getWithdrawalTransactionDetails(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_WITHDRAWAL_DETAILS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_WITHDRAWAL_DETAILS_FAILED,
        payload: err
      });
    });
    return;
}

export const getWithdrawalTransactionsById = data => async dispatch => {
  dispatch(GetWithdrawalTransactionsById(data))
}

const UpdateWithdrawalsSettings = data => async dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_WITHDRAWAL_SETTINGS,
  })

  await withdrawalService
    .updateWithdrawalSettings(data)
    .then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_WITHDRAWAL_SETTINGS_SUCCESS,
        payload: response.data
      });
      dispatch(getWithdrawalsSettings());
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.UPDATE_WITHDRAWAL_SETTINGS_FAILED,
        payload: err
      });
    });
    return;
}

export const updateWithdrawalsSettings = data => async dispatch => {
  dispatch(UpdateWithdrawalsSettings(data))
}

const GetWithdrawalsSettings = () => async dispatch => {
  dispatch({
    type: ActionTypes.GET_WITHDRAWAL_SETTINGS,
  })

  await withdrawalService
    .getWithdrawalSettings()
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_WITHDRAWAL_SETTINGS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_WITHDRAWAL_SETTINGS_FAILED,
        payload: err
      });
    });
    return;
}

export const getWithdrawalsSettings = () => async dispatch => {
  dispatch(GetWithdrawalsSettings())
}
