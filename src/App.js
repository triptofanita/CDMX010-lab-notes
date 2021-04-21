import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import './service/firebaseconfig';
import Home from './components/Home'
import SignUp from './components/SignUp';
import Login from './components/Login';
import CreateData from './components/CreateData';
import UserProvider from './service/UserProvider';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>

            <Route exact path='/signup'>
            <SignUp/>
            </Route>

            <Route exact path='/signin'>
            <Login/>
            </Route>

            <Route  exact path='/dashboard'>
              <CreateData/>
            </Route>
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
