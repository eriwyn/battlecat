import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, Link } from 'react-router-dom';


const Fight = props => {
const [resultFight, setResultFight] = useState(0);
const [userCatHP, setUserCatHP] = useState(0);
const [enemyCatHP, setEnemyCatHP] = useState(0);


  const headers = {
    'x-api-key': '80ad793a-81c0-4987-a01a-cdf448c1b68d'
  }

  useEffect(() => {
    
    let userCat = props.location.fightProps.userCat[0];
    let enemyCat = props.location.fightProps.enemyCat;

    let attackingCat = "userCat";
    let damages = 0;
      

      let interval = setInterval(() => {
        switch (attackingCat) {
          case "userCat":
              damages = Math.floor(Math.random() * userCat.strength);
              enemyCat.hp_max -= damages;
              attackingCat = "enemyCat";
              setEnemyCatHP(enemyCat.hp_max);
            break;
          case "enemyCat":
              damages = Math.floor(Math.random() * enemyCat.strength);
              userCat.hp_max -= damages;
              attackingCat = "userCat";
              setUserCatHP(userCat.hp_max);
          break;
        
          default:
            break;
        }

        if (userCat.hp_max <= 0 || enemyCat.hp_max <= 0) {
          if (userCat.hp_max <= 0) {
            setResultFight("lose");
          } else {
            setResultFight("win");
          }
          clearInterval(interval);
        }
      }, 500)
    
  }, []);

  const DisplayResult = () => {
    if (resultFight == "win") {
      return (
        <div>
          <h2>Victoire</h2>
        </div>
      )
    } else if (resultFight == "lose") {
      return (
        <div>
          <h2>Défaite</h2>
        </div>
      )
    } else {
      return (
        <h2>Fight !!!</h2>
      )
    }
  }

  return (
    <div id="fightPage">
      <DisplayResult />
      <div id="battleground">
        <div id="userSide">
          <h3>{props.location.fightProps.userCat[0].name}</h3>
          <img src={props.location.fightProps.userCat[0].image_url} alt=""></img>
          <p id="userHP">{userCatHP} HP</p>
          <p id="userAction"></p>
        </div>
        <div id="enemySide">
          <h3>{props.location.fightProps.enemyCat.breed}</h3>
          <img src={props.location.fightProps.enemyCat.image_url} alt=""></img>
          <p id="enemyHP">{enemyCatHP} HP</p>
          <p id="enemyAction"></p>
        </div>
      </div>
      
      <Link className="ghostButton return" to="/search_cat">Retour</Link>
    </div>
  );
};

export default Fight;