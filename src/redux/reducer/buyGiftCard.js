import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  BuyGiftCards: null,
  newBuyGiftCard: null,
  BuyGiftCardDetails: null,
  BuyGiftCardTransactionSettings: null,
  UpdateBuyGiftCardTransactionSettings: null,
  UpdateBuyGiftCardTransactionStatus: null,
}
const key = actionTypes.KEY;

const buyGiftCardsReducer = (state = initState, action) => {
	switch (action.type) {
    case actionTypes.UPDATE_BUY_GIFT_CARD_STATUS:
    case actionTypes.GET_NEW_BUY_GIFT_CARD_TRANSACTIONS:
    case actionTypes.GET_ALL_BUY_GIFT_CARD_TRANSACTIONS:
    case actionTypes.UPDATE_BUY_GIFT_CARD_SETTING:
    case actionTypes.GET_BUY_GIFT_CARD_SETTING:
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
    case actionTypes.GET_BUY_GIFT_CARD_DETAILS:
      notification.info({
        message: "loading.....",
        key,
      })
      return{
        ...state,
        BuyGiftCardDetails: null,
        loading: true,
        error: null,
      }
    case actionTypes.GET_BUY_GIFT_CARD_SETTING_SUCCESS:
      notification.success({
        message: "Successful",
        duration: 0,
        key,
      })
      return {
        ...state,
        BuyGiftCardTransactionSettings: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_NEW_BUY_GIFT_CARD_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        newBuyGiftCard: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_ALL_BUY_GIFT_CARD_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        BuyGiftCards: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_BUY_GIFT_CARD_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        BuyGiftCardDetails: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.UPDATE_BUY_GIFT_CARD_SETTING_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        UpdateBuyGiftCardTransactionSettings: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.UPDATE_BUY_GIFT_CARD_STATUS_SUCCESS:
      notification.success({
        message: "Successful",
        description: action.payload.message,
        key,
      })
      return{
        ...state,
        UpdateBuyGiftCardTransactionStatus: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.UPDATE_BUY_GIFT_CARD_STATUS_FAILED:
    case actionTypes.GET_NEW_BUY_GIFT_CARD_TRANSACTIONS_FAILED:
    case actionTypes.GET_ALL_BUY_GIFT_CARD_TRANSACTIONS_FAILED:
    case actionTypes.GET_BUY_GIFT_CARD_DETAILS_FAILED:
    case actionTypes.UPDATE_BUY_GIFT_CARD_SETTING_FAILED:
    case actionTypes.GET_BUY_GIFT_CARD_SETTING_FAILED:
      return{
        ...state,
        loading: false,
        error: action.payload,
      }
		default:
			return state;
	}
}

export default buyGiftCardsReducer;