import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <Router>
      <Routes />
    </Router>
  </>
);

export default App;
