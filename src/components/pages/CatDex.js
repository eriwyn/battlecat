import React, { useEffect, useState } from "react";
import axios from "axios";
import BreedCard from "../items/BreedCard.js"

const CatDex = props => {
  const [breeds, setBreeds] = useState([]);

  const headers = {
    'x-api-key': '80ad793a-81c0-4987-a01a-cdf448c1b68d'
  }

  useEffect(() => {
    axios.get("https://api.thecatapi.com/v1/breeds", {headers}).then(response => {
      setBreeds(response.data);
    });
  }, []);

  if (breeds.length == 0) {
    return (
      <div>
        <h2>CatDex</h2>
        <p>Chargement...</p>
      </div>
    )
  }

  return (
    <div>
      <h2>CatDex</h2>
      <ul className="catDex">
        {breeds.map(function(breed) {
          return (
              <li key={breed.id}><BreedCard breed={breed} /></li>
          );
        })}
      </ul>
    </div>
  );
};


export default CatDex;