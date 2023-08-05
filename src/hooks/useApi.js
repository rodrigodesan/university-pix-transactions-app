import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const useApi = () => ({
  validateToken: async (token) => {
    const response = await api.post('/login/validate', { token });
    return response.data;
  },
  signin: async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
  },
  setAuthorization: (token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  },
});
