import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;

// Use createRoot instead of ReactDOM.render
const root = createRoot(rootElement);
root.render(
  <Router>
    <App />
  </Router>
);
