import fetch from 'auth/FetchInterceptor'

const giftCardService = {}

giftCardService.getGiftCardCodes = function (params) {
  return fetch({
    url: `/api/transactions/cards/${params.cardCode || "all"}`,
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

giftCardService.approveGiftCardTransaction = function (data) {
  return fetch({
    url: `/api/admin/cards/${data.transactionId}/approve-transaction`,
    method: 'post',
    data: { //INFO this is set default cos we only doing naira here
      "debitWallet": "NGN"
    }
  })
}

giftCardService.declineGiftCardTransaction = function (data) {
  return fetch({
    url: `/api/admin/cards/${data.transactionId}/decline-transaction`,
    method: 'post',
    data: { //INFO this is set default cos we only doing naira here
      "comments": data.comment
    }
  })
}

giftCardService.getNewGiftCardTransactions = function (params) {
  return fetch({
    url: `/api/admin/cards/get-new-transactions`,
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit
    }
  })
}

giftCardService.getGiftCardTransactions = function (params) {
  return fetch({
    url: `/api/admin/cards/get-all-transactions`,
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit
    }
  })
}

giftCardService.getGiftCardTransactionDetails = function (data) {
  return fetch({
    url: `/api/admin/cards/${data.transactionId}`,
    method: 'get',
  })
}

giftCardService.updateCardRate = function (data) {
  // {
  //   "rates": [
  //     {
  //       "min": 0,
  //       "max": 10000000,
  //       "rate": {
  //         "NGN": 2000,
  //         "GHS": 50
  //       },
  //       "isAvailable": true
  //     }
  //   ]
  // }
  console.log(data)
  let payload = { };
  payload.rates = data.rates;

  return fetch({
    url:  `/api/admin/cards/${data.cardCode}/update-card-rates`,
    method: 'post',
    data: payload
  })
}

export default giftCardService