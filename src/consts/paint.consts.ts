import { IoResizeOutline } from 'react-icons/io5';
import { TbArrowMoveDown, TbArrowMoveUp } from 'react-icons/tb';
import { MdClose } from 'react-icons/md';
import { EffectTypes, ToolTypes } from '../types';

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

export const TOOLBAR_WIDTH = 191;
export const SELECT_BORDER_SUM = 6;
export const MOUSE_RIGHT = 2;

export const effects = [
  {
    Icon: IoResizeOutline,
    effect: EffectTypes.RESIZE,
  },
  {
    Icon: TbArrowMoveDown,
    effect: EffectTypes.BIG_TO_LOW,
  },
  {
    Icon: TbArrowMoveUp,
    effect: EffectTypes.LOW_TO_BIG,
  },
  {
    Icon: MdClose,
    effect: EffectTypes.NONE,
  },
];
