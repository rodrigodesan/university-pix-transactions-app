import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';

export default function RequireAuth({ children }) {
  const { validate } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateRef = useRef(validate);

  const validateToken = useCallback(async () => {
    try {
      const isValid = await validateRef.current();
      if (!isValid) navigate('/login');
    } catch (err) {
      toast.error('Token inválido');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};
