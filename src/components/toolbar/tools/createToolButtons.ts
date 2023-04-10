import {
  MdBrush,
  MdCircle,
  MdOutlineAutoFixHigh,
  MdOutlineHorizontalRule,
  MdSquare,
} from 'react-icons/md';
import { IoTriangle } from 'react-icons/io5';
import { FaDrawPolygon } from 'react-icons/fa';
import { RiEraserFill } from 'react-icons/ri';
import { ToolTypes } from '../../../types';
import { ITools } from '../../../hooks/paint/usePaintTools';

export const createToolButtons = (tools: ITools) => {
  const {
    selectBrush,
    selectRect,
    selectCircle,
    selectTriangle,
    selectEraser,
    selectLine,
    selectArbitrary,
    selectMagic,
  } = tools;

  return [
    {
      Icon: MdBrush,
      toolType: ToolTypes.BRUSH,
      select: selectBrush,
    },
    {
      Icon: MdSquare,
      toolType: ToolTypes.RECT,
      select: selectRect,
    },
    {
      Icon: MdCircle,
      toolType: ToolTypes.CIRCLE,
      select: selectCircle,
    },
    {
      Icon: IoTriangle,
      toolType: ToolTypes.TRIANGLE,
      select: selectTriangle,
    },
    {
      Icon: FaDrawPolygon,
      toolType: ToolTypes.ARBITRARY,
      select: selectArbitrary,
    },
    {
      Icon: MdOutlineHorizontalRule,
      toolType: ToolTypes.LINE,
      select: selectLine,
    },
    {
      Icon: MdOutlineAutoFixHigh,
      toolType: ToolTypes.MAGIC,
      select: selectMagic,
    },
    {
      Icon: RiEraserFill,
      toolType: ToolTypes.ERASER,
      select: selectEraser,
    },
  ];
};
