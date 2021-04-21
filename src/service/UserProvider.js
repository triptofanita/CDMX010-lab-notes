/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useEffect, createContext} from 'react';
import {auth} from './firebaseconfig';
export const UserContext = createContext({user:null});

export default (props) => {
    const [user, setUser] = useState(null);

    const authListener = () => {
      auth.onAuthStateChanged(user => {
        if(user){
          const {email} = user;
          setUser({
            email});
              console.log(user.email)
        }else{
          setUser(!user)
        }
      });
    }

    useEffect(() => {
     authListener();
    }, [])

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  )
}
