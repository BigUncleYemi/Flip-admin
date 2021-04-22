import fetch from "./FetchInterceptor";

const superAdminServices = {};

superAdminServices.inviteAdmin = function (data) {
  return fetch({
    url: "/admin/user-account/add-admin",
    method: "post",
    data: {
      userId: data.UserId,
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
  let data = {};
  data.userId = params.id;
  return fetch({
    url: `/admin/user-account/remove-admin/${params.id}`,
    method: "post",
    data: data,
  });
};

superAdminServices.getAdminLogs = function (params) {
  return fetch({
    url: "/api/admin/super/activities",
    method: "get",
    params: {
      skip: params.skip,
      limit: params.limit,
      ...params,
    },
  });
};

export default superAdminServices;
