import fetch from 'auth/FetchInterceptor'

const dashboardService = {}

dashboardService.getDashboardStat = function () {
  return fetch({
    url: '/admin/misc/dashboard',
    method: 'get',
  })
}

dashboardService.getWalletBalances = function () {
  return fetch({
    url: '/admin/misc/wallet-balances',
    method: 'get',
  })
}

export default dashboardService