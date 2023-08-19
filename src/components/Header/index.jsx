import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';

export default function Header() {
  const { auth, signout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    signout();
    navigate('/');
  };
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid justify-content-center">
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
            {!auth.isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="nav-link">
                    Registro
                  </Link>
                </li>
              </>
            )}
            {auth.isLoggedIn && (
              <li className="nav-item">
                {' '}
                <button
                  type="button"
                  className="nav-link"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
