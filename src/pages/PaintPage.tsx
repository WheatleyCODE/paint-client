import React from 'react';
import { PaintProvider } from '../components/hoc/PaintProvider';
import { Paint } from '../components/Paint';

export const PaintPage = () => {
  return (
    <PaintProvider>
      <Paint />
    </PaintProvider>
  );
};
