import axios from 'axios';
import {getAuthToken, saveAuthToken, removeAuthToken} from './authRepo';

let baseUrl: any;
// console.log(process.env.REACT_APP_NODE_ENV);
if (process.env.REACT_APP_NODE_ENV === 'production') {
  baseUrl = process.env.REACT_APP_API_HOST;
} else if (process.env.REACT_APP_NODE_ENV === 'local') {
  baseUrl = process.env.REACT_APP_API_LOCAL;
} else {
  baseUrl = 'https://bni-gme-development-staging-a4xuazxb4q-et.a.run.app';
}

export const api = axios.create({
  baseURL: baseUrl,
});

export const apiClient = baseUrl;

export const handleApiResponse = (response: any) => {
  console.log('response', response);

  if (
    response &&
    response.response &&
    response.response.data &&
    response.response.data.relog === true
  ) {
    removeAuthToken();
  }

  return response;
};

api.interceptors.request.use(async config => {
  const authToken = await getAuthToken(); // Retrieve token
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  if (!api.defaults.baseURL) {
    api.defaults.baseURL = baseUrl;
  }

  return config;
});
