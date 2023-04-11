import { IoResizeOutline } from 'react-icons/io5';
import { TbArrowMoveDown, TbArrowMoveUp } from 'react-icons/tb';
import { MdClose, MdOutlineSquare, MdSquare } from 'react-icons/md';
import { EffectTypes, ShapeFillTypes, ToolTypes } from '../types';

export const cursors = {
  [ToolTypes.RECT]: 'crosshair',
  [ToolTypes.CIRCLE]: 'crosshair',
  [ToolTypes.TRIANGLE]: 'crosshair',
  [ToolTypes.LINE]: 'crosshair',
  [ToolTypes.ARBITRARY]: 'crosshair',
  [ToolTypes.NONE]: 'default',
  [ToolTypes.BRUSH]: 'default',
  [ToolTypes.ERASER]: 'default',
  [ToolTypes.MAGIC]: 'default',
};

export const colors = {
  WHITE: '#fff',
  YELLOW: '#fff203',
};

export const mockSettings = {
  lineWidth: 10,
  lightness: 50,
  saturation: 50,
  effectSpeed: 3,
};

export const DEFAULT_LINE_WIDTH = 10;

export const TOOLBAR_WIDTH = 197;
export const SELECT_BORDER_SUM = 6;

export const MOUSE_LEFT = 1;
export const MOUSE_RIGHT = 2;
export const MOUSE_CENTER = 4;

export const effects = [
  {
    Icon: IoResizeOutline,
    effectType: EffectTypes.RESIZE,
  },
  {
    Icon: TbArrowMoveDown,
    effectType: EffectTypes.BIG_TO_LOW,
  },
  {
    Icon: TbArrowMoveUp,
    effectType: EffectTypes.LOW_TO_BIG,
  },
  {
    Icon: MdClose,
    effectType: EffectTypes.NONE,
  },
];

export const fillRadios = [
  { Icon: MdOutlineSquare, value: ShapeFillTypes.BORDER },
  { Icon: MdSquare, value: ShapeFillTypes.FILL },
  { Icon: MdOutlineSquare, value: ShapeFillTypes.FILL_BORDER },
];

export const RESIZER_WIDTH = 8;
