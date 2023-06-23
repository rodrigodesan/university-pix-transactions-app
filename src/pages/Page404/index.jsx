import { Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';

export default function Page404() {
  return (
    <Container className="text-center">
      <h1>Erro 404 - Página não encontrada</h1>
      <Link to="/" className="btn btn-primary">
        Voltar para a página inicial
      </Link>
    </Container>
  );
}
