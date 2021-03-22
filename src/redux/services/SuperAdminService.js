import fetch from "./FetchInterceptor";

const superAdminServices = {};

superAdminServices.inviteAdmin = function (data) {
  return fetch({
    url: "/api/admin/super/user-account/user-invite",
    method: "post",
    data: {
      email: data.email,
    },
  });
};

superAdminServices.getAllAdminInvite = function (params) {
  return fetch({
    url: "/api/admin/super/user-account/user-invite",
    method: "get",
    params: {
      skip: params.skip,
      limit: params.limit,
    },
  });
};

superAdminServices.deleteUserInvite = function (params) {
  return fetch({
    url: `/api/admin/super/user-account/user-invite/${params.id}`,
    method: "delete",
  });
};

superAdminServices.getAdminLogs = function (params) {
  return fetch({
    url: '/api/admin/super/activities',
    method: 'get',
    params: {
      skip: params.skip,
      limit: params.limit,
      ...params
    }
  })
};

export default superAdminServices;
