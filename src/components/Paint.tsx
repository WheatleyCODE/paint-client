import React from 'react';
import { Header } from './Header';
import { Toolbar } from './toolbar';
import { Canvas } from './canvas/Canvas';
import { UserModal } from './UserModal';
import { usePaint, useSocketSubscription } from '../hooks';

export const Paint = () => {
  const { tools, settings } = usePaint();
  useSocketSubscription();

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
