import styled, { createGlobalStyle } from 'styled-components';
import { Container as BootstrapContainer } from 'react-bootstrap';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }


`;

export const Container = styled(BootstrapContainer)`
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
`;
