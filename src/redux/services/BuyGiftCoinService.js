import fetch from './FetchInterceptor'

const buyGiftCoinService = {}

buyGiftCoinService.getNewBuyGiftCardTransaction = function (params) {
  return fetch({
    url: '/api/admin/buy-cards/get-new-transactions',
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit,
      types: params.types || "",
    }
  })
}

buyGiftCoinService.getAllBuyGiftCardTransaction = function (params) {
  return fetch({
    url: '/api/admin/buy-cards/get-all-transactions',
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit,
      status: params.status || "",
    }
  })
}

buyGiftCoinService.getASingleBuyGiftCardTransaction = function (params) {
  return fetch({
    url: `/api/admin/buy-cards/${params.transactionId}`,
    method: 'get',
  })
}

buyGiftCoinService.getBuyGiftCardSettings = function () {
  return fetch({
    url: `/api/admin/buy-cards/settings`,
    method: 'get',
  })
}

buyGiftCoinService.updateBuyGiftCardSettings = function () {
  return fetch({
    url: `/api/admin/buy-cards/settings`,
    method: 'put',
  })
}

export default buyGiftCoinService