import React, { useEffect, useState } from "react";
import axios from "axios";
import { Switch, Route, Redirect, Link } from 'react-router-dom';


import BreedImage from "../items/BreedImage.js";


const WildCat = props => {
  const [userCat, setUserCat] = useState([]);
  const [enemyCat, setEnemyCat] = useState([]);


  const headers = {
    'x-api-key': '80ad793a-81c0-4987-a01a-cdf448c1b68d'
  }

  useEffect(() => {
    axios.get("http://battlecat.stark.mmi-unistra.fr/cats/" + props.match.params.cat).then(response => {
      setUserCat(response.data);
    });

    axios.get("https://api.thecatapi.com/v1/breeds", {headers}).then(response => {
      let breed = response.data[Math.floor(Math.random() * response.data.length)];

      let life_span = breed.life_span.split(" - ");
      life_span = life_span[Math.floor(Math.random() * life_span.length)]

      let strength = breed.weight.metric.split(" - ");
      strength = strength[Math.floor(Math.random() * strength.length)]

      axios.get("https://api.thecatapi.com/v1/images/search?breed_ids=" + breed.id, {headers}).then(response => {
      if (response.data[0]) {
        let image_url = response.data[0].url;

        setEnemyCat({
          breed: breed.name,
          breed_id: breed.id,
          strength: strength,
          hp_max: life_span,
          image_url: image_url
        })

      }

      
    });

    });

    
  }, []);

  const DisplayEnemy = () => {
    if (enemyCat.breed_id) {
      return (
        <div className="enemyCat">
          <h2>Un {enemyCat.breed} sauvage apparaît.</h2>
          <img src={enemyCat.image_url} alt=""></img>
          <Link className="ghostButton" to={{
            pathname: "/fight",
            fightProps: {
              userCat: userCat,
              enemyCat: enemyCat
            }
          }} >Combattre</Link>
          <Link className="ghostButton" to="/search_cat">Fuir</Link>
        </div>
      )
    } else {
      return (
        <p>Chargement...</p>
      )
    }
    
  }

  return (
    <DisplayEnemy />

    
  );
};

export default WildCat;