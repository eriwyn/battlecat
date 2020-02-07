import React, { useEffect, useState } from "react";
import axios from "axios";
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import CatCard from "../items/CatCard.js"


const SearchCat = props => {
  const [cats, setCats] = useState([]);


  useEffect(() => {
    axios.get("http://battlecat.stark.mmi-unistra.fr/users/" + sessionStorage.getItem("userConnected") + "/cats").then(response => {
      setCats(response.data);
    });
  }, []);


  return (
    <div>
        <h2>Choisissez quel chat vous voulez prendre avec vous</h2>
        <ul className="catDex">
        {cats.map(function(cat) {
          return (
            <li key={cat.id}>
              <Link to={'/wild_cat/' + cat.id}>
                <CatCard cat={cat} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchCat;