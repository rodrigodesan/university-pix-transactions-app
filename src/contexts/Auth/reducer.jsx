import axios from 'axios';
import * as types from '../contextTypes';

const authToken = localStorage.getItem('authToken') ?? '';
const authUser = localStorage.getItem('authUser')
  ? JSON.parse(localStorage.getItem('authUser'))
  : '';

export const userInitialState = {
  isLoggedIn: !!authUser,
  token: '' || authToken,
  user: {} || authUser,
  isLoading: false,
  errorMessage: null,
};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoading = false;
      localStorage.setItem('authUser', JSON.stringify(newState.user));
      localStorage.setItem('authToken', newState.token);
      return newState;
    }
    case types.LOGIN_FAILURE: {
      delete axios.defaults.headers.Authorization;
      localStorage.setItem('authUser', '');
      localStorage.setItem('authToken', '');
      const newState = { ...state, user: '', token: '', isLoggedIn: false };
      return newState;
    }
    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }
    case types.REGISTER_UPDATED_SUCCESS: {
      const newState = { ...state };
      const user = {
        nome: action.payload.nome,
        email: action.payload.email,
        id: action.payload.id,
      };
      newState.user = user;
      newState.isLoading = false;
      return newState;
    }
    case types.REGISTER_CREATED_SUCCESS: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }
    case types.REGISTER_FAILURE: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }
    case types.REGISTER_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }
    default:
      return state;
  }
};
