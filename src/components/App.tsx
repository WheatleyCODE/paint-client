import React from 'react';
import { Canvas } from './Canvas';
import { Toolbar } from './toolbar/Toolbar';
import { SettingBar } from './SettingBar';
import { UserModal } from './Modal';

export const App = () => {
  return (
    <div className="app">
      <SettingBar />

      <div className="app__main">
        <Toolbar />
        <Canvas />
      </div>

      <UserModal />
    </div>
  );
};
