import { Button } from '@material-ui/core';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import './App.css';
import SignedInApp from './SignedInApp';
import { useTwitchApi } from './TwitchApiContext';

function App() {
  const api = useTwitchApi();

  return (
    <div className="App">
      {
        api.hasAuth()
          ? <SignedInApp />
          : <Button color="primary" variant="contained" size="large" href={api.getAuthUrl()}>Login</Button>
      }
    </div>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App
