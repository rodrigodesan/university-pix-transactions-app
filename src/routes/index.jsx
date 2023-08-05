import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import RequireAuth from '../contexts/Auth/RequireAuth';
import Home from '../pages/Home';
import Page404 from '../pages/Page404';
import Login from '../pages/Login';
import { Button } from '../styles/GlobalStyles';
import { AuthContext } from '../contexts/Auth/AuthContext';
import Signup from '../pages/Signup';

export default function RoutesAll() {
  const { auth, signout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    signout();
    navigate('/');
  };
  return (
    <>
      {auth.isLoggedIn && <Button onClick={handleLogout}>Sair</Button>}

      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
