import React, { FC } from 'react';
import { ITools } from '../../../hooks/paint/usePaintTools';
import { useTypedSelector } from '../../../hooks';
import { createToolButtons } from './createToolButtons';
import { ToolButton } from './ToolButton';
import { EffectButton } from './EffectButton';
import { effects } from '../../../consts';
import { ToolTypes } from '../../../types';

export interface IToolbarToolsProps {
  tools: ITools;
}

export const ToolbarTools: FC<IToolbarToolsProps> = ({ tools }) => {
  const { current } = tools;
  const { currentEffect } = useTypedSelector((state) => state.paint);

  const type = current?.type || ToolTypes.NONE;
  const toolButtons = createToolButtons(tools);

  return (
    <div className="toolbar-tools">
      <div className="toolbar-tools__title">Tools</div>
      <div className="toolbar-tools__tools">
        {toolButtons.map(({ select, toolType, Icon }) => (
          <ToolButton onClick={select} isActive={toolType === type} Icon={Icon} />
        ))}
      </div>

      <div className="toolbar-tools__title">Brush Effects</div>
      <div className="toolbar-tools__effects">
        {effects.map(({ Icon, effectType }) => (
          <EffectButton
            effectType={effectType}
            isActive={currentEffect === effectType}
            Icon={Icon}
          />
        ))}
      </div>
    </div>
  );
};
