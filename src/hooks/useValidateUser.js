import { toast } from 'react-toastify';
import { isEmail } from 'validator';

export function useValidateUser() {
  let errors = [];

  const validateName = (name) => {
    if (name.length < 3 || name.length > 255) {
      errors.push('Nome Inválido');
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    if (!isEmail(email)) {
      errors.push('E-mail Inválido');
      return false;
    }
    return true;
  };

  const validatePassword = (password, confirmPassword) => {
    if (password.length < 6 || password.length > 50) {
      errors.push('Senha Inválida');
      return false;
    }
    if (confirmPassword && confirmPassword !== password) {
      errors.push('Senha e Confirme a Senha devem ser iguais');
      return false;
    }
    return false;
  };

  const showErrors = () => {
    if (errors.length) {
      errors.forEach((error) => toast.error(error));
      errors = [];
      return true;
    }
    return false;
  };

  return { showErrors, validateName, validateEmail, validatePassword };
}
