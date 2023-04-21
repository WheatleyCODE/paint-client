import React, { FC, memo } from 'react';

export interface IBrushPreviewProps {
  width: number;
  color: string;
}

export const BrushPreview: FC<IBrushPreviewProps> = memo(({ width, color }) => {
  return (
    <div className="brash-preview">
      <div
        data-testid="brash-preview"
        style={{ width, height: width, background: color }}
        className="brash-preview__brush"
      />
    </div>
  );
});
