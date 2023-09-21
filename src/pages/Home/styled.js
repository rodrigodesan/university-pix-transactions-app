import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { Loader as GlobalLoader } from '../../styles/GlobalStyles';

export const QuestionsBox = styled(Container)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  & > * {
    min-height: 100px;
  }
`;

export const Loader = styled(GlobalLoader)`
  background-position: center 6rem;
  background-color: rgba(255, 255, 255, 0.7);
`;
