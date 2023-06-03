import React, { Fragment, useEffect } from 'react';
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

import Alert from './component/layout/Alert';
// redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './component/dashboard/Dashboard';
import PrivateRoute from './component/routing/PrivateRoute';
import CreateProfile from './component/profile_form/CreateProfile';
import EditProfile from './component/profile_form/EditProfile';
import AddExperience from './component/profile_form/AddExperience';
import AddEducation from './component/profile_form/AddEducation';
import Profiles from './component/profiles/Profiles';
import Profile from './component/profile/Profile';
import Posts from './component/posts/Posts';
import Post from './component/post/Post';
// console.log(typeof Profile);
// import { createStore, applyMiddleware } from 'redux';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

// const store = createStore(() => [], {}, applyMiddleware());
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
          </Routes>
          <section className='container'>
            <Alert />
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profiles' element={<Profiles />} />
              <Route path='/profile/:id' element={<Profile />} />

              {/* private Routes */}
              <Route element={<PrivateRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/create-profile' element={<CreateProfile />} />
                <Route path='/edit-profile' element={<EditProfile />} />
                <Route path='/add-experience' element={<AddExperience />} />
                <Route path='/add-education' element={<AddEducation />} />
                <Route path='/posts' element={<Posts />} />
                <Route path='/posts/:id' element={<Post />} />
              </Route>
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
