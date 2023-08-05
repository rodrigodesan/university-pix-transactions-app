import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container } from '../../styles/GlobalStyles';
import { AuthContext } from '../../contexts/Auth/AuthContext';

export default function Login() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email && password) {
      const isLogged = await auth.signin(email, password);
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
      <h2>Faça login para acessar os dados</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu e-mail"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Digite sua senha"
      />
      <Button onClick={handleLogin}>Logar</Button>
      <div>
        Não possui uma conta? <Link to="/signup">Cadastre-se</Link>
      </div>
    </Container>
  );
}
