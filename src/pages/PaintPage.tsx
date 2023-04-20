import React from 'react';
import { PaintProvider } from '../components/hoc/PaintProvider';
import { Paint } from '../components/paint/Paint';

export const PaintPage = () => {
  return (
    <PaintProvider>
      <Paint />
    </PaintProvider>
  );
};
