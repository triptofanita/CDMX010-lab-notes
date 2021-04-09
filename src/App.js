import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import './components/firebaseconfig';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import CreateData from './components/CreateData';




function App() {
  return (
    <Router>
        <Link>Start</Link>

        <Link>Sign Up</Link>

        <Link>Login</Link>

        <Link>Notes</Link>
    <Switch>

      <Route path='/home'>
        <Home/>
      </Route>

      <Route path='/signup'>
        <SignUp/>
      </Route>

      <Route path='/login'>
        <Login/>
      </Route>

      <Route path='/secret-notes'>
        <div className="App">
          <CreateData/>
        </div>
      </Route>

    </Switch>

    </Router>
  );
}

export default App;
