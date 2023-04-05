import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import {
  MdAutoFixHigh,
  MdBrush,
  MdCircle,
  MdOutlineAutoFixHigh,
  MdOutlineHorizontalRule,
  MdSquare,
  MdTimeline,
} from 'react-icons/md';
import { IoResizeOutline, IoTriangle } from 'react-icons/io5';
import { RiEraserFill } from 'react-icons/ri';
import { TbArrowMoveDown, TbArrowMoveUp } from 'react-icons/tb';
import { ToolButton } from './ToolButton';
import { ToolTypes } from '../../types';
import { ITools } from '../../hooks/paint/useTools';

export interface IToolbarToolsProps {
  tools: ITools;
}

export const ToolbarTools: FC<IToolbarToolsProps> = ({ tools }) => {
  const { current, selectBrush, selectRect, selectCircle, selectTriangle, selectEraser } = tools;

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
        <ToolButton Icon={MdTimeline} isActive={false} onClick={selectBrush} />
        <ToolButton deg Icon={MdOutlineHorizontalRule} isActive={false} onClick={selectBrush} />
        <ToolButton Icon={MdAutoFixHigh} isActive={false} onClick={selectBrush} />
        <ToolButton
          Icon={RiEraserFill}
          isActive={type === ToolTypes.ERASER}
          onClick={selectEraser}
        />
      </div>

      <div className="toolbar-tools__title">Brush Effects</div>
      <div className="toolbar-tools__effects">
        <Button className="btn icon btn-cian">
          <IoResizeOutline />
        </Button>

        <Button className="btn icon btn-cian">
          <TbArrowMoveDown />
        </Button>

        <Button className="btn icon btn-cian">
          <TbArrowMoveUp />
        </Button>

        <Button className="btn icon btn-cian">
          <MdOutlineAutoFixHigh />
        </Button>
      </div>
    </div>
  );
};
