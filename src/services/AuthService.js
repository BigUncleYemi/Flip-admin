import fetch from 'auth/FetchInterceptor'

const authService = {}

authService.loginAdmin = function (payload) {
  // {
  //   "email": "wathik.liker@iel.pw",
  //   "password": "passwordwl"
  // }
  let data;
  data.email = payload.email;
  data.password = payload.password;

  return fetch({
    url: '/admin/user-account/sign-in',
    method: 'post',
    data: data,
    headers: {
      "public-request": "true",
    },
  })
}

export default authService