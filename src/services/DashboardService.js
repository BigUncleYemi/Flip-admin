import fetch from 'auth/FetchInterceptor'

const dashboardService = {}

dashboardService.getDashboardStat = function () {
  return fetch({
    url: '/admin/misc/dashboard',
    method: 'get',
  })
}

export default dashboardService