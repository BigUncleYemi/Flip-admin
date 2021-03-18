import fetch from './FetchInterceptor'

const btcService = {}

btcService.getAllBTCTransaction = function (params) {
  return fetch({
    url: '/api/admin/coins/btc/get-transactions',
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit,
      types: params.types || "",
    }
  })
}

btcService.getASingleBTCTransaction = function (params) {
  return fetch({
    url: `/api/admin/coins/btc/${params.transactionId}`,
    method: 'get',
  })
}

btcService.getBTCSettings = function () {
  return fetch({
    url: `/api/admin/coins/btc/settings`,
    method: 'get',
  })
}

btcService.updateBTCSettings = function (data) {
  return fetch({
    url: `/api/admin/coins/btc/settings`,
    method: 'put',
    data,
  })
}

export default btcService