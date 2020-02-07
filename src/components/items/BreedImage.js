import React, {useEffect, useState} from "react";
import axios from "axios";

const BreedImage = (props) => {

  const [imageURL, setImageURL] = useState({});
  const headers = {
    'x-api-key': '80ad793a-81c0-4987-a01a-cdf448c1b68d'
  }

  useEffect(() => {
    axios.get("https://api.thecatapi.com/v1/images/search?breed_ids=" + props.race, {headers}).then(response => {
      if (response.data[0]) {
        setImageURL(response.data[0].url);

      }
    });
  }, []);

  return (
    <img src={imageURL} alt=""></img>
  );
}

export default BreedImage;
