import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Configs from '../pages/Configs';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route 
      path={"/:id"}
      children={<Configs/>} />
  </Switch>
);

export default Routes;
