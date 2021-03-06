import fetch from "auth/FetchInterceptor";

const JwtAuthService = {};

JwtAuthService.login = function (data) {
  return fetch({
    url: "https://jsonplaceholder.typicode.com/todos",
    method: "get",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

JwtAuthService.signUp = function (data) {
  return fetch({
    url: "/posts",
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

export default JwtAuthService;
