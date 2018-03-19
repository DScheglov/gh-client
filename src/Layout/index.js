import React from 'react';
import { ConnectedRouter } from 'react-router-redux';

import { history } from '../history';
import UserNameForm from '../UserNameForm';
import Header from './Header';
import Footer from './Footer';
import Routes from './Routes';

const App = () => (
  <ConnectedRouter history={history}>
    <div className="container">
      <Header />
      <UserNameForm />
      <Routes />
      <Footer />
    </div>
  </ConnectedRouter>
);

export default App;
