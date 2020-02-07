import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import axios from "axios";

const Login = props => {

  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [redirect, setRedirect] = useState(false);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/' />
    }
  }

  const handleChange = event => {
      switch (event.target.name) {
          case 'username':
              setUsername(event.target.value)
              break;

          case 'password':
              setPassword(event.target.value)
              break;
      
          default:
              break;
      }
  }

  const handleSubmit = event => {
      event.preventDefault();

      const user = {
          username: username,
          password: password,
      };

      axios.get(`http://battlecat.stark.mmi-unistra.fr/users/` + username + '/' + password).then(res => {
          if (res.data.length) {
            sessionStorage.setItem('userConnected', res.data[0]['id'])
            setRedirect(true)
          }
         
      })
  }

  return (
    <div>
      {renderRedirect()}
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
          <ul>
              <li>
                  <label>Identifiant : </label>
                  <input type="text" name="username" onChange={handleChange}></input>
              </li>
              <li>
                  <label>Mot de passe : </label>
                  <input type="password" name="password" onChange={handleChange}></input>
              </li>
              <button>Se connecter</button>
          </ul>
      </form>
  </div>
  );
};


export default Login;