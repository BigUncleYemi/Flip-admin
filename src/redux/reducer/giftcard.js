import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  giftCard: null,
  giftCardList: null,
  newGiftCard: null,
  giftCardDetails: null,
  declineGiftCardTransaction: null,
  approveGiftCardTransaction: null,
}
const key = actionTypes.KEY;

const giftCardReducer = (state = initState, action) => {
	switch (action.type) {
    case actionTypes.GET_CARD_CODES_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Getting Gift Cards",
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.APPROVE_GIFTCARD_TRANSACTION:
      notification.info({
        message: "Loading.....",
        description: "Approving GiftCard Request",
        duration: 0,
        key,
      })
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.DECLINE_GIFTCARD_TRANSACTION:
      notification.info({
        message: "Loading.....",
        description: "Declining GiftCard Request",
        duration: 0,
        key,
      })
      return {
        ...state,
        declineGiftCardTransaction: null,
        loading: true,
        error: null,
      }
    case actionTypes.GET_NEW_GIFTCARD_TRANSACTIONS:
    case actionTypes.GET_ALL_GIFTCARD_TRANSACTIONS:
    case actionTypes.UPDATE_GIFTCARD_RATE:
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
    case actionTypes.GET_GIFTCARD_DETAILS:
      notification.info({
        message: "loading.....",
        key,
      })
      return{
        ...state,
        giftCardDetails: null,
        loading: false,
        error: null,
      }
    case actionTypes.APPROVE_GIFTCARD_TRANSACTION_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Approved GiftCard Request",
        duration: 0,
        key,
      })
      return {
        ...state,
        approveGiftCardTransaction: action.payload,
        loading: true,
        error: null,
      }
    case actionTypes.DECLINE_GIFTCARD_TRANSACTION_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Declined GiftCard Request",
        duration: 0,
        key,
      })
      return {
        ...state,
        declineGiftCardTransaction: action.payload,
        loading: true,
        error: null,
      }
    case actionTypes.GET_NEW_GIFTCARD_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        newGiftCard: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_ALL_GIFTCARD_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        giftCard: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_GIFTCARD_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        giftCardDetails: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.UPDATE_GIFTCARD_RATE_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        loading: false,
        error: null,
      }
    case actionTypes.GET_CARD_CODES_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully Fetched Gift Cards",
        key,
      });
      return {
        ...state,
        giftCardList: action.payload.cardRateDetails,
        loading: false,
        error: null,
      };
    case actionTypes.GET_CARD_CODES_FAILED:
    case actionTypes.APPROVE_GIFTCARD_TRANSACTION_FAILED:
    case actionTypes.DECLINE_GIFTCARD_TRANSACTION_FAILED:
    case actionTypes.GET_NEW_GIFTCARD_TRANSACTIONS_FAILED:
    case actionTypes.GET_ALL_GIFTCARD_TRANSACTIONS_FAILED:
    case actionTypes.GET_GIFTCARD_DETAILS_FAILED:
    case actionTypes.UPDATE_GIFTCARD_RATE_FAILED:
      return{
        ...state,
        loading: false,
        error: action.payload,
      }
		default:
			return state;
	}
}

export default giftCardReducer;