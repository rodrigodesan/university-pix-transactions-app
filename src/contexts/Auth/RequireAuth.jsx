import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useApi } from '../../hooks/useApi';

export default function RequireAuth({ children }) {
  const { signout, auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const api = useApi();

  const validateToken = useCallback(async () => {
    try {
      const data = auth.token ? await api.validateToken(auth.token) : '';
      if (!data || data.errors) {
        signout();
        navigate('/login');
      } else {
        api.setAuthorization(auth.token);
      }
    } catch (err) {
      signout();
      navigate('/login');
    }
  }, [signout, navigate, auth, api]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};
