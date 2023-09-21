import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Loader } from '../../styles/GlobalStyles';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { validateUser } from '../../utils/validateUser';
import { useGeolocation } from '../../hooks/useGeolocation';
import { FormContainer } from '../../styles/Forms';

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
        navigate('/home');
      } else {
        toast.error('Usuário ou senha inválidos');
      }
    }
  };

  return (
    <FormContainer>
      <main className="form-signin w-100 m-auto">
        <form>
          <h1 className="h3 mb-3 fw-normal">Faça Login</h1>
          <div className="form-floating">
            <input
              type="email"
              value={email}
              id="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
            />
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              value={password}
              id="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
            <label htmlFor="password" className="form-label">
              Senha
            </label>
          </div>
          <Button
            type="submit"
            onClick={handleLogin}
            disabled={!email || !password}
            className="w-100 my-3"
          >
            <Loader isLoading={auth.isLoading} />
            Logar
          </Button>
        </form>
        <div>
          Não possui uma conta? <Link to="/signup">Cadastre-se</Link>
        </div>
      </main>
    </FormContainer>
  );
}
