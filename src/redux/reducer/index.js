import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./auth";
import btcReducer from "./btc";
import giftCardReducers from "./giftcard";
import Theme from './Theme';
import withdrawalReducer from "./withdrawal";
import superAdminReducer from "./superadmin";
import All from './All';
import userReducer from "./user";
import buyGiftCardsReducer from "./buyGiftCard";
// main reducers

const rootReducer = history =>
  combineReducers({
    routers: connectRouter(history),
    all: All,
    auth: authReducer,
    theme: Theme,
    users: userReducer,
    btc: btcReducer,
    super: superAdminReducer,
    giftCard: giftCardReducers,
    withdrawals: withdrawalReducer,
    buyGiftCard: buyGiftCardsReducer
    // your reducer here
  });

export default rootReducer;