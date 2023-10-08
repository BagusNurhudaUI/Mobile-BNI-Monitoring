import {api, handleApiResponse} from './api';

export default {
  addReport(config) {
    return api.post('/api/v1/laporan', config).catch(handleApiResponse);
  },

  getReports(config) {
    return api.get('/api/v1/laporan/summary', config).catch(handleApiResponse);
  },

  getReportById(id) {
    return api.get(`/api/v1/laporan/${id}`).catch(handleApiResponse);
  },

  getReportExport(config) {
    return api.get('/api/v1/report', config).catch(handleApiResponse);
  },

  getReportExportDaily(config) {
    return api.get('/api/v1/reportdaily', config).catch(handleApiResponse);
  },

  deleteReportById(id) {
    return api.delete(`/api/v1/laporan/${id}`).catch(handleApiResponse);
  },

  getReportExportPDFAsset(id, config) {
    return api
      .get(`/api/v1/report/asset/${id}`, config)
      .catch(handleApiResponse);
  },

  getReportOperator(config) {
    return api.get(`/api/v1/report/operator`, config).catch(handleApiResponse);
  },
};
