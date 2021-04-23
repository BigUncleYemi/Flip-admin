import fetch from '../../auth/FetchInterceptor'

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

superAdminServices.makeAdmin = function (data) {
  return fetch({
    url: "/admin/user-account/add-admin",
    method: "post",
    data: {
      userId: data.userId,
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

superAdminServices.removeAdmin = function (params) {
  let data = {};
  data.userId = params.id;
  return fetch({
    url: `/admin/user-account/remove-admin/${params.id}`,
    method: "post",
    data: {
      userId: data.userId,
    },
  });
};

superAdminServices.getAdminLogs = function (params) {
  return fetch({
    url: "/admin/user-account/activities",
    method: "get",
    params: {
      page: params.skip | 0,
      per_page: params.limit | 0,
      ...params,
    },
  });
};

export default superAdminServices;
