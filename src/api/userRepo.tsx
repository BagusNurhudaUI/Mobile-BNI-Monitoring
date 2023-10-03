import {api, handleApiResponse} from './api';
import {getAuthToken} from './authRepo';
// const {user} = getLoginData();

export default {
  updateUserPasswordById(id: any, config: any) {
    return api
      .put(`/api/v1/user/password/${id}`, config)
      .catch(handleApiResponse);
  },

  loginUser(config: any) {
    return api.post('/api/v1/login', config, {
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    });
  },

  getUserById(id: any) {
    return api.get(`/api/v1/user/${id}`).catch(handleApiResponse);
  },
};
