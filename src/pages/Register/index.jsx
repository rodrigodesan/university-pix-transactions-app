import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { Button, Loader } from '../../styles/GlobalStyles';
import { FormContainer } from '../../styles/Forms';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { validateUser } from '../../utils/validateUser';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useApi } from '../../hooks/useApi';

export default function Register() {
  const { signin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const api = useApi();
  const { location } = useGeolocation();
  const { validateName, validateEmail, validatePassword, showErrors } =
    validateUser();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    validateName(name);
    validateEmail(email);
    validatePassword(password, confirmPassword);
    if (!showErrors()) {
      setIsLoading(true);
      try {
        const { data } = await api.signup(name, email, password);
        if (data.id) {
          await signin(
            email,
            password,
            location && location.latitude,
            location && location.longitude
          );
          toast.success('Cadastro realizado com sucesso');
          navigate('/');
        } else {
          toast.error('Dados inválidos');
        }
      } catch (err) {
        const errors = get(err, 'response.data.errors', []);
        errors.forEach((error) => toast.error(error));
      }
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <main className="form-signin w-100 m-auto">
        <form>
          <h1 className="h3 mb-3 fw-normal">Cadastre-se</h1>
          <div className="input-box">
            <div className="form-floating">
              <input
                type="text"
                value={name}
                id="name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">Nome</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                value={email}
                id="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                value={password}
                id="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Senha</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                value={confirmPassword}
                id="confirm-password"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="confirm-password">Confirme a Senha</label>
            </div>
          </div>
          <Button
            type="submit"
            onClick={handleSignup}
            disabled={!name || !email || !password || !confirmPassword}
            className="w-100 my-3"
          >
            <Loader isLoading={isLoading} />
            Cadastrar-se
          </Button>
        </form>
        <div>
          Já possui uma conta? <Link to="/login">Faça Login</Link>
        </div>
      </main>
    </FormContainer>
  );
}
