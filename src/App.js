import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import './App.css';
import CatDex from "./components/pages/CatDex.js";
import RaceDetail from "./components/pages/RaceDetail.js";
import Login from "./components/pages/Login.js";
import Register from "./components/pages/Register.js";
import SearchCat from "./components/pages/SearchCat.js";
import WildCat from "./components/pages/WildCat.js";
import Fight from "./components/pages/Fight.js";
import Summon from "./components/pages/Summon.js";
import GenerateCat from "./components/pages/GenerateCat.js";
import Team from "./components/pages/Team.js";
import CatDetail from "./components/pages/CatDetail.js";

import Home from "./components/pages/Home.js";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  console.log(isAuthenticated);

  return (
    <div className="App">
      <h1>Battle Cat</h1>
      <nav>
        <ul>
          <li><Link to='/'>Accueil</Link></li>
          <li><Link to='/team'>Mes chats</Link></li>
          <li><Link to='/summon'>Invoquer un chat</Link></li>
          <li><Link to='/catdex'>CatDex</Link></li>
          <li><Link to='/search_cat'>Partir à l'aventure</Link></li>
          <li><Link to='/login'>Connexion</Link></li>
          <li><Link to='/register'>Inscription</Link></li>
        </ul>
      </nav>
      
      <main>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/search_cat' component={SearchCat} />
          <Route path='/wild_cat/:cat' component={WildCat} />
          <Route path='/fight/' component={Fight} />
          <Route path='/summon' component={Summon} />
          <Route path='/generate_cat' component={GenerateCat} />
          <Route path='/team' component={Team} />
          <Route path='/cat_detail/:cat' component={CatDetail} />
          <Route path='/catdex' component={CatDex} />
          <Route path='/race_detail/:race' component={RaceDetail} />
          <Route path='/' component={Home} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
