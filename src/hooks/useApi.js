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

  getYears: () => {
    return api.get('/years');
  },
  getStates: () => {
    return api.get('/states');
  },
  getRegions: () => {
    return api.get('/regions');
  },
  question1: (year) => {
    return api.get(
      `/transactions/max-min-avg-state-by-vl-per-qt?year=${year}&order=desc`
    );
  },
  question2: (year) => {
    return api.get(
      `/transactions/max-min-avg-state-by-vl-per-qt?year=${year}&order=asc`
    );
  },
  question3: (year) => {
    return api.get(`/transactions/max-pix-avg-region?year=${year}`);
  },
  question4: (year) => {
    return api.get(`/transactions/pix-by-region?year=${year}`);
  },
  question5: (year, selectedMonths) => {
    return api.get(
      `transactions/cities-with-most-individual-transactions?year=${year}&months=${selectedMonths}`
    );
  },
  question6: (minAvg) => {
    return api.get(
      `transactions/higher-avg-on-vl-company-payer?minAvg=${minAvg}`
    );
  },
  question7: (year) => {
    return api.get(
      `/transactions/cities-diff-in-transaction-vl?year=${year}&order=asc`
    );
  },
  question8: (year) => {
    return api.get(
      `/transactions/cities-diff-in-transaction-vl?year=${year}&order=desc`
    );
  },
  question9: (year, state) => {
    return api.get(
      `/transactions/highest-transaction-vl-state-year?year=${year}&state=${state}`
    );
  },
  question10: (region) => {
    return api.get(
      `/transactions/highest-transaction-vl-region?region=${region}`
    );
  },
});
