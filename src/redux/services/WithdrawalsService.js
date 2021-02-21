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
    url: '/admin/withdrawals/update-withdrawal-settings',
    method: 'put',
    data: data
  })
}

export default withdrawalService;
