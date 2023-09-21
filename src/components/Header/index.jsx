import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';

import { Nav } from './styled';

export default function Header() {
  const { auth, signout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    signout();
    navigate('/');
  };
  const btnLogout = (
    <button type="button" className="btn btn-secondary" onClick={handleLogout}>
      Sair
    </button>
  );
  return (
    <Nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid justify-content-between">
        <Link to="/" className="navbar-brand">
          <img src="/logo-pix.png" alt="Logo" />
          PixTransactions
        </Link>
        {auth.isLoggedIn && (
          <>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/locations" className="nav-link">
                    Localizações
                  </Link>
                </li>
                <li className="nav-item d-lg-none">{btnLogout}</li>
              </ul>
            </div>
            <div className="d-none d-lg-block">
              <span className="me-2">Olá, {auth.user.name}</span>
              {btnLogout}
            </div>
          </>
        )}
      </div>
    </Nav>
  );
}
