import fetch from './FetchInterceptor'

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


export default generalService