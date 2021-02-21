import dashboardService from "redux/services/DashboardService";
import * as ActionTypes from "../constants/index";

//Dashboard
const GetDashboardData = () => async dispatch => {
  dispatch({
    type: ActionTypes.GET_DASHBOARD_DATA,
  })

  await dashboardService
    .getDashboardStat()
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_DASHBOARD_DATA_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_DASHBOARD_DATA_FAILED,
        payload: err
      });
    });
    return;
}

export const getDashboardData = () => dispatch => {
  dispatch(GetDashboardData());
};

// export function getDashboardData() {
//   return {
//     type: ActionTypes.GET_DASHBOARD_DATA,
//   };
// }

// export function getDashboardDataSuccess(payload) {
//   return {
//     type: ActionTypes.GET_DASHBOARD_DATA_SUCCESS,
//     payload,
//   };
// }

// // GiftCard

// export function approveGiftCardTransaction(payload) {
//   return {
//     type: ActionTypes.APPROVE_GIFTCARD_TRANSACTION,
//     payload
//   };
// }

// export function approveGiftCardTransactionSuccess(payload) {
//   return {
//     type: ActionTypes.APPROVE_GIFTCARD_TRANSACTION_SUCCESS,
//     payload,
//   };
// }

// export function declineGiftCardTransaction(payload) {
//   return {
//     type: ActionTypes.DECLINE_GIFTCARD_TRANSACTION,
//     payload,
//   };
// }

// export function declineGiftCardTransactionSuccess(payload) {
//   return {
//     type: ActionTypes.DECLINE_GIFTCARD_TRANSACTION_SUCCESS,
//     payload,
//   };
// }

// export function getNewGiftCardTransactions(payload) {
//   return {
//     type: ActionTypes.GET_NEW_GIFTCARD_TRANSACTIONS,
//     payload,
//   };
// }

// export function getNewGiftCardTransactionsSuccess(payload) {
//   return {
//     type: ActionTypes.GET_NEW_GIFTCARD_TRANSACTIONS_SUCCESS,
//     payload,
//   };
// }

// export function getAllGiftCardTransactions(payload) {
//   return {
//     type: ActionTypes.GET_ALL_GIFTCARD_TRANSACTIONS,
//     payload,
//   };
// }

// export function getAllGiftCardTransactionsSuccess(payload) {
//   return {
//     type: ActionTypes.GET_ALL_GIFTCARD_TRANSACTIONS_SUCCESS,
//     payload,
//   };
// }

// export function updateGiftCardRate(payload) {
//   return {
//     type: ActionTypes.UPDATE_GIFTCARD_RATE,
//     payload,
//   };
// }

// export function updateGiftCardRateSuccess(payload) {
//   return {
//     type: ActionTypes.UPDATE_GIFTCARD_RATE_SUCCESS,
//     payload,
//   };
// }

// // Withdrawal

// export function approveWithdrawalTransaction(payload) {
//   return {
//     type: ActionTypes.APPROVE_WITHDRAWAL_TRANSACTION,
//     payload,
//   };
// }

// export function approveWithdrawalTransactionSuccess(payload) {
//   return {
//     type: ActionTypes.APPROVE_WITHDRAWAL_TRANSACTION_SUCCESS,
//     payload,
//   };
// }

// export function declineWithdrawalTransaction(payload) {
//   return {
//     type: ActionTypes.DECLINE_WITHDRAWAL_TRANSACTION,
//     payload,
//   };
// }

// export function declineWithdrawalTransactionSuccess(payload) {
//   return {
//     type: ActionTypes.DECLINE_WITHDRAWAL_TRANSACTION_SUCCESS,
//     payload,
//   };
// }

// export function getNewWithdrawalsTransactions(payload) {
//   return {
//     type: ActionTypes.GET_NEW_WITHDRAWAL_TRANSACTIONS,
//     payload,
//   };
// }

// export function getNewWithdrawalsTransactionsSuccess(payload) {
//   return {
//     type: ActionTypes.GET_NEW_WITHDRAWAL_TRANSACTIONS_SUCCESS,
//     payload,
//   };
// }

// export function getAllWithdrawalsTransactions(payload) {
//   return {
//     type: ActionTypes.GET_ALL_WITHDRAWAL_TRANSACTIONS,
//     payload,
//   };
// }

// export function getAllWithdrawalsTransactionsSuccess(payload) {
//   return {
//     type: ActionTypes.GET_ALL_WITHDRAWAL_TRANSACTIONS_SUCCESS,
//     payload,
//   };
// }

// export function updateWithdrawalsSettings(payload) {
//   return {
//     type: ActionTypes.UPDATE_WITHDRAWAL_SETTINGS,
//     payload,
//   };
// }

// export function updateWithdrawalsSettingsSuccess(payload) {
//   return {
//     type: ActionTypes.UPDATE_WITHDRAWAL_SETTINGS_SUCCESS,
//     payload,
//   };
// }
