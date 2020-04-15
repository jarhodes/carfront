import React from 'react';
import './App.css';
import Carlist from './components/Carlist';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            List of cars
          </Typography>
        </Toolbar>
      </AppBar>
      <Carlist />
    </div>
  );
}

export default App;
