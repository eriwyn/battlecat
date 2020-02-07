import React from "react";
import BreedImage from "./BreedImage.js";
import { Switch, Route, Redirect, Link } from 'react-router-dom';


const BreedCard = (props) => {

  return (
    // <Link to='/race_detail/' params={{race: props.breed.id}}>
      <Link to={'/race_detail/' + props.breed.id}>

      <figure className="breedCard">
          <figcaption>{props.breed.name}</figcaption>
          <BreedImage race={props.breed.id} />
      </figure>
    </Link>
  );
}

export default BreedCard;