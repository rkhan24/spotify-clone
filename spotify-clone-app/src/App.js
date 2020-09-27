import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebAPI from "spotify-web-api-js";
import Player from "./Player";
import {useDataLayerValue} from "./DataLayer";

const spotify = new SpotifyWebAPI();

function App() {
  const[token, setToken] = useState(null);


    // Run code based ona given condition
    useEffect(() => {
      const hash = getTokenFromUrl(); 

      window.location.hash = "";
      const _token = hash.access_token;   

      if(_token) {
        setToken(_token);

        spotify.setAccessToken(_token);

        spotify.getMe().then(user => {
          console.log(user);
        })
      }

      console.log(" I HAVE A TOKEN ", token);
    }, []);

  return (
    <div className="app">
     {
       token ? (
         <Player/>
       ) : (
        <Login/>  
       )

     }
    </div>
  );
}

export default App;
