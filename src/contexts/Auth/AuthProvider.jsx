import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';
import { AuthReducer, userInitialState } from './reducer';
import { useApi } from '../../hooks/useApi';
import * as actions from './actions';

export function AuthProvider({ children }) {
  const [auth, dispatch] = useReducer(AuthReducer, userInitialState);
  const api = useApi();

  const signin = async (email, password) => {
    try {
      dispatch(actions.loginRequest());
      const { user, token } = await api.signin(email, password);
      if (user && token) {
        dispatch(actions.loginSuccess({ user, token }));
        api.setAuthorization(auth.token);
        return true;
      }
      dispatch(actions.loginFailure);
      return false;
    } catch (err) {
      dispatch(actions.loginFailure);
      return false;
    }
  };

  const signout = () => {
    dispatch(actions.loginFailure());
  };

  return (
    <AuthContext.Provider value={{ auth, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
