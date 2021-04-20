import React from 'react'
import {useHistory} from 'react-router-dom'

export default function Home () {

  const history = useHistory();

  const handleHistoryLogin = () => {
    history.push('/signin')
  }

  const handleHistorySignup = () => {
    history.push('/signup')
  }

    return (
        <div className="home">
            <h2>My Secret Notes</h2>
            <h4>A safe place to keep your notes</h4>
          <div className="homeImgContainer">
            <img src={process.env.PUBLIC_URL + '/assets/img/note.png'} alt=""/>
          </div>
          <div className="homeBtn">
            <button onClick={handleHistoryLogin} className="signinBtn">Sign in</button>
            <button onClick={handleHistorySignup} className="signupBtn">Sign up</button>
          </div>
        </div>
    )
}

