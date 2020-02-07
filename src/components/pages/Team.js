import React, { useEffect, useState } from "react";
import axios from "axios";
import CatCard from "../items/CatCard.js"
import { Switch, Route, Redirect, Link } from 'react-router-dom';



const Team = props => {
  const [cats, setCats] = useState([]);


  useEffect(() => {
    axios.get("http://battlecat.stark.mmi-unistra.fr/users/" + sessionStorage.getItem("userConnected") + "/cats").then(response => {
      setCats(response.data);
    });
  });

  return (
    <div>
        <h2>Mes chats</h2>
        <ul className="catDex">
        {cats.map(function(cat) {
          return (
            <Link to={'/cat_detail/' + cat.id}>
              <li key={cat.id}><CatCard cat={cat} /></li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};


export default Team;