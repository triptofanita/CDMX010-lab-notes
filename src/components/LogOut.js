import React, {useState, useEffect} from 'react';
import 'firebase/auth';
import {auth} from '../service/firebaseconfig';
import {useHistory} from 'react-router-dom';


export default function LogOut () {

  // eslint-disable-next-line no-unused-vars
  const [user,setUser]= useState('');
  const history = useHistory();

    const handleLogout = () =>
      auth.signOut()
      .then((result) => {
        alert(user.email + ' Sign out succesfully');
        history.push('/');
      }).catch(function(error){
        alert('An error hapepend');
      });


    const authListener = () => {
      auth.onAuthStateChanged(user => {
        if(user){
          setUser(user);
          console.log(user.email )
        }else{
          setUser('')
        }
      });
    }

    useEffect(() => {
     authListener();
    }, [])


  return (
    <div className="navbar">
          <img onClick={handleLogout} src={process.env.PUBLIC_URL + './assets/img/on-off-button.png'} alt="" className="btnLogOut" type="submit" value="logout"></img>
    </div>
  )
}
