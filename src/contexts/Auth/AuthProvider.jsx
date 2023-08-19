import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';
import { AuthReducer, userInitialState } from './AuthReducer';
import { useApi } from '../../hooks/useApi';
import * as actions from './actions';

export function AuthProvider({ children }) {
  const [auth, dispatch] = useReducer(AuthReducer, userInitialState);
  const api = useApi();

  const signin = async (email, password, latitude = '', longitude = '') => {
    try {
      dispatch(actions.loginRequest());
      const { user, token } = await api.signin(
        email,
        password,
        latitude,
        longitude
      );
      if (user && token) {
        dispatch(actions.loginSuccess({ user, token }));
        return true;
      }
      dispatch(actions.loginFailure());
      return false;
    } catch (err) {
      dispatch(actions.loginFailure());
      return false;
    }
  };

  const signout = () => {
    dispatch(actions.loginFailure());
  };

  const validate = async () => {
    try {
      dispatch(actions.loginRequest());
      const data = auth.token ? await api.validateToken(auth.token) : '';
      if (data.user) {
        dispatch(actions.validateSuccess());
        return true;
      }
      dispatch(actions.loginFailure());
      return false;
    } catch (err) {
      dispatch(actions.loginFailure());
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ auth, signin, signout, validate }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
