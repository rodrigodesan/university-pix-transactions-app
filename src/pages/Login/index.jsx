import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, Loader } from '../../styles/GlobalStyles';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { validateUser } from '../../utils/validateUser';
import { useGeolocation } from '../../hooks/useGeolocation';

export default function Login() {
  const { auth, signin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { location } = useGeolocation();
  const { validateEmail, validatePassword, showErrors } = validateUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);
    if (!showErrors()) {
      const isLogged = await signin(
        email,
        password,
        location && location.latitude,
        location && location.longitude
      );
      if (isLogged) {
        toast.success('Login realizado com sucesso');
        navigate('/');
      } else {
        toast.error('Usuário ou senha inválidos');
      }
    }
  };

  return (
    <Container>
      <h1>Login</h1>

      <form className="col-lg-6">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            id="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type="password"
            value={password}
            id="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>
        <Button
          type="submit"
          onClick={handleLogin}
          disabled={!email || !password}
        >
          <Loader isLoading={auth.isLoading} />
          Logar
        </Button>
      </form>
      <div>
        Não possui uma conta? <Link to="/signup">Cadastre-se</Link>
      </div>
    </Container>
  );
}
