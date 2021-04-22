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
    url: `/admin/cards/${data.transactionId}/approve`,
    method: 'post',
    data: { 
      "debitWallet": data.debitWallet,
    }
  })
}

giftCardService.declineGiftCardTransaction = function (data) {
  return fetch({
    url: `/admin/cards/${data.transactionId}/decline`,
    method: 'post',
    data: { 
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
    url: `/admin/cards/transactions`,
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit
    }
  })
}

giftCardService.getGiftCardTransactionDetails = function (data) {
  return fetch({
    url: `/admin/cards/${data.transactionId}`,
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
  let payload = { };
  payload.rates = data.rates;

  return fetch({
    url:  `/api/admin/cards/${data.cardCode}/update-card-rates`,
    method: 'post',
    data: payload
  })
}

export default giftCardService