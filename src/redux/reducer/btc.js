import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  BTCTransaction: null,
  BTCDetails: null,
  BTCTransactionSettings: null,
  UpdateBTCTransactionSettings: null,
}
const key = actionTypes.KEY;

const BTCTransactionReducer = (state = initState, action) => {
	switch (action.type) {
    case actionTypes.GET_ALL_BTC_TRANSACTIONS:
    case actionTypes.UPDATE_BTC_SETTING:
    case actionTypes.GET_BTC_SETTING:
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
    case actionTypes.GET_BTC_DETAILS:
      notification.info({
        message: "loading.....",
        key,
      })
      return{
        ...state,
        BTCDetails: null,
        loading: false,
        error: null,
      }
    case actionTypes.GET_BTC_SETTING_SUCCESS:
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
    case actionTypes.GET_ALL_BTC_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        BTCTransaction: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_BTC_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        BTCDetails: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.UPDATE_BTC_SETTING_SUCCESS:
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
    case actionTypes.GET_ALL_BTC_TRANSACTIONS_FAILED:
    case actionTypes.GET_BTC_DETAILS_FAILED:
    case actionTypes.UPDATE_BTC_SETTING_FAILED:
    case actionTypes.GET_BTC_SETTING_FAILED:
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