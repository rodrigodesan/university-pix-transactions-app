import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { Button, Container, Loader } from '../../styles/GlobalStyles';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useValidateUser } from '../../hooks/useValidateUser';
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
    useValidateUser();
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
    <Container>
      <h2>Faça login para acessar os dados</h2>

      <form className="col-lg-6">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nome
          </label>
          <input
            type="text"
            value={name}
            id="name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirme a Senha
          </label>
          <input
            type="password"
            value={confirmPassword}
            id="confirm-password"
            className="form-control"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
          />
        </div>
        <Button
          type="submit"
          onClick={handleSignup}
          disabled={!name || !email || !password || !confirmPassword}
        >
          <Loader isLoading={isLoading} />
          Cadastrar-se
        </Button>
      </form>
      <div>
        Já possui uma conta? <Link to="/login">Faça Login</Link>
      </div>
    </Container>
  );
}
