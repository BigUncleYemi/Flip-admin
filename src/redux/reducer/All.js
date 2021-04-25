import * as ActionTypes from "../constants/index";
import { notification } from "antd";

const initialState = {
  getDashboardData: null,
  getWalletData: null,
  approveGiftCardTransaction: null,
  declineGiftCardTransaction: null,
  getNewGiftCardTransactions: null,
  getAllGiftCardTransactions: null,
  updateGiftCardRate: null,
  approveWithdrawalTransaction: null,
  declineWithdrawalTransaction: null,
  getNewWithdrawalsTransactions: null,
  getAllWithdrawalsTransactions: null,
  updateWithdrawalsSettings: null,
  validFiats:null,
  validCoins:null,
  loading:false,
  error:null
};

const key = ActionTypes.KEY;

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_VALID_COINS_PENDING:
    case ActionTypes.GET_VALID_FIATS_PENDING:
      notification.info({
        message:"Loading",
        key,
      })
      return {
        ...state,
        loading:true,
        error:null
      }
    case ActionTypes.GET_DASHBOARD_DATA_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        getDashboardData: action.payload,
      };
    case ActionTypes.GET_VALID_COINS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        loading:false,
        validCoins: action.payload,
      };
    case ActionTypes.GET_VALID_FIATS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        loading:false,
        validFiats: action.payload,
      };
    case ActionTypes.GET_WALLET_BALANCES_DATA_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        getWalletData: action.payload,
      };

    case ActionTypes.GET_DASHBOARD_DATA:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      })
      return {
        ...state,
      }
    case ActionTypes.APPROVE_GIFTCARD_TRANSACTION_SUCCESS:
      return{
        ...state,
        approveGiftCardTransaction: action.payload,
      };
    case ActionTypes.DECLINE_GIFTCARD_TRANSACTION_SUCCESS:
      return{
        ...state,
        declineGiftCardTransaction: action.payload,
      };
    case ActionTypes.GET_NEW_GIFTCARD_TRANSACTIONS_SUCCESS:
      return{
        ...state,
        getNewGiftCardTransactions: action.payload,
      };
    case ActionTypes.GET_ALL_GIFTCARD_TRANSACTIONS_SUCCESS:
      return{
        ...state,
        getAllGiftCardTransactions: action.payload,
      };
    case ActionTypes.UPDATE_GIFTCARD_RATE_SUCCESS:
      return{
        ...state,
        updateGiftCardRate: action.payload,
      };
    case ActionTypes.APPROVE_WITHDRAWAL_TRANSACTION_SUCCESS:
      return{
        ...state,
        approveWithdrawalTransaction: action.payload,
      };
    case ActionTypes.DECLINE_WITHDRAWAL_TRANSACTION_SUCCESS:
      return{
        ...state,
        declineWithdrawalTransaction: action.payload,
      };
    case ActionTypes.GET_NEW_WITHDRAWAL_TRANSACTIONS_SUCCESS:
      return{
        ...state,
        getNewWithdrawalsTransactions: action.payload,
      };
    case ActionTypes.GET_ALL_WITHDRAWAL_TRANSACTIONS_SUCCESS:
      return{
        ...state,
        getAllWithdrawalsTransactions: action.payload,
      };
    case ActionTypes.UPDATE_WITHDRAWAL_SETTINGS_SUCCESS:
      return{
        ...state,
        updateWithdrawalsSettings: action.payload,
      };
    case ActionTypes.GET_VALID_FIATS_FAILED:
    case ActionTypes.GET_VALID_COINS_FAILED:
    case ActionTypes.GET_WALLET_BALANCES_DATA_FAILED:
      notification.error({
        message: "Failed",
        key,
      })
      return state
    default:
      return state;
  }
}