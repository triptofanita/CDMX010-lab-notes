import React, { useContext, useEffect, useState } from 'react';
import { signInWithGoogle } from '../service/firebaseconfig';
import { UserContext } from '../service/UserProvider';
import { Redirect } from 'react-router-dom';

export default function SignupWithGoogle() {
  const user = useContext(UserContext);
  const [redirect, setRedirect] = useState('');


  useEffect(() => {
    if (user) {
      setRedirect('/dashboard');
    }
  }, [user])

  if (redirect) {
    <Redirect to ={redirect}/>
  }

  return (
    <div className="signupG">
      <button onClick={signInWithGoogle} className="buttonLoginG" id="btnSigninGoogle">Sign in with Google</button>
      <button onClick={signInWithGoogle} className="buttonLoginG" id="btnSignupGoogle">Sign up with Google</button>
    </div>
  );
}

