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
    font-family: 'Roboto Slab', serif;
  }
  body {
    overflow-x: hidden;
  }


  .navbar-collapse {
    flex-grow: 0;
  }
`;

export const Container = styled(BootstrapContainer)`
  padding-top: 5rem;
  padding-bottom: 2.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-width: 100%;
  background-color: rgba(var(--bs-light-rgb), 1) !important;
`;

export const Button = styled(BootstrapButton)`
  position: relative;
`;

export const Loader = styled.div`
  position: absolute;
  z-index: 1001;
  width: 105%;
  height: 105%;
  top: -2%;
  left: -2%;
  border-collapse: collapse;
  background-color: rgba(var(--bs-light-rgb), 1);
  background-image: url(${loader});
  background-repeat: no-repeat;
  background-position: center;
  display: ${(props) => (props.isLoading ? 'block' : 'none')};
  overflow: hidden;
`;
