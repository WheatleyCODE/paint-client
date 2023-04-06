import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import {
  MdBrush,
  MdCircle,
  MdClose,
  MdOutlineAutoFixHigh,
  MdOutlineHorizontalRule,
  MdSquare,
} from 'react-icons/md';
import { IoResizeOutline, IoTriangle } from 'react-icons/io5';
import { RiEraserFill } from 'react-icons/ri';
import { TbArrowMoveDown, TbArrowMoveUp } from 'react-icons/tb';
import { FaDrawPolygon } from 'react-icons/fa';
import { ToolButton } from './ToolButton';
import { ToolTypes } from '../../types';
import { ITools } from '../../hooks/paint/useTools';
import { effects } from '../../consts';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { paintActions } from '../../store';

export interface IToolbarToolsProps {
  tools: ITools;
}

export const ToolbarTools: FC<IToolbarToolsProps> = ({ tools }) => {
  const {
    current,
    selectBrush,
    selectRect,
    selectCircle,
    selectTriangle,
    selectEraser,
    selectLine,
    selectArbitrary,
    selectMagic,
  } = tools;
  const { currentEffect } = useTypedSelector((state) => state.paint);
  const dispatch = useTypedDispatch();

  const type = current?.type || ToolTypes.NONE;

  return (
    <div className="toolbar-tools">
      <div className="toolbar-tools__title">Tools</div>
      <div className="toolbar-tools__tools">
        <ToolButton Icon={MdBrush} isActive={type === ToolTypes.BRUSH} onClick={selectBrush} />
        <ToolButton Icon={MdSquare} isActive={type === ToolTypes.RECT} onClick={selectRect} />
        <ToolButton Icon={MdCircle} isActive={type === ToolTypes.CIRCLE} onClick={selectCircle} />
        <ToolButton
          Icon={IoTriangle}
          isActive={type === ToolTypes.TRIANGLE}
          onClick={selectTriangle}
        />
        <ToolButton
          Icon={FaDrawPolygon}
          isActive={type === ToolTypes.ARBITRARY}
          onClick={selectArbitrary}
        />
        <ToolButton
          deg
          Icon={MdOutlineHorizontalRule}
          isActive={type === ToolTypes.LINE}
          onClick={selectLine}
        />
        <ToolButton
          Icon={MdOutlineAutoFixHigh}
          isActive={type === ToolTypes.MAGIC}
          onClick={selectMagic}
        />
        <ToolButton
          Icon={RiEraserFill}
          isActive={type === ToolTypes.ERASER}
          onClick={selectEraser}
        />
      </div>

      <div className="toolbar-tools__title">Brush Effects</div>
      <div className="toolbar-tools__effects">
        {effects.map(({ Icon, effect }) => (
          <Button
            key={effect}
            onClick={() => dispatch(paintActions.setCurrentEffect(effect))}
            className={`btn icon btn-cian ${currentEffect === effect && 'active'}`}
          >
            <Icon />
          </Button>
        ))}
      </div>
    </div>
  );
};
