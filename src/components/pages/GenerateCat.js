import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import axios from "axios";

import BreedImage from "../items/BreedImage.js";


const GenerateCat = props => {
  const [user, setUser] = useState({});
  const [breed, setBreed] = useState({});
  const [redirect, setRedirect] = useState(false);


  const headers = {
    'x-api-key': '80ad793a-81c0-4987-a01a-cdf448c1b68d'
  }

  useEffect(() => {
    axios.get("http://battlecat.stark.mmi-unistra.fr/users/" + sessionStorage.getItem("userConnected")).then(response => {
      response.data[0].points -= 10;
      setUser(response.data[0]);
    });

    axios.get("https://api.thecatapi.com/v1/breeds", {headers}).then(response => {
      setBreed(response.data[Math.floor(Math.random() * response.data.length)]);
    });
  }, []);

  let catName = "";

  const handleChange = event => {
    catName = event.target.value
  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/team' />
    }
  }

  const handleSubmit = event => {
    event.preventDefault();

    let life_span = breed.life_span.split(" - ");
    life_span = life_span[Math.floor(Math.random() * life_span.length)]

    let strength = breed.weight.metric.split(" - ");
    strength = strength[Math.floor(Math.random() * strength.length)]

    const cat = {
      breed: breed.name,
      name: catName,
      image_url: document.querySelector('.raceDetails img').src,
      strength: strength,
      hp_max: life_span,
      in_team: false,
      user_id: user.id,
      user_id: user.id
    }

    axios.put("http://battlecat.stark.mmi-unistra.fr/users/" + sessionStorage.getItem("userConnected"), {points: user.points - 10});
    axios.post(`http://battlecat.stark.mmi-unistra.fr/cats`, cat);

    setRedirect(true)
  }
  

  const DisplayCat = () => {
    if (breed.name) {
      return (
        <div>
          <h2>Invocation réussie</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="catName" id="catId" placeholder="Entrez son nom"  onChange={handleChange}></input>
            <button>Valider</button>
          </form>
          <div className = "raceDetails">
          <h3>{breed.name}</h3>
          <BreedImage race={breed.id} />
          <p>{breed.description}</p>
          <ul>
            <li>Espérance de vie : {breed.life_span} ans</li>
            <li>Attitude : {breed.temperament}</li>
            <li>Intelligence : {breed.intelligence}</li>
          </ul>
          </div>
          <p>Vous avez <strong>{user.points}</strong> points.</p>
        </div>
      );
    } else {
      return (<p>Invocation...</p>)
    }
  }

  return (
    <div>
      {renderRedirect()}
      <DisplayCat />
    </div>
  );
};


export default GenerateCat;