import React from 'react';
import { Header } from './Header';
import { Toolbar } from './toolbar';
import { Canvas } from './Canvas';
import { UserModal } from './UserModal';
import { usePaint } from '../hooks';

export const Paint = () => {
  const { tools, settings } = usePaint();

  return (
    <div className="paint">
      <Header />

      <div className="paint__main">
        <Toolbar settings={settings} tools={tools} />
        <Canvas lineWidthValue={settings.lineWidth.value} />
      </div>

      <UserModal />
    </div>
  );
};
