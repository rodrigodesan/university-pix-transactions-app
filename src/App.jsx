import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';
import RoutesAll from './routes';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <RoutesAll />
    </BrowserRouter>
  );
}

export default App;
