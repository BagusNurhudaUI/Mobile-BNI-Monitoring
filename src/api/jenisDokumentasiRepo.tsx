import {api, handleApiResponse} from './api';
import {getAuthToken} from './authRepo';
// const {user} = getLoginData();

export default {
  addJenisDokumentasi(config) {
    return api
      .post('/api/v1/jenisdokumentasi', config)
      .catch(handleApiResponse);
  },

  getJenisDokumentasi(config) {
    return api.get('/api/v1/jenisdokumentasi', config).catch(handleApiResponse);
  },

  getJenisDokumentasiEmr(config) {
    return api
      .get('/api/v1/jenisdokumentasi/web', config)
      .catch(handleApiResponse);
  },

  updateActivateJenisDokumentasi(id, config) {
    return api
      .put(`/api/v1/jenisdokumentasi/${id}`, config)
      .catch(handleApiResponse);
  },

  deleteJenisDokumentasi(id) {
    return api
      .delete(`/api/v1/jenisdokumentasi/${id}`)
      .catch(handleApiResponse);
  },

  getJenisDokumentasiById(id) {
    return api.get(`/api/v1/jenisdokumentasi/${id}`).catch(handleApiResponse);
  },

  updateJenisDokumentasi(id, config) {
    return api
      .put(`/api/v1/jenisdokumentasi/${id}`, config)
      .catch(handleApiResponse);
  },
};
