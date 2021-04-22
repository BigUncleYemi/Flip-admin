import fetch from './FetchInterceptor'

const btcService = {}

btcService.getBuyCoinTransactions = function (params) {
  return fetch({
    url: '/admin/coins/buy/transactions',
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit,
      types: params.types || "",
    }
  })
}

btcService.getSellCoinTransactions = function (params) {
  return fetch({
    url: '/admin/coins/sell/transactions',
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit,
      types: params.types || "",
    }
  })
}

btcService.getSendCoinTransactions = function (params) {
  return fetch({
    url: '/admin/coins/send/transactions',
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit,
      types: params.types || "",
    }
  })
}

btcService.getP2PCoinTransactions = function (params) {
  return fetch({
    url: '/admin/coins/p2ptransfer/transactions',
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit,
      types: params.types || "",
    }
  })
}

btcService.getBuyCoinTransactionDetails = function (params) {
  return fetch({
    url: `admin/coins/buy/${params.transactionId}`,
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit,
      types: params.types || "",
    }
  })
}

btcService.getSellCoinTransactionDetails = function (params) {
  return fetch({
    url: `/admin/coins/sell/${params.transactionId}`,
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit,
      types: params.types || "",
    }
  })
}

btcService.getSendCoinTransactionDetails = function (params) {
  return fetch({
    url: `/admin/coins/send/${params.transactionId}`,
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit,
      types: params.types || "",
    }
  })
}

btcService.getP2PCoinTransactionDetails = function (params) {
  return fetch({
    url: `admin/coins/p2ptransfer/${params.transactionId}`,
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