import React from 'react';
import { Route } from 'react-router';

import MessageCard from '../MessageCard';
import Main from './Main';

const Routes = () => (
  <React.Fragment>
    <Route path="/:userName" component={Main} />
    <Route exact path="/" component={MessageCard} />
  </React.Fragment>
);

export default Routes;
