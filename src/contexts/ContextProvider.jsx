import PropTypes from 'prop-types';
import { AuthProvider } from './Auth/AuthProvider';

export default function ContextProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

ContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
