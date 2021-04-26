// Auth -done - confirm if it has either toaster or modal notification indicator in the reducers
export const CHECK_EMAIL_AVAILABILITY_PENDING = "CHECK_EMAIL_AVAILABILITY_PENDING";
export const CHECK_EMAIL_AVAILABILITY_SUCCESS = "CHECK_EMAIL_AVAILABILITY_SUCCESS";
export const CHECK_EMAIL_AVAILABILITY_FAILED = "CHECK_EMAIL_AVAILABILITY_FAILED";

export const REGISTER_PENDING = "REGISTER_PENDING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_PENDING = "LOGOUT_PENDING";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const VERIFY_EMAIL_OTP_PENDING = "VERIFY_EMAIL_OTP_PENDING";
export const VERIFY_EMAIL_OTP_SUCCESS = "VERIFY_EMAIL_OTP_SUCCESS";
export const VERIFY_EMAIL_OTP_FAILED = "VERIFY_EMAIL_OTP_FAILED";

export const RESEND_EMAIL_OTP_CODE_PENDING = "RESEND_EMAIL_OTP_CODE_PENDING";
export const RESEND_EMAIL_OTP_CODE_SUCCESS = "RESEND_EMAIL_OTP_CODE_SUCCESS";
export const RESEND_EMAIL_OTP_CODE_FAILED = "RESEND_EMAIL_OTP_CODE_FAILED";

export const CHANGE_USER_PASSWORD_PENDING = "CHANGE_USER_PASSWORD_PENDING";
export const CHANGE_USER_PASSWORD_SUCCESS = "CHANGE_USER_PASSWORD_SUCCESS";
export const CHANGE_USER_PASSWORD_FAILED = "CHANGE_USER_PASSWORD_FAILED";

export const RESET_USER_PASSWORD_PENDING = "RESET_USER_PASSWORD_PENDING";
export const RESET_USER_PASSWORD_SUCCESS = "RESET_USER_PASSWORD_SUCCESS";
export const RESET_USER_PASSWORD_FAILED = "RESET_USER_PASSWORD_FAILED";

export const COMPLETE_RESET_USER_PASSWORD_PENDING = "COMPLETE_RESET_USER_PASSWORD_PENDING";
export const COMPLETE_RESET_USER_PASSWORD_SUCCESS = "COMPLETE_RESET_USER_PASSWORD_SUCCESS";
export const COMPLETE_RESET_USER_PASSWORD_FAILED = "COMPLETE_RESET_USER_PASSWORD_FAILED";

//user

export const GET_USER_DETAILS_BY_ID_PENDING = "GET_USER_DETAILS_BY_ID_PENDING";
export const GET_USER_DETAILS_BY_ID_SUCCESS = "GET_USER_DETAILS_BY_ID_SUCCESS";
export const GET_USER_DETAILS_BY_ID_FAILED = "GET_USER_DETAILS_BY_ID_FAILED";

export const UPDATE_USER_DETAILS_PENDING = "UPDATE_USER_DETAILS_PENDING";
export const UPDATE_USER_DETAILS_SUCCESS = "UPDATE_USER_DETAILS_SUCCESS";
export const UPDATE_USER_DETAILS_FAILED = "UPDATE_USER_DETAILS_FAILED";

export const SET_TRANSACTION_PIN_PENDING = "SET_TRANSACTION_PIN_PENDING";
export const SET_TRANSACTION_PIN_SUCCESS = "SET_TRANSACTION_PIN_SUCCESS";
export const SET_TRANSACTION_PIN_FAILED = "SET_TRANSACTION_PIN_FAILED";

export const RESET_TRANSACTION_PIN_PENDING = "RESET_TRANSACTION_PIN_PENDING";
export const RESET_TRANSACTION_PIN_SUCCESS = "RESET_TRANSACTION_PIN_SUCCESS";
export const RESET_TRANSACTION_PIN_FAILED = "RESET_TRANSACTION_PIN_FAILED";

export const COMPLETE_RESET_TRANSACTION_PIN_PENDING = "COMPLETE_RESET_TRANSACTION_PIN_PENDING";
export const COMPLETE_RESET_TRANSACTION_PIN_SUCCESS = "COMPLETE_RESET_TRANSACTION_PIN_SUCCESS";
export const COMPLETE_RESET_TRANSACTION_PIN_FAILED = "COMPLETE_RESET_TRANSACTION_PIN_FAILED";

export const ADD_BANK_ACCOUNT_PENDING = "ADD_BANK_ACCOUNT_PENDING";
export const ADD_BANK_ACCOUNT_SUCCESS = "ADD_BANK_ACCOUNT_SUCCESS";
export const ADD_BANK_ACCOUNT_FAILED = "ADD_BANK_ACCOUNT_FAILED";

export const GET_BANK_ACCOUNT_PENDING = "GET_BANK_ACCOUNT_PENDING";
export const GET_BANK_ACCOUNT_SUCCESS = "GET_BANK_ACCOUNT_SUCCESS";
export const GET_BANK_ACCOUNT_FAILED = "GET_BANK_ACCOUNT_FAILED";

export const DEL_BANK_ACCOUNT_PENDING = "DEL_BANK_ACCOUNT_PENDING";
export const DEL_BANK_ACCOUNT_SUCCESS = "DEL_BANK_ACCOUNT_SUCCESS";
export const DEL_BANK_ACCOUNT_FAILED = "DEL_BANK_ACCOUNT_FAILED";

// BTC

export const GET_WALLET_DETAILS_BY_ID_PENDING = "GET_WALLET_DETAILS_BY_ID_PENDING";
export const GET_WALLET_DETAILS_BY_ID_SUCCESS = "GET_WALLET_DETAILS_BY_ID_SUCCESS";
export const GET_WALLET_DETAILS_BY_ID_FAILED = "GET_WALLET_DETAILS_BY_ID_FAILED";

export const GET_WALLET_DETAILS_PENDING = "GET_WALLET_DETAILS_PENDING";
export const GET_WALLET_DETAILS_SUCCESS = "GET_WALLET_DETAILS_SUCCESS";
export const GET_WALLET_DETAILS_FAILED = "GET_WALLET_DETAILS_FAILED";

export const GET_CURRENT_MARKET_TICKERS_PENDING = "GET_CURRENT_MARKET_TICKERS_PENDING";
export const GET_CURRENT_MARKET_TICKERS_SUCCESS = "GET_CURRENT_MARKET_TICKERS_SUCCESS";
export const GET_CURRENT_MARKET_TICKERS_FAILED = "GET_CURRENT_MARKET_TICKERS_FAILED";

export const INITIAL_BUY_BTC_PENDING = "INITIAL_BUY_BTC_PENDING";
export const INITIAL_BUY_BTC_SUCCESS = "INITIAL_BUY_BTC_SUCCESS";
export const INITIAL_BUY_BTC_FAILED = "INITIAL_BUY_BTC_FAILED";

export const INITIAL_SELL_BTC_PENDING = "INITIAL_SELL_BTC_PENDING";
export const INITIAL_SELL_BTC_SUCCESS = "INITIAL_SELL_BTC_SUCCESS";
export const INITIAL_SELL_BTC_FAILED = "INITIAL_SELL_BTC_FAILED";

export const INITIAL_SEND_BTC_TO_EXTERNAL_WALLET_PENDING = "INITIAL_SEND_BTC_TO_EXTERNAL_WALLET_PENDING";
export const INITIAL_SEND_BTC_TO_EXTERNAL_WALLET_SUCCESS = "INITIAL_SEND_BTC_TO_EXTERNAL_WALLET_SUCCESS";
export const INITIAL_SEND_BTC_TO_EXTERNAL_WALLET_FAILED = "INITIAL_SEND_BTC_TO_EXTERNAL_WALLET_FAILED";

export const RECEIVE_BTC_PENDING = "RECEIVE_BTC_PENDING";
export const RECEIVE_BTC_SUCCESS = "RECEIVE_BTC_SUCCESS";
export const RECEIVE_BTC_FAILED = "RECEIVE_BTC_FAILED";

export const GET_TRANSACTION_HISTORY_PENDING = "GET_TRANSACTION_HISTORY_PENDING";
export const GET_TRANSACTION_HISTORY_SUCCESS = "GET_TRANSACTION_HISTORY_SUCCESS";
export const GET_TRANSACTION_HISTORY_FAILED = "GET_TRANSACTION_HISTORY_FAILED";

export const GET_LAST_TRANSACTION_HISTORY_PENDING = "GET_LAST_TRANSACTION_HISTORY_PENDING";
export const GET_LAST_TRANSACTION_HISTORY_SUCCESS = "GET_LAST_TRANSACTION_HISTORY_SUCCESS";
export const GET_LAST_TRANSACTION_HISTORY_FAILED = "GET_TRANSACTION_HISTORY_FAILED";

export const CANCEL_OPEN_TRANSACTIONS_PENDING = "CANCEL_OPEN_TRANSACTIONS_PENDING";
export const CANCEL_OPEN_TRANSACTIONS_SUCCESS = "CANCEL_OPEN_TRANSACTIONS_SUCCESS";
export const CANCEL_OPEN_TRANSACTIONS_FAILED = "CANCEL_OPEN_TRANSACTIONS_FAILED";

// payment

export const INITIAL_PAYMENT_PENDING = "INITIAL_PAYMENT_PENDING";
export const INITIAL_PAYMENT_SUCCESS = "INITIAL_PAYMENT_SUCCESS";
export const INITIAL_PAYMENT_FAILED = "INITIAL_PAYMENT_FAILED";

export const CANCEL_PAYMENT_PENDING = "CANCEL_PAYMENT_PENDING";
export const CANCEL_PAYMENT_SUCCESS = "CANCEL_PAYMENT_SUCCESS";
export const CANCEL_PAYMENT_FAILED = "CANCEL_PAYMENT_FAILED";

export const GET_PAYMENT_DETAILS_PENDING = "GET_PAYMENT_DETAILS_PENDING";
export const GET_PAYMENT_DETAILS_SUCCESS = "GET_PAYMENT_DETAILS_SUCCESS";
export const GET_PAYMENT_DETAILS_FAILED = "GET_PAYMENT_DETAILS_FAILED";

export const GET_LAST_PAYMENT_BY_USER_PENDING = "GET_LAST_PAYMENT_BY_USER_PENDING";
export const GET_LAST_PAYMENT_BY_USER_SUCCESS = "GET_LAST_PAYMENT_BY_USER_SUCCESS";
export const GET_LAST_PAYMENT_BY_USER_FAILED = "GET_LAST_PAYMENT_BY_USER_FAILED";

export const GET_ALL_PAYMENT_BY_USER_PENDING = "GET_ALL_PAYMENT_BY_USER_PENDING";
export const GET_ALL_PAYMENT_BY_USER_SUCCESS = "GET_ALL_PAYMENT_BY_USER_SUCCESS";
export const GET_ALL_PAYMENT_BY_USER_FAILED = "GET_ALL_PAYMENT_BY_USER_FAILED";

// GIFTCARD

// export const GET_PAYMENT_DETAILS_PENDING = "GET_PAYMENT_DETAILS_PENDING";
// export const GET_PAYMENT_DETAILS_SUCCESS = "GET_PAYMENT_DETAILS_SUCCESS";
// export const GET_PAYMENT_DETAILS_FAILED = "GET_PAYMENT_DETAILS_FAILED";

// export const GET_ALL_PAYMENT_BY_USER_PENDING = "GET_ALL_PAYMENT_BY_USER_PENDING";
// export const GET_ALL_PAYMENT_BY_USER_SUCCESS = "GET_ALL_PAYMENT_BY_USER_SUCCESS";
// export const GET_ALL_PAYMENT_BY_USER_FAILED = "GET_ALL_PAYMENT_BY_USER_FAILED";

export const INITIATE_SELL_GIFTCARD_PENDING = "INITIATE_SELL_GIFTCARD_PENDING";
export const INITIATE_SELL_GIFTCARD_SUCCESS = "INITIATE_SELL_GIFTCARD_SUCCESS";
export const INITIATE_SELL_GIFTCARD_FAILED = "INITIATE_SELL_GIFTCARD_FAILED";

export const CANCEL_SELL_GIFTCARD_TRANSACTION_PENDING = "CANCEL_SELL_GIFTCARD_TRANSCTION_PENDING";
export const CANCEL_SELL_GIFTCARD_TRANSACTION_SUCCESS = "CANCEL_SELL_GIFTCARD_TRANSCTION_SUCCESS";
export const CANCEL_SELL_GIFTCARD_TRANSACTION_FAILED = "CANCEL_SELL_GIFTCARD_TRANSCTION_FAILED";

export const GET_TRANSACTION_DETAILS_GIFTCARD_PENDING = "GET_TRANSACTION_DETAILS_GIFTCARD_PENDING";
export const GET_TRANSACTION_DETAILS_GIFTCARD_SUCCESS = "GET_TRANSACTION_DETAILS_GIFTCARD_SUCCESS";
export const GET_TRANSACTION_DETAILS_GIFTCARD_FAILED = "GET_TRANSACTION_DETAILS_GIFTCARD_FAILED";

export const GET_TRANSACTIONS_HISTORY_GIFTCARD_PENDING = "GET_TRANSACTIONS_HISTORY_GIFTCARD_PENDING";
export const GET_TRANSACTIONS_HISTORY_GIFTCARD_SUCCESS = "GET_TRANSACTIONS_HISTORY_GIFTCARD_SUCCESS";
export const GET_TRANSACTIONS_HISTORY_GIFTCARD_FAILED = "GET_TRANSACTIONS_HISTORY_GIFTCARD_FAILED";

export const GET_LAST_TRANSACTIONS_HISTORY_GIFTCARD_PENDING = "GET_LAST_TRANSACTIONS_HISTORY_GIFTCARD_PENDING";
export const GET_LAST_TRANSACTIONS_HISTORY_GIFTCARD_SUCCESS = "GET_LAST_TRANSACTIONS_HISTORY_GIFTCARD_SUCCESS";
export const GET_LAST_TRANSACTIONS_HISTORY_GIFTCARD_FAILED = "GET_LAST_TRANSACTIONS_HISTORY_GIFTCARD_FAILED";

// MISC

export const GET_BANKS_BY_COUNTRY_PENDING = "GET_BANKS_BY_COUNTRY_PENDING";
export const GET_BANKS_BY_COUNTRY_SUCCESS = "GET_BANKS_BY_COUNTRY_SUCCESS";
export const GET_BANKS_BY_COUNTRY_FAILED = "GET_BANKS_BY_COUNTRY_FAILED";

export const VERIFY_BANK_ACCOUNT_DETAILS_PENDING = "VERIFY_BANK_ACCOUNT_DETAILS_PENDING";
export const VERIFY_BANK_ACCOUNT_DETAILS_SUCCESS = "VERIFY_BANK_ACCOUNT_DETAILS_SUCCESS";
export const VERIFY_BANK_ACCOUNT_DETAILS_FAILED = "VERIFY_BANK_ACCOUNT_DETAILS_FAILED";

export const AUTH_TOKEN = 'au_token'
export const AUTH_TOKEN_ID = 'au_token_id'
export const KEY = 'update_key';

// withdrawal

export const INITIAL_WITHDRAWAL_PENDING = "INITIAL_WITHDRAWAL_PENDING";
export const INITIAL_WITHDRAWAL_SUCCESS = "INITIAL_WITHDRAWAL_SUCCESS";
export const INITIAL_WITHDRAWAL_FAILED = "INITIAL_WITHDRAWAL_FAILED";

export const CANCEL_WITHDRAWAL_PENDING = "CANCEL_WITHDRAWAL_PENDING";
export const CANCEL_WITHDRAWAL_SUCCESS = "CANCEL_WITHDRAWAL_SUCCESS";
export const CANCEL_WITHDRAWAL_FAILED = "CANCEL_WITHDRAWAL_FAILED";

export const GET_LAST_WITHDRAWAL_BY_USER_PENDING = "GET_LAST_WITHDRAWAL_BY_USER_PENDING";
export const GET_LAST_WITHDRAWAL_BY_USER_SUCCESS = "GET_LAST_WITHDRAWAL_BY_USER_SUCCESS";
export const GET_LAST_WITHDRAWAL_BY_USER_FAILED = "GET_LAST_WITHDRAWAL_BY_USER_FAILED";

export const GET_ALL_WITHDRAWAL_BY_USER_PENDING = "GET_ALL_WITHDRAWAL_BY_USER_PENDING";
export const GET_ALL_WITHDRAWAL_BY_USER_SUCCESS = "GET_ALL_WITHDRAWAL_BY_USER_SUCCESS";
export const GET_ALL_WITHDRAWAL_BY_USER_FAILED = "GET_ALL_WITHDRAWAL_BY_USER_FAILED";

// const LoginUser = data => async dispatch => {
//   dispatch({
//     type: actionTypes.LOGIN_PENDING,
//   })
// }

// export const loginUser = data => dispatch => {
//   // done
//   dispatch(LoginUser(data));
// };

// DASHBOARD

export const GET_DASHBOARD_DATA = 'GET_DASHBOARD_DATA';
export const GET_DASHBOARD_DATA_FAILED = 'GET_DASHBOARD_DATA_FAILED';
export const GET_DASHBOARD_DATA_SUCCESS = 'GET_DASHBOARD_DATA_SUCCESS';

export const GET_WALLET_BALANCES_DATA_PENDING = 'GET_WALLET_BALANCES_DATA_PENDING'
export const GET_WALLET_BALANCES_DATA_SUCCESS = 'GET_WALLET_BALANCES_DATA_SUCCESS'
export const GET_WALLET_BALANCES_DATA_FAILED = 'GET_WALLET_BALANCES_DATA_FAILED'

// GIFTCARD

export const APPROVE_GIFTCARD_TRANSACTION = 'APPROVE_GIFTCARD_TRANSACTION';
export const APPROVE_GIFTCARD_TRANSACTION_SUCCESS = 'APPROVE_GIFTCARD_TRANSACTION_SUCCESS';
export const APPROVE_GIFTCARD_TRANSACTION_FAILED = 'APPROVE_GIFTCARD_TRANSACTION_FAILED';
export const DECLINE_GIFTCARD_TRANSACTION = 'DECLINE_GIFTCARD_TRANSACTION';
export const DECLINE_GIFTCARD_TRANSACTION_SUCCESS = 'DECLINE_GIFTCARD_TRANSACTION_SUCCESS';
export const DECLINE_GIFTCARD_TRANSACTION_FAILED = 'DECLINE_GIFTCARD_TRANSACTION_FAILED';
export const GET_NEW_GIFTCARD_TRANSACTIONS = 'GET_NEW_GIFTCARD_TRANSACTIONS';
export const GET_NEW_GIFTCARD_TRANSACTIONS_SUCCESS = 'GET_NEW_GIFTCARD_TRANSACTIONS_SUCCESS';
export const GET_NEW_GIFTCARD_TRANSACTIONS_FAILED = 'GET_NEW_GIFTCARD_TRANSACTIONS_FAILED';
export const GET_ALL_GIFTCARD_TRANSACTIONS = 'GET_ALL_GIFTCARD_TRANSACTIONS';
export const GET_ALL_GIFTCARD_TRANSACTIONS_SUCCESS = 'GET_ALL_GIFTCARD_TRANSACTIONS_SUCCESS';
export const GET_ALL_GIFTCARD_TRANSACTIONS_FAILED = 'GET_ALL_GIFTCARD_TRANSACTIONS_FAILED';
export const UPDATE_GIFTCARD_RATE = 'UPDATE_GIFTCARD_RATE';
export const UPDATE_GIFTCARD_RATE_SUCCESS = 'UPDATE_GIFTCARD_RATE_SUCCESS';
export const UPDATE_GIFTCARD_RATE_FAILED = 'UPDATE_GIFTCARD_RATE_FAILED';
export const GET_GIFTCARD_DETAILS = "GET_GIFTCARD_DETAILS";
export const GET_GIFTCARD_DETAILS_SUCCESS = "GET_GIFTCARD_DETAILS_SUCCESS";
export const GET_GIFTCARD_DETAILS_FAILED = "GET_GIFTCARD_DETAILS_FAILED";
export const GET_CARD_CODES_PENDING = "GET_CARD_CODES_PENDING";
export const GET_CARD_CODES_SUCCESS = "GET_CARD_CODES_SUCCESS";
export const GET_CARD_CODES_FAILED = "GET_CARD_CODES_FAILED";


// WITHDRAWALS

export const APPROVE_WITHDRAWAL_TRANSACTION = 'APPROVE_WITHDRAWAL_TRANSACTION';
export const APPROVE_WITHDRAWAL_TRANSACTION_SUCCESS = 'APPROVE_WITHDRAWAL_TRANSACTION_SUCCESS';
export const APPROVE_WITHDRAWAL_TRANSACTION_FAILED = 'APPROVE_WITHDRAWAL_TRANSACTION_FAILED';
export const DECLINE_WITHDRAWAL_TRANSACTION = 'DECLINE_WITHDRAWAL_TRANSACTION';
export const DECLINE_WITHDRAWAL_TRANSACTION_SUCCESS = 'DECLINE_WITHDRAWAL_TRANSACTION_SUCCESS';
export const DECLINE_WITHDRAWAL_TRANSACTION_FAILED = 'DECLINE_WITHDRAWAL_TRANSACTION_FAILED';
export const GET_NEW_WITHDRAWAL_TRANSACTIONS = 'GET_NEW_WITHDRAWAL_TRANSACTIONS';
export const GET_NEW_WITHDRAWAL_TRANSACTIONS_SUCCESS = 'GET_NEW_WITHDRAWAL_TRANSACTIONS_SUCCESS';
export const GET_NEW_WITHDRAWAL_TRANSACTIONS_FAILED = 'GET_NEW_WITHDRAWAL_TRANSACTIONS_FAILED';
export const GET_ALL_WITHDRAWAL_TRANSACTIONS = 'GET_ALL_WITHDRAWAL_TRANSACTIONS';
export const GET_ALL_WITHDRAWAL_TRANSACTIONS_SUCCESS = 'GET_ALL_WITHDRAWAL_TRANSACTIONS_SUCCESS';
export const GET_ALL_WITHDRAWAL_TRANSACTIONS_FAILED = 'GET_ALL_WITHDRAWAL_TRANSACTIONS_FAILED';
export const UPDATE_WITHDRAWAL_SETTINGS = 'UPDATE_WITHDRAWAL_SETTINGS';
export const UPDATE_WITHDRAWAL_SETTINGS_SUCCESS = 'UPDATE_WITHDRAWAL_SETTINGS_SUCCESS';
export const UPDATE_WITHDRAWAL_SETTINGS_FAILED = 'UPDATE_WITHDRAWAL_SETTINGS_FAILED';
export const GET_WITHDRAWAL_DETAILS = "GET_WITHDRAWAL_DETAILS";
export const GET_WITHDRAWAL_DETAILS_SUCCESS = "GET_WITHDRAWAL_DETAILS_SUCCESS";
export const GET_WITHDRAWAL_DETAILS_FAILED = "GET_WITHDRAWAL_DETAILS_FAILED";
export const GET_WITHDRAWAL_SETTINGS = 'GET_WITHDRAWAL_SETTINGS';
export const GET_WITHDRAWAL_SETTINGS_SUCCESS = 'GET_WITHDRAWAL_SETTINGS_SUCCESS';
export const GET_WITHDRAWAL_SETTINGS_FAILED = 'GET_WITHDRAWAL_SETTINGS_FAILED';


// AUTH

export const SIGNIN = 'SIGNIN';
export const AUTHENTICATED = 'AUTHENTICATED';
export const SIGNOUT = 'SIGNOUT';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';

// utils
export const SHOW_LOADING = 'SHOW_LOADING';

// user

export const GET_ALL_USER_PENDING = "GET_ALL_USER_PENDING";
export const GET_ALL_USER_SUCCESS = "GET_ALL_USER_SUCCESS";
export const GET_ALL_USER_FAILED = "GET_ALL_USER_FAILED";

export const GET_USER_BY_ID_PENDING = "GET_USER_BY_ID_PENDING";
export const GET_USER_BY_ID_SUCCESS = "GET_USER_BY_ID_SUCCESS";
export const GET_USER_BY_ID_FAILED = "GET_USER_BY_ID_FAILED";

export const GET_USER_CURRENT_BY_ID_PENDING = "GET_USER_CURRENT_BY_ID_PENDING";
export const GET_USER_CURRENT_BY_ID_SUCCESS = "GET_USER_CURRENT_BY_ID_SUCCESS";
export const GET_USER_CURRENT_BY_ID_FAILED = "GET_USER_CURRENT_BY_ID_FAILED";


//super  admin

export const ADMIN_LOG_PENDING = "ADMIN_LOG_PENDING";
export const ADMIN_LOG_SUCCESS = "ADMIN_LOG_SUCCESS";
export const ADMIN_LOG_FAILED = "ADMIN_LOG_FAILED";

export const INVITE_ADMIN_PENDING = "INVITE_ADMIN_PENDING";
export const INVITE_ADMIN_SUCCESS = "INVITE_ADMIN_SUCCESS";
export const INVITE_ADMIN_FAILED = "INVITE_ADMIN_FAILED";

export const MAKE_USER_ADMIN_PENDING = "MAKE_USER_ADMIN_PENDING"
export const MAKE_USER_ADMIN_SUCCESS = "MAKE_USER_ADMIN_SUCCESS"
export const MAKE_USER_ADMIN_FAILED = "MAKE_USER_ADMIN_FAILED";

export const REMOVE_USER_ADMIN_PENDING = "REMOVE_USER_ADMIN_PENDING"
export const REMOVE_USER_ADMIN_SUCCESS = "REMOVE_USER_ADMIN_SUCCESS"
export const REMOVE_USER_ADMIN_FAILED = "REMOVE_USER_ADMIN_FAILED"

export const GET_ALL_ADMIN_INVITE_PENDING = "GET_ALL_ADMIN_INVITE_PENDING";
export const GET_ALL_ADMIN_INVITE_SUCCESS = "GET_ALL_ADMIN_INVITE_SUCCESS";
export const GET_ALL_ADMIN_INVITE_FAILED = "GET_ALL_ADMIN_INVITE_FAILED";

export const DEL_ADMIN_INVITE_PENDING = "DEL_ADMIN_INVITE_PENDING";
export const DEL_ADMIN_INVITE_SUCCESS = "DEL_ADMIN_INVITE_SUCCESS";
export const DEL_ADMIN_INVITE_FAILED = "DEL_ADMIN_INVITE_FAILED";


// BTC

export const GET_ALL_COINS_BUY_TRANSACTIONS_PENDING = 'GET_ALL_COINS_BUY_TRANSACTIONS_PENDING';
export const GET_ALL_COINS_BUY_TRANSACTIONS_SUCCESS = 'GET_ALL_COINS_BUY_TRANSACTIONS_SUCCESS';
export const GET_ALL_COINS_BUY_TRANSACTIONS_FAILED = 'GET_ALL_COINS_BUY_TRANSACTIONS_FAILED';

export const GET_ALL_COINS_SELL_TRANSACTIONS_PENDING = 'GET_ALL_COINS_SELL_TRANSACTIONS_PENDING';
export const GET_ALL_COINS_SELL_TRANSACTIONS_SUCCESS = 'GET_ALL_COINS_SELL_TRANSACTIONS_SUCCESS';
export const GET_ALL_COINS_SELL_TRANSACTIONS_FAILED = 'GET_ALL_COINS_SELL_TRANSACTIONS_FAILED';

export const GET_ALL_COINS_SEND_TRANSACTIONS_PENDING = 'GET_ALL_COINS_SEND_TRANSACTIONS_PENDING';
export const GET_ALL_COINS_SEND_TRANSACTIONS_SUCCESS = 'GET_ALL_COINS_SEND_TRANSACTIONS_SUCCESS';
export const GET_ALL_COINS_SEND_TRANSACTIONS_FAILED = 'GET_ALL_COINS_SEND_TRANSACTIONS_FAILED';

export const GET_ALL_COINS_P2P_TRANSACTIONS_PENDING = 'GET_ALL_COINS_P2P_TRANSACTIONS_PENDING';
export const GET_ALL_COINS_P2P_TRANSACTIONS_SUCCESS = 'GET_ALL_COINS_P2P_TRANSACTIONS_SUCCESS';
export const GET_ALL_COINS_P2P_TRANSACTIONS_FAILED = 'GET_ALL_COINS_P2P_TRANSACTIONS_FAILED';

export const GET_COIN_DETAILS_BUY_TRANSACTIONS_PENDING = 'GET_COIN_DETAILS_BUY_TRANSACTIONS_PENDING';
export const GET_COIN_DETAILS_BUY_TRANSACTIONS_SUCCESS = 'GET_COIN_DETAILS_BUY_TRANSACTIONS_SUCCESS';
export const GET_COIN_DETAILS_BUY_TRANSACTIONS_FAILED = 'GET_COIN_DETAILS_BUY_TRANSACTIONS_FAILED';

export const GET_COIN_DETAILS_SELL_TRANSACTIONS_PENDING = 'GET_COIN_DETAILS_SELL_TRANSACTIONS_PENDING';
export const GET_COIN_DETAILS_SELL_TRANSACTIONS_SUCCESS = 'GET_COIN_DETAILS_SELL_TRANSACTIONS_SUCCESS';
export const GET_COIN_DETAILS_SELL_TRANSACTIONS_FAILED = 'GET_COIN_DETAILS_SELL_TRANSACTIONS_FAILED';

export const GET_COIN_DETAILS_SEND_TRANSACTIONS_PENDING = 'GET_COIN_DETAILS_SEND_TRANSACTIONS_PENDING';
export const GET_COIN_DETAILS_SEND_TRANSACTIONS_SUCCESS = 'GET_COIN_DETAILS_SEND_TRANSACTIONS_SUCCESS';
export const GET_COIN_DETAILS_SEND_TRANSACTIONS_FAILED = 'GET_COIN_DETAILS_SEND_TRANSACTIONS_FAILED';

export const GET_COIN_DETAILS_P2P_TRANSACTIONS_PENDING = 'GET_COIN_DETAILS_P2P_TRANSACTIONS_PENDING';
export const GET_COIN_DETAILS_P2P_TRANSACTIONS_SUCCESS = 'GET_COIN_DETAILS_P2P_TRANSACTIONS_SUCCESS';
export const GET_COIN_DETAILS_P2P_TRANSACTIONS_FAILED = 'GET_COIN_DETAILS_P2P_TRANSACTIONS_FAILED';

export const GET_COINS_SETTING_PENDING = 'GET_COINS_SETTING_PENDING'
export const GET_COINS_SETTING_SUCCESS = 'GET_COINS_SETTING_SUCCESS'
export const GET_COINS_SETTING_FAILED = 'GET_COINS_SETTING_FAILED'

export const UPDATE_COINS_SETTING_PENDING = 'UPDATE_COINS_SETTING_PENDING';
export const UPDATE_COINS_SETTING_SUCCESS = 'UPDATE_COINS_SETTING_SUCCESS';
export const UPDATE_COINS_SETTING_FAILED = 'UPDATE_COINS_SETTING_FAILED';


// BUY COINS

export const GET_NEW_BUY_GIFT_CARD_TRANSACTIONS = 'GET_NEW_BUY_GIFT_CARD_TRANSACTIONS';
export const GET_NEW_BUY_GIFT_CARD_TRANSACTIONS_SUCCESS = 'GET_NEW_BUY_GIFT_CARD_TRANSACTIONS_SUCCESS';
export const GET_NEW_BUY_GIFT_CARD_TRANSACTIONS_FAILED = 'GET_NEW_BUY_GIFT_CARD_TRANSACTIONS_FAILED';
export const GET_ALL_BUY_GIFT_CARD_TRANSACTIONS = 'GET_ALL_BUY_GIFT_CARD_TRANSACTIONS';
export const GET_ALL_BUY_GIFT_CARD_TRANSACTIONS_SUCCESS = 'GET_ALL_BUY_GIFT_CARD_TRANSACTIONS_SUCCESS';
export const GET_ALL_BUY_GIFT_CARD_TRANSACTIONS_FAILED = 'GET_ALL_BUY_GIFT_CARD_TRANSACTIONS_FAILED';
export const GET_BUY_GIFT_CARD_DETAILS = "GET_BUY_GIFT_CARD_DETAILS";
export const GET_BUY_GIFT_CARD_DETAILS_SUCCESS = "GET_BUY_GIFT_CARD_DETAILS_SUCCESS";
export const GET_BUY_GIFT_CARD_DETAILS_FAILED = "GET_BUY_GIFT_CARD_DETAILS_FAILED";
export const UPDATE_BUY_GIFT_CARD_SETTING = 'UPDATE_BUY_GIFT_CARD_SETTING';
export const UPDATE_BUY_GIFT_CARD_SETTING_SUCCESS = 'UPDATE_BUY_GIFT_CARD_SETTING_SUCCESS';
export const UPDATE_BUY_GIFT_CARD_SETTING_FAILED = 'UPDATE_BUY_GIFT_CARD_SETTING_FAILED';
export const GET_BUY_GIFT_CARD_SETTING = "GET_BUY_GIFT_CARD_SETTING";
export const GET_BUY_GIFT_CARD_SETTING_SUCCESS = "GET_BUY_GIFT_CARD_SETTING_SUCCESS";
export const GET_BUY_GIFT_CARD_SETTING_FAILED = "GET_BUY_GIFT_CARD_SETTING_FAILED";
export const UPDATE_BUY_GIFT_CARD_STATUS = 'UPDATE_BUY_GIFT_CARD_STATUS';
export const UPDATE_BUY_GIFT_CARD_STATUS_SUCCESS = 'UPDATE_BUY_GIFT_CARD_STATUS_SUCCESS';
export const UPDATE_BUY_GIFT_CARD_STATUS_FAILED = 'UPDATE_BUY_GIFT_CARD_STATUS_FAILED';

// valid coins
export const GET_VALID_COINS_PENDING = "GET_VALID_COINS_PENDING"
export const GET_VALID_COINS_SUCCESS = "GET_VALID_COINS_SUCCESS"
export const GET_VALID_COINS_FAILED = "GET_VALID_COINS_FAILED"

// valid FIATS
export const GET_VALID_FIATS_PENDING = "GET_VALID_FIATS_PENDING"
export const GET_VALID_FIATS_SUCCESS = "GET_VALID_FIATS_SUCCESS"
export const GET_VALID_FIATS_FAILED = "GET_VALID_FIATS_FAILED"

// get gift cards
export const GET_GIFTCARDS_PENDNG = "GET_GIFTCARDS_PENDNG"
export const GET_GIFTCARDS_SUCCESS = "GET_GIFTCARDS_SUCCESS"
export const GET_GIFTCARDS_FAILED = "GET_GIFTCARDS_FAILED"

// get card currency

export const GET_CARD_CURRENCY_PENDING = "GET_CARD_CURRENCY_PENDING"
export const GET_CARD_CURRENCY_SUCCESS = "GET_CARD_CURRENCY_SUCCESS"
export const GET_CARD_CURRENCY_FAILED = "GET_CARD_CURRENCY_FAILED"

// user coins
export const GET_USERS_COINS_PENDING = "GET_USERS_COINS_PENDING"
export const GET_USERS_COINS_SUCCESS = "GET_USERS_COINS_SUCCESS"
export const GET_USERS_COINS_FAILED = "GET_USERS_COINS_FAILED"

// user fiats
export const GET_USERS_FIATS_PENDING = "GET_USERS_FIATS_PENDING"
export const GET_USERS_FIATS_SUCCESS = "GET_USERS_FIATS_SUCCESS"
export const GET_USERS_FIATS_FAILED = "GET_USERS_FIATS_FAILED"

// giftcard details by id
export const GET_CARD_DETAILS_BY_ID_PENDING = "GET_CARD_DETAILS_BY_ID_PENDING"
export const GET_CARD_DETAILS_BY_ID_SUCCESS = "GET_CARD_DETAILS_BY_ID_SUCCESS"
export const GET_CARD_DETAILS_BY_ID_FAILED = "GET_CARD_DETAILS_BY_ID_FAILED"