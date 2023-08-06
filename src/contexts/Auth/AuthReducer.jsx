import { useApi } from '../../hooks/useApi';
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
  const api = useApi();
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoading = false;
      localStorage.setItem('authUser', JSON.stringify(newState.user));
      localStorage.setItem('authToken', newState.token);
      api.setAuthorization(newState.token);
      return newState;
    }
    case types.LOGIN_FAILURE: {
      api.removeAuthorization();
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
    default:
      return state;
  }
};
