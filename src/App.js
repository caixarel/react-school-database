
import './App.css';
import React from "react";
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse'
import Header from './components/Header'
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import { Provider } from './Context';
import PrivateRoute from './components/PrivateRoute';
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Courses from './components/Courses';

function App() {
 
//routes used for the app
  return (
    <Provider >
      <Router >
            <Header />
            <Switch >
              <Route exact path='/' component={Courses} />
              <PrivateRoute exact path='/courses/create' component={CreateCourse} />
              <PrivateRoute exact path='/courses/:id/update' component={UpdateCourse} />
              <Route exact path='/courses/:id' component={CourseDetail} />
              <Route exact path='/signin' component={UserSignIn} />
              <Route exact path='/signup' component={UserSignUp} />
              <Route exact path='/signout' component={UserSignOut} />
              <Route exact path='/error' component={UnhandledError} />
              <Route exact path='/notfound' component={NotFound} />
              <Route exact path='/forbidden' component={Forbidden} />
              <Route component={NotFound} />
            </Switch>
          </Router>
    </Provider>
  );
}

export default App;
