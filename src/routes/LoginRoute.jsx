import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth/AuthContext';

export default function LoginRoute({ element }) {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn) navigate('/');
  }, [auth, navigate]);

  return element;
}

LoginRoute.propTypes = {
  element: PropTypes.element.isRequired,
};
