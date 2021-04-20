
import React from 'react'
import firebase from 'firebase/app';

function SignupWithGoogle() {

  const googleSignIn = (e) => {
    e.preventDefault(e);
    const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider)
        .then((result) => {
        })
        .catch((error) => {
          console.log(error);
        });
  }

  return (
    <div className="signupG">
      <button onClick={googleSignIn} className="buttonLoginG" id="btnSigninGoogle">Sign in with Google</button>
      <button onClick={googleSignIn} className="buttonLoginG" id="btnSignupGoogle">Sign in with Google</button>
    </div>
  )
}

export default SignupWithGoogle
