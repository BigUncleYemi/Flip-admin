import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  withdrawals: null,
  newWithdrawal: null,
  withdrawalDetails: null,
  withdrawalSettings: null,
  declineWithdrawalTransaction: null,
  approveWithdrawalTransaction: null,
}
const key = actionTypes.KEY;

const withdrawalReducer = (state = initState, action) => {
	switch (action.type) {
    case actionTypes.APPROVE_WITHDRAWAL_TRANSACTION:
      notification.info({
        message: "Loading.....",
        description: "Approving withdrawal Request",
        duration: 0,
        key,
      })
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.DECLINE_WITHDRAWAL_TRANSACTION:
      notification.info({
        message: "Loading.....",
        description: "Declining withdrawal Request",
        duration: 0,
        key,
      })
      return {
        ...state,
        declineWithdrawalTransaction: null,
        loading: true,
        error: null,
      }
    case actionTypes.GET_WITHDRAWAL_SETTINGS:
    case actionTypes.GET_NEW_WITHDRAWAL_TRANSACTIONS:
    case actionTypes.GET_ALL_WITHDRAWAL_TRANSACTIONS:
    case actionTypes.UPDATE_WITHDRAWAL_SETTINGS:
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
    case actionTypes.GET_WITHDRAWAL_DETAILS:
      notification.info({
        message: "loading.....",
        key,
      })
      return{
        ...state,
        withdrawalDetails: null,
        loading: false,
        error: null,
      }
    case actionTypes.GET_WITHDRAWAL_SETTINGS_SUCCESS:
      notification.success({
        message: "Successful",
        duration: 0,
        key,
      })
      return {
        ...state,
        withdrawalSettings: action.payload,
        loading: true,
        error: null,
      }
    case actionTypes.APPROVE_WITHDRAWAL_TRANSACTION_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Approved withdrawal Request",
        duration: 0,
        key,
      })
      return {
        ...state,
        approveWithdrawalTransaction: action.payload,
        loading: true,
        error: null,
      }
    case actionTypes.DECLINE_WITHDRAWAL_TRANSACTION_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Declined withdrawal Request",
        duration: 0,
        key,
      })
      return {
        ...state,
        declineWithdrawalTransaction: action.payload,
        loading: true,
        error: null,
      }
    case actionTypes.GET_NEW_WITHDRAWAL_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        newWithdrawal: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_ALL_WITHDRAWAL_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        withdrawals: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_WITHDRAWAL_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        withdrawalDetails: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.UPDATE_WITHDRAWAL_SETTINGS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        loading: false,
        error: null,
      }
    case actionTypes.GET_WITHDRAWAL_SETTINGS_FAILED:
    case actionTypes.APPROVE_WITHDRAWAL_TRANSACTION_FAILED:
    case actionTypes.DECLINE_WITHDRAWAL_TRANSACTION_FAILED:
    case actionTypes.GET_NEW_WITHDRAWAL_TRANSACTIONS_FAILED:
    case actionTypes.GET_ALL_WITHDRAWAL_TRANSACTIONS_FAILED:
    case actionTypes.GET_WITHDRAWAL_DETAILS_FAILED:
    case actionTypes.UPDATE_WITHDRAWAL_SETTINGS_FAILED:
      return{
        ...state,
        loading: false,
        error: action.payload,
      }
		default:
			return state;
	}
}

export default withdrawalReducer;