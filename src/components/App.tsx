import React from 'react';
import { PaintProvider } from './hoc/PaintProvider';
import { Paint } from './Paint';

export const App = () => {
  return (
    <PaintProvider>
      <Paint />
    </PaintProvider>
  );
};
