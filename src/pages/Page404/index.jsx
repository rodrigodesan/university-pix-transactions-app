import { Link } from 'react-router-dom';

import { Container, Button } from '../../styles/GlobalStyles';

export default function Page404() {
  return (
    <Container className="text-center">
      <h1>Erro 404 - Página não encontrada</h1>
      <Link to="/">
        <Button>Voltar para a página inicial</Button>
      </Link>
    </Container>
  );
}
