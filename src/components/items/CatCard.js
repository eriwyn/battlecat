import React from "react";
import BreedImage from "./BreedImage.js";


const CatCard = (props) => {
  return (
      <figure className="catCard">
          <figcaption>{props.cat.name} ({props.cat.breed})</figcaption>
          <img src={props.cat.image_url} alt=""></img>
      </figure>
  );
}

export default CatCard;