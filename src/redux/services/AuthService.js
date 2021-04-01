import fetch from './FetchInterceptor'

const authService = {}

authService.createAccount = function (payload) {
  // {
  //   "email": "bellomuba.rak0@gmail.com",
  //   "inviteCode": "488738",
  //   "firstName": "Mubarak",
  //   "lastName": "Bello",
  //   "password": "passwordmb"
  // }
  let data = {};
  data.email = payload.email;
  data.firstName = payload.firstName;
  data.lastName = payload.lastName;
  data.inviteCode = payload.inviteCode;
  data.password = payload.password;
  return fetch({
    url: '/api/admin/user-account',
    method: 'post',
    data: data,
    headers: {
      "public-request": "true",
    },
  })
}

authService.loginAccount = function (payload) {
  // {
  //   "email": "wathik.liker@iel.pw",
  //   "password": "passwordwl"
  // }
  let data = {};
  data.email = payload.email;
  data.password = payload.password;
  return fetch({
    url: '/api/admin/user-account/log-in',
    method: 'post',
    data: data,
    headers: {
      "public-request": "true",
    },
  })
}

export default authService