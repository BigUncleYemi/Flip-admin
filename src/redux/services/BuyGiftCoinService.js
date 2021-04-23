import fetch from '../../auth/FetchInterceptor'

const buyGiftCoinService = {};

buyGiftCoinService.getNewBuyGiftCardTransaction = function (params) {
  return fetch({
    url: "/admin/buy-cards/get-new-transactions",
    method: "get",
    params: {
      skip: params.skip,
      limit: params.limit,
      types: params.types || "",
    },
  });
};

buyGiftCoinService.getAllBuyGiftCardTransaction = function (params) {
  return fetch({
    url: "/admin/buy-cards/transactions",
    method: "get",
    params: {
      skip: params.skip,
      limit: 999999 || params.limit,
      status: params.status || "",
    },
  });
};

buyGiftCoinService.getASingleBuyGiftCardTransaction = function (params) {
  return fetch({
    url: `/admin/buy-cards/${params.transactionId}`,
    method: "get",
  });
};

buyGiftCoinService.getBuyGiftCardSettings = function () {
  return fetch({
    url: `/admin/buy-cards/settings`,
    method: "get",
  });
};

buyGiftCoinService.updateBuyGiftCardSettings = function (data) {
  return fetch({
    url: `/admin/buy-cards/settings`,
    method: "put",
    data,
  });
};

buyGiftCoinService.updateBuyGiftCardStatus = function (data) {
  return fetch({
    url: `/admin/buy-cards/${data.transactionId}/update-status`,
    method: "post",
    data: {
      status: data.status,
      comment: data.comment,
    },
  });
};
export default buyGiftCoinService;
