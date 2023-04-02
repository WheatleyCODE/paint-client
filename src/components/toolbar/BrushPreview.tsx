import React, { FC } from 'react';

export interface IBrushPreviewProps {
  width: number;
  color: string;
}

export const BrushPreview: FC<IBrushPreviewProps> = ({ width, color }) => {
  return (
    <div className="brash-preview">
      <div style={{ width, height: width, background: color }} className="brash-preview__brush" />
    </div>
  );
};
