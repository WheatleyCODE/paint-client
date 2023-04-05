import { ToolTypes } from '../types';

export const cursors = {
  [ToolTypes.RECT]: 'crosshair',
  [ToolTypes.CIRCLE]: 'crosshair',
  [ToolTypes.TRIANGLE]: 'crosshair',
  [ToolTypes.LINE]: 'crosshair',
  [ToolTypes.ARBITRARY]: 'crosshair',
  [ToolTypes.NONE]: 'default',
  [ToolTypes.BRUSH]: 'default',
  [ToolTypes.ERASER]: 'default',
};

export const colors = {
  WHITE: '#fffff',
};

export const TOOLBAR_WIDTH = 191;
export const SELECT_BORDER_SUM = 6;
export const MOUSE_RIGHT = 2;
