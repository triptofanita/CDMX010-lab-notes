/* eslint-disable no-undef */
import React, { useState } from 'react'
import { auth } from './firebaseconfig'
import { useHistory } from 'react-router-dom'


export default function SignUp () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const spaHistory = useHistory();

    const clearFields = () => {
        setEmail('');
        setPassword('');
    }

    const userRegister = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
              alert(email + ' signed in succesfully', clearFields());
              spaHistory.push('/secret-notes')
            })   
            .catch(function(error) {
              console.log(e);
            });
            clearFields();
    }

    return (
        <div className="signup">
            <h2>My Secret Notes</h2>
            <h4>Sign up in the best taking note-app</h4>
                <div className="loginG">
                </div>
                    <div className="signupContainer">
                        <form onSubmit={userRegister} className="loginForm">
                            <input className="userName" type="text" placeholder="User name">
                            </input>
                            <input onChange={(e) => {setEmail(e.target.value)}} className="userMail" type="text" placeholder="E mail">
                            </input>
                            <input onChange={(e) => {setPassword(e.target.value)}} className="signupPass" type="password" placeholder="Password">
                            </input>
                            <input className="btnUserRegister" type="submit" value="Sign Up">
                            </input>
                        </form>
                    </div>
        </div>
    )
}