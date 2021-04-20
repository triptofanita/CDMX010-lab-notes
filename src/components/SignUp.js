/* eslint-disable no-undef */
import React, { useState} from 'react'
import { auth } from '../service/firebaseconfig'
import { useHistory } from 'react-router-dom'
import SignupWithGoogle from './SignupWithGoogle';

export default function SignUp (props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const clearFields = () => {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }

    const history = useHistory();

    const handleConfirmPassword = () => {
      if(password.lenght < 6){
        alert('Your password must be at least 6 characters long.')
        setPassword('');
        setConfirmPassword('');
        return false;
      }
      if (password !== confirmPassword){
        alert('Your passwords do not match. Please try again')
        setPassword('');
        setConfirmPassword('');
        return false;
      }
      return true;
    }

    const handleSignup = () => {
      if (handleConfirmPassword()){
        auth.createUserWithEmailAndPassword(email,password)
        .then(result =>{
          alert (email + ' signed in succesfully', clearFields());
        })
         .catch(function(error){
        const errorCode = error.Code;
        const errorMessage = error.Message;
        if (errorCode === 'auth/weak-password'){
          alert('The password is too weak.');
        }else{
          alert(errorMessage);
        }
        console.log(error);
      });
        clearFields();
        history.push('/dashboard');
      }
    }

    return (
        <div className="signup">
            <h2>My Secret Notes</h2>
            <h4>Sign up in the best taking-note app</h4>
                  <SignupWithGoogle/>
                <div className="likeSignup">
                  <img src={process.env.PUBLIC_URL + '/assets/img/like.svg'} alt=""/>
                </div>
                    <div className="signupContainer">
                        <form className="signupForm">
                            <input onChange={handleEmail} className="userMail" type="text" value={email} placeholder="e mail">
                            </input>
                            <input onChange={handlePassword} className="signupPass" type="password" value={password} placeholder="password">
                            </input>
                            <input onChange={handleConfirmPasswordChange} className="signupPass" id="passConfirm" type="password" value={confirmPassword} placeholder="password">
                            </input>
                            <input onClick={handleSignup} className="btnUserRegister" type="submit" value="Sign Up">
                            </input>
                        </form>
                    </div>
        </div>
    )
}
