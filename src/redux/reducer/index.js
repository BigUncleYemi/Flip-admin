import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./auth";
// import bankReducer from "./bank";
// import btcReducer from "./btc";
import giftCardReducers from "./giftcard";
import Theme from './Theme';
import withdrawalReducer from "./withdrawal";
import superAdminReducer from "./superadmin";
import All from './All';
import userReducer from "./user";
// main reducers

const rootReducer = history =>
  combineReducers({
    routers: connectRouter(history),
    all: All,
    auth: authReducer,
    theme: Theme,
    users: userReducer,
    // payment: paymentReducer
    // bank: bankReducer,
    super: superAdminReducer,
    giftCard: giftCardReducers,
    withdrawals: withdrawalReducer,
    // your reducer here
  });

export default rootReducer;