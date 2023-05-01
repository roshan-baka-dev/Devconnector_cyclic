import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from 'react-router-dom';
import './App.css';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';

import Login from './component/auth/Login';
import Register from './component/auth/Register';

// redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>
        <section>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
