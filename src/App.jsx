import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import GlobalStyles from './styles/GlobalStyles';
import RoutesAll from './routes';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <RoutesAll />
      <ToastContainer autoClose={3000} className="toast-container" />
    </BrowserRouter>
  );
}

export default App;
