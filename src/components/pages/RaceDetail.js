import React, {useEffect, useState} from "react";
import axios from "axios";

import BreedImage from "../items/BreedImage.js";

const RaceDetail = (props) => {

  const [raceDetails, setRaceDetails] = useState({});
  const headers = {
    'x-api-key': '80ad793a-81c0-4987-a01a-cdf448c1b68d'
  }

  useEffect(() => {
    axios.get("https://api.thecatapi.com/v1/breeds/search?q=" + props.match.params.race, {headers}).then(response => {
      if (response.data[0]) {
        setRaceDetails(response.data[0])
      }
    });
  }, []);
  
  const DisplayDetails = () => {
    if (raceDetails.name) {
      return (
        <div className = "raceDetails">
          <h2>{raceDetails.name}</h2>
          <BreedImage race={props.match.params.race} />
          <p>{raceDetails.description}</p>
          <ul>
            <li>Espérance de vie : {raceDetails.life_span} ans</li>
            <li>Attitude : {raceDetails.temperament}</li>
            <li>Intelligence : {raceDetails.intelligence}</li>
          </ul>
        </div>
      );
    } else {
      return (<p>Chargement...</p>)
    }
  }

  return (
    <DisplayDetails />
  );
}

export default RaceDetail;
