import React, {useEffect, useState} from "react";
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import axios from "axios";

const CatDetail = (props) => {

  const [catDetails, setCatDetails] = useState({});
  const [redirect, setRedirect] = useState(false);

  const headers = {
    'x-api-key': '80ad793a-81c0-4987-a01a-cdf448c1b68d'
  }

  useEffect(() => {
    axios.get("http://battlecat.stark.mmi-unistra.fr/cats/" + props.match.params.cat).then(response => {
      setCatDetails(response.data[0])
    });
  }, []);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/team' />
    }
  }

  const releaseCat = (event) => {
    event.preventDefault();

    axios.delete("http://battlecat.stark.mmi-unistra.fr/cats/" + props.match.params.cat);
    setRedirect(true)

  }
  
  const DisplayDetails = () => {
    let date_summoned = new Date(catDetails.date_summoned);
    if (catDetails.name) {
      return (
        <div className = "catDetails">
          <h2>{catDetails.name} ({catDetails.breed})</h2>
          <em>Invoqué le {date_summoned.getDay()}/{date_summoned.getMonth()}/{date_summoned.getFullYear()}</em>
          <div className="catDescription">
            <img src={catDetails.image_url} alt=""></img>
            
            <ul>
              <li>Force : {catDetails.strength}</li>
              <li>Vie : {catDetails.hp_max}</li>
            </ul>
          </div>
          

          <button onClick={releaseCat}>Relacher le chat</button>

        </div>
      );
    } else {
      return (<p>Chargement...</p>)
    }
  }

  return (
    <div>
      {renderRedirect()}
      <DisplayDetails />
    </div>
  );
}

export default CatDetail;
