import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Nav';
import './index.css';
import Routes from './routes';

const App: React.FC = () => (
  <>
    {/* <head>
      <title>Antonio Carlos</title>
      <link rel="icon" href="/favicon.ico" />
    </head> */}

    <Router>
      <Nav />
      <Routes />
    </Router>
  </>
);

export default App;
