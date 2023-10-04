import {api, handleApiResponse} from './api';

export default {
  addAsset(config) {
    return api.post('/api/v1/asset', config).catch(handleApiResponse);
  },

  getAsset(config) {
    return api.get('/api/v1/asset', config).catch(handleApiResponse);
  },

  updateActivateAsset(id) {
    return api.put(`/api/v1/asset/activate/${id}`).catch(handleApiResponse);
  },
  updateActivateAssetGPS(id) {
    return api.put(`/api/v1/asset/activategps/${id}`).catch(handleApiResponse);
  },

  getAssetById(id) {
    return api.get(`/api/v1/asset/${id}`).catch(handleApiResponse);
  },

  updateAsset(id, config) {
    return api.put(`/api/v1/asset/${id}`, config).catch(handleApiResponse);
  },

  assetUser(config) {
    return api.get(`/api/v1/assetuser`, config).catch(handleApiResponse);
  },

  validateAsset(id) {
    return api
      .post(`/api/v1/laporan/validateasset/${id}`, {
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      })
      .catch(handleApiResponse);
  },
};
