import fetch from "../../auth/FetchInterceptor";

const generalService = {};

generalService.checkHealth = function () {
  return fetch({
    url: "/health",
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

generalService.getAllUsers = function (params) {
  return fetch({
    url: "/user-account",
    method: "get",
    params: {
      page: params.skip,
      per_page: params.limit,
      type:params.type || "BASIC_USER",
    },
  });
};

generalService.getUserDetails = function (params) {
  return fetch({
    url: `/user-account/${params.id}`,
    method: "get",
  });
};

generalService.getValidCoins = function (params) {
  return fetch({
    url: "/admin/misc/get-valid-coins/",
    method: "get",
  });
};

generalService.getValidFiats = function (params) {
  return fetch({
    url: "/admin/misc/get-valid-fiats/",
    method: "get",
  });
};
generalService.getUserFiats = function (params) {
  return fetch({
    url: "/misc/fiat-currencies",
    method: "get",
  });
};
generalService.getUserCoins = function (params) {
  return fetch({
    url: "/misc/crypto-currencies",
    method: "get",
  });
};
generalService.getCardCurrency = function (params) {
  return fetch({
    url: "/misc/card-currencies",
    method: "get",
  });
};
generalService.getGiftCards = function (params) {
  return fetch({
    url: "/admin/cards",
    method: "get",
    params: {
      page: params.skip || 0,
      per_page: params.limit,
    },
  });
};
generalService.getGiftCardsDetailsById = function (params) {
  return fetch({
    url: `/cards/${params.id}`,
    method: "GET",
  });
};

export default generalService;
