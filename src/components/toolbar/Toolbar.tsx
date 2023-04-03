import React from 'react';
import { useTools } from '../../hooks';
import { ToolbarFooter } from './ToolbarFooter';
import { ToolbarSettings } from './ToolbarSettings';
import { ToolbarTools } from './ToolbarTools';
import Palette from './Palette';
import { BrushPreview } from './BrushPreview';

export const Toolbar = () => {
  const { tools, currentTool, selectBrush, selectRect } = useTools();
  const { majorColor, minorColor, lineWidth, fill } = tools;

  return (
    <div className="toolbar">
      <BrushPreview width={lineWidth.value} color={majorColor.value} />

      <Palette input={{ ref: majorColor.ref, value: majorColor.value }} />
      <Palette input={{ ref: minorColor.ref, value: minorColor.value }} />

      <ToolbarTools
        currentToolType={currentTool?.type || ''}
        selectBrush={selectBrush}
        selectRect={selectRect}
      />

      <ToolbarSettings
        fill={{ ref: fill.ref, value: fill.value, changeValue: fill.changeValue }} // todo
        lineWidth={{ ref: lineWidth.ref, value: lineWidth.value }}
        min={1}
        max={100}
      />

      <ToolbarFooter />
    </div>
  );
};
