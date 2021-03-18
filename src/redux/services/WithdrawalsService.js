import fetch from 'auth/FetchInterceptor'

const withdrawalService = {}

withdrawalService.approveWithdrawalTransaction = function (data) {
  return fetch({
    url: `/api/admin/withdrawals/${data.transactionId}/approve-transaction`,
    method: 'post',
    data: { //INFO this is set default cos we only doing naira here
      "debitWallet": "NGN"
    }
  })
}

withdrawalService.declineWithdrawalTransaction = function (data) {
  return fetch({
    url: `/api/admin/withdrawals/${data.transactionId}/decline-transaction`,
    method: 'post',
    data: { //INFO this is set default cos we only doing naira here
      "comments": data.comment
    }
  })
}

withdrawalService.getNewWithdrawalTransactions = function (params) {
  return fetch({
    url: `/api/admin/withdrawals/get-new-transactions`,
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit
    }
  })
}

withdrawalService.getWithdrawalTransactions = function (params) {
  return fetch({
    url: `/api/admin/withdrawals/get-all-transactions`,
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit
    }
  })
}

withdrawalService.getWithdrawalTransactionDetails = function (data) {
  return fetch({
    url: `/api/admin/withdrawals/${data.transactionId}`,
    method: 'get',
  })
}

withdrawalService.updateWithdrawalSettings = function (data) {
  return fetch({
    url: '/api/admin/withdrawals/settings',
    method: 'put',
    data: data
  })
}

withdrawalService.getWithdrawalSettings = function () {
  // return fetch({
  //   url: '/api/admin/withdrawals/settings',
  //   method: 'get',
  // })

  const response = {
    "code": 200,
    "message": "Withdrawal settings fetched successfully",
    "data": {
        "settings": {
            "rates": {
                "NGN": [
                    {
                        "min": 0,
                        "max": 10000000,
                        "charge": {
                            "value": 50,
                            "isPercent": false
                        }
                    }
                ],
                "GHS": [
                    {
                        "min": 0,
                        "max": 1000000,
                        "charge": {
                            "value": 10,
                            "isPercent": false
                        }
                    }
                ]
            },
            "withdrawalDelay": 60
        }
    }
};

  return Promise.resolve(response);
}

export default withdrawalService;
