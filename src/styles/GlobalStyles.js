import styled, { createGlobalStyle } from 'styled-components';
import {
  Container as BootstrapContainer,
  Button as BootstrapButton,
} from 'react-bootstrap';
import loader from '../assets/loader.gif';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

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

export const Button = styled(BootstrapButton)`
  position: relative;
`;

export const Loader = styled.div`
  position: absolute;
  z-index: 1001;
  width: 110%;
  height: 110%;
  top: -5%;
  left: -5%;
  background-color: #fff;
  background-image: url(${loader});
  background-repeat: no-repeat;
  background-position: center;
  display: ${(props) => (props.isLoading ? 'block' : 'none')};
`;
