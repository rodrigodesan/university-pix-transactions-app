import axios from 'axios';
import { apiUrl } from '../constants/enviromentsVariables';

const api = axios.create({
  baseURL: apiUrl,
});

export const useApi = () => ({
  validateToken: async (token) => {
    const response = await api.post('/login/validate', { token });
    return response.data;
  },
  signin: async (email, password, latitude, longitude) => {
    const response = await api.post('/login', {
      email,
      password,
      latitude,
      longitude,
    });
    return response.data;
  },
  getLogins: () => {
    return api.get('/login');
  },
  setAuthorization: (token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  },
  removeAuthorization: () => {
    delete api.defaults.headers.Authorization;
  },
  signup: (name, email, password) => {
    return api.post('/users', { name, email, password });
  },
  question1: async (year) => {
    const response = await api.get(
      `/transations/max-min-avg-state-by-vl-per-qt?year=${year}&order=desc`
    );
    return response;
  },
});
