import React, { useEffect, useState } from "react";
import axios from "axios";
import { Switch, Route, Redirect, Link } from 'react-router-dom';


const Summon = props => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("http://battlecat.stark.mmi-unistra.fr/users/" + sessionStorage.getItem("userConnected")).then(response => {
      setUser(response.data[0]);
    });
  }, []);

  return (
    <div>
        <h2>Invoquer un chat</h2>
        <p>Vous avez {user.points} points.</p>
        <Link to={'/generate_cat/'} className="ghostButton">Invoquer un chat ? (10 points)</Link>
    </div>
  );
};


export default Summon;