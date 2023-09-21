import styled from 'styled-components';
import { Container } from './GlobalStyles';

export const FormContainer = styled(Container)`
  text-align: center;

  .form-signin {
    max-width: 330px;
    padding: 15px;
  }

  .form-signin .form-floating:focus-within {
    z-index: 2;
  }

  .form-signin input[type='text'] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type='email'] {
    margin-bottom: -1px;
    border-radius: 0 !important;
  }
  .form-signin input[type='password'] {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .form-signin .form-floating:not(:last-child) input[type='password'] {
    margin-bottom: -1px;
    border-radius: 0;
  }
`;
