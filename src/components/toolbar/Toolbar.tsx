import React, { FC } from 'react';
import { ToolbarFooter } from './ToolbarFooter';
import { ToolbarSettings } from './settings/ToolbarSettings';
import { ToolbarTools } from './tools/ToolbarTools';
import Palette from './Palette';
import { BrushPreview } from './BrushPreview';
import { ISettings } from '../../hooks/paint/usePaint';
import { ITools } from '../../hooks/paint/useTools';

export interface IToolbarProps {
  settings: ISettings;
  tools: ITools;
}

export const Toolbar: FC<IToolbarProps> = ({ settings, tools }) => {
  const { lineWidth, majorColor, minorColor, fill, saturation, lightness, effectSpeed } = settings;

  return (
    <div className="toolbar">
      <BrushPreview width={lineWidth.value} color={majorColor.value} />

      <Palette input={{ ref: majorColor.ref, value: majorColor.value }} />
      <Palette input={{ ref: minorColor.ref, value: minorColor.value }} />

      <ToolbarTools tools={tools} />

      <ToolbarSettings
        fill={{ ref: fill.ref, value: fill.value, changeValue: fill.changeValue }}
        lineWidth={{ ref: lineWidth.ref, value: lineWidth.value }}
        saturation={saturation}
        lightness={lightness}
        effectSpeed={effectSpeed}
        min={1}
        max={100}
      />

      <ToolbarFooter />
    </div>
  );
};
