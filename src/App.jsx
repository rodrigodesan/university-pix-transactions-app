import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import GlobalStyles from './styles/GlobalStyles';
import RoutesAll from './routes';
import ContextProvider from './contexts/ContextProvider';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <GlobalStyles />
        <RoutesAll />
        <ToastContainer autoClose={3000} className="toast-container" />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
