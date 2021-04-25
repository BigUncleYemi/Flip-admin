import fetch from '../../auth/FetchInterceptor'

const generalService = {}

generalService.checkHealth = function () {
  return fetch({
    url: '/health',
    method: 'get',
    headers: {
      "public-request": "true",
    },
  })
}

generalService.getAllUsers = function (params) {
  return fetch({
    url: '/user-account',
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit
    }
  })
}

generalService.getUserDetails = function (params) {
  return fetch({
    url: `/user-account/${params.id}`,
    method: 'get',
  })
}

generalService.getValidCoins = function (params) {
  return fetch({
    url:"/admin/misc/get-valid-coins/",
    method:"get",
  })
}

generalService.getValidFiats = function (params) {
  return fetch({
    url:"/admin/misc/get-valid-fiats/",
    method:"get",
  })
}


export default generalService