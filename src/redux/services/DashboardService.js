import fetch from 'auth/FetchInterceptor'

const dashboardService = {}

dashboardService.getDashboardStat = function () {
  return fetch({
    url: '/api/admin/dashboard',
    method: 'get',
  })
}

export default dashboardService