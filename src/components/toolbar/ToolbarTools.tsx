import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import {
  MdBrush,
  MdCircle,
  MdOutlineAutoFixHigh,
  MdOutlineHorizontalRule,
  MdSquare,
} from 'react-icons/md';
import { IoResizeOutline, IoTriangle } from 'react-icons/io5';
import { RiEraserFill } from 'react-icons/ri';
import { TbArrowMoveDown, TbArrowMoveUp } from 'react-icons/tb';
import { ToolButton } from './ToolButton';
import { ToolTypes } from '../../types';

export interface IToolbarToolsProps {
  currentToolType: string;
  selectBrush: () => void;
  selectRect: () => void;
}

export const ToolbarTools: FC<IToolbarToolsProps> = (props) => {
  const { currentToolType, selectBrush, selectRect } = props;

  return (
    <div className="toolbar-tools">
      <div className="toolbar-tools__title">Tools</div>
      <div className="toolbar-tools__tools">
        <ToolButton
          Icon={MdBrush}
          isActive={currentToolType === ToolTypes.BRUSH}
          onClick={selectBrush}
        />
        <ToolButton
          Icon={MdSquare}
          isActive={currentToolType === ToolTypes.RECT}
          onClick={selectRect}
        />
        <ToolButton Icon={MdCircle} isActive={false} onClick={selectBrush} />
        <ToolButton Icon={IoTriangle} isActive={false} onClick={selectBrush} />
        <ToolButton Icon={MdOutlineHorizontalRule} isActive={false} onClick={selectBrush} />
        <ToolButton Icon={MdOutlineHorizontalRule} isActive={false} onClick={selectBrush} />
        <ToolButton Icon={MdOutlineHorizontalRule} isActive={false} onClick={selectBrush} />
        <ToolButton Icon={RiEraserFill} isActive={false} onClick={selectBrush} />
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
