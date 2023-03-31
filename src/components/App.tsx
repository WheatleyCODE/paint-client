import React from 'react';
import { Canvas } from './Canvas';
import { Toolbar } from './toolbar';
import { SettingsBar } from './SettingsBar';
import { UserModal } from './UserModal';
import { PaintProvider } from './hoc/PaintProvider';

export const App = () => {
  return (
    <PaintProvider>
      <div className="app">
        <SettingsBar />

        <div className="app__main">
          <Toolbar />
          <Canvas />
        </div>

        <UserModal />
      </div>
    </PaintProvider>
  );
};
