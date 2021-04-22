import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  buyTransactions:null,
  sellTransactions:null,
  sendTransactions:null,
  p2pTransactions:null,
  // BTCTransaction: null,
  // BTCDetails: null,
  buyDetails:null,
  sellDetails:null,
  sendDetails:null,
  p2pDetails:null,
  BTCTransactionSettings: null,
  UpdateBTCTransactionSettings: null,
}
const key = actionTypes.KEY;

const BTCTransactionReducer = (state = initState, action) => {
	switch (action.type) {
    case actionTypes.GET_ALL_COINS_BUY_TRANSACTIONS_PENDING:
    case actionTypes.GET_ALL_COINS_SELL_TRANSACTIONS_PENDING:
    case actionTypes.GET_ALL_COINS_SEND_TRANSACTIONS_PENDING:
    case actionTypes.GET_ALL_COINS_P2P_TRANSACTIONS_PENDING:
    case actionTypes.UPDATE_COINS_SETTING_PENDING:
    case actionTypes.GET_COINS_SETTING_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      })
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.GET_COIN_DETAILS_BUY_TRANSACTIONS_PENDING:
    case actionTypes.GET_COIN_DETAILS_SELL_TRANSACTIONS_PENDING:
    case actionTypes.GET_COIN_DETAILS_SEND_TRANSACTIONS_PENDING:
    case actionTypes.GET_COIN_DETAILS_P2P_TRANSACTIONS_PENDING:
      notification.info({
        message: "loading.....",
        key,
      })
      return{
        ...state,
        // BTCDetails: null,
        loading: false,
        error: null,
      }
    case actionTypes.GET_COINS_SETTING_SUCCESS:
      notification.success({
        message: "Successful",
        duration: 0,
        key,
      })
      return {
        ...state,
        BTCTransactionSettings: action.payload.settings,
        loading: true,
        error: null,
      }
    case actionTypes.GET_ALL_COINS_BUY_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        buyTransactions: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_ALL_COINS_SELL_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        sellTransactions: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_ALL_COINS_SEND_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        sendTransactions: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_ALL_COINS_P2P_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        p2pTransactions: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_COIN_DETAILS_BUY_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        buyDetails: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_COIN_DETAILS_SELL_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        sellDetails: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_COIN_DETAILS_SEND_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        sendDetails: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_COIN_DETAILS_P2P_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        p2pDetails: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.UPDATE_COINS_SETTING_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        UpdateBTCTransactionSettings: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_COIN_DETAILS_BUY_TRANSACTIONS_FAILED:
    case actionTypes.GET_COIN_DETAILS_SELL_TRANSACTIONS_FAILED:
    case actionTypes.GET_COIN_DETAILS_SEND_TRANSACTIONS_FAILED:
    case actionTypes.GET_COIN_DETAILS_P2P_TRANSACTIONS_FAILED:
    case actionTypes.GET_ALL_COINS_BUY_TRANSACTIONS_FAILED:
    case actionTypes.GET_ALL_COINS_SELL_TRANSACTIONS_FAILED:
    case actionTypes.GET_ALL_COINS_SEND_TRANSACTIONS_FAILED:
    case actionTypes.GET_ALL_COINS_P2P_TRANSACTIONS_FAILED:
    case actionTypes.UPDATE_COINS_SETTING_FAILED:
    case actionTypes.GET_COINS_SETTING_FAILED:
      return{
        ...state,
        loading: false,
        error: action.payload,
      }
		default:
			return state;
	}
}

export default BTCTransactionReducer;