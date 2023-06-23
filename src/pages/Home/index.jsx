import Question1 from '../../components/Question1';

import { Container } from '../../styles/GlobalStyles';

export default function Home() {
  return (
    <Container>
      <h1 className="text-center">Perguntas</h1>
      <Question1 />
    </Container>
  );
}
