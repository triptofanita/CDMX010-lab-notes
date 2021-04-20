import React, {useState} from 'react';
import {auth} from '../service/firebaseconfig';
import {useHistory} from 'react-router-dom';
import SignupWithGoogle from './SignupWithGoogle';

export default function Login (props) {

  const [emailUser, setEmailUser] =useState('');
  const [passwordUser, setPasswordUser] =useState('');

  const handleSigninEmail = (e) => setEmailUser(e.target.value);
  const handleSinginPass = (e) => setPasswordUser(e.target.value);

  const history = useHistory();

  const clearFields = () => {
    setEmailUser('');
    setPasswordUser('');
  }

  const logUserIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(emailUser, passwordUser)
      .then(result =>{
        alert(emailUser + ' signed in successfully', clearFields());
        history.push('/dashboard')
      })
      .catch(function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/weak-password'){
          alert('The password is too weak.');
        }else{
          alert(errorMessage);
        }
        clearFields();
        console.log(error);
      })
  }

    return (
        <div className="login">
            <h2>My Secret Notes</h2>
            <h4>Welcome back!</h4>
            <div className="loginG">
              <SignupWithGoogle/>
                </div>
                <div className="likeLogin">
                  <img src={process.env.PUBLIC_URL + '/assets/img/likeinpink.svg'} alt=""/>
                </div>
                    <div className="loginContainer">
                        <form className="signupForm">
                            <input onChange={handleSigninEmail} className="loginEmail" type="text" placeholder="e mail">
                            </input>
                            <input onChange={handleSinginPass} className="loginPass" type="password" placeholder="password">
                            </input>
                            <input onClick={logUserIn} className="btnUserLogin" type="submit" value="Sign in">
                            </input>
                        </form>
                    </div>
        </div>
    )
}
