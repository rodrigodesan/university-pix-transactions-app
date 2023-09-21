import { Routes, Route } from 'react-router-dom';
import RequireAuth from '../contexts/Auth/RequireAuth';

import LoginRoute from './LoginRoute';
import HomeRoute from './HomeRoute';

import Home from '../pages/Home';
import Locations from '../pages/Locations';
import Page404 from '../pages/Page404';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function RoutesAll() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/locations"
        element={
          <RequireAuth>
            <Locations />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<LoginRoute element={<Login />} />} />
      <Route path="/signup" element={<LoginRoute element={<Register />} />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
