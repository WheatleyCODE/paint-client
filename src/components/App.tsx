import React from 'react';
import { Canvas } from './Canvas';
import { Toolbar } from './Toolbar';
import { Settings } from './Settings';

export const App = () => {
  return (
    <div className="app">
      <Settings />

      <div className="app__main">
        <Toolbar />
        <Canvas />
      </div>
    </div>
  );
};
