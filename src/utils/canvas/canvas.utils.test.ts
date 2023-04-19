import { getCursor, getCVGCursor } from './canvas.utils';
import { ToolTypes } from '../../types';

describe('Утилиты Canvas компонента', () => {
  test('Курсор есть?', () => {
    expect(getCursor(ToolTypes.CIRCLE, 100, false)).not.toBeNull();
    expect(getCursor(ToolTypes.RECT, 100, false)).not.toBeUndefined();
    expect(getCursor(ToolTypes.NONE, 100, false)).not.toBeUndefined();
  });

  test('Курсор при перетаскивании', () => {
    expect(getCursor(ToolTypes.CIRCLE, 100, true)).toEqual('grabbing');
    expect(getCursor(ToolTypes.RECT, 200, true)).toEqual('grabbing');
    expect(getCursor(ToolTypes.BRUSH, 99, true)).toEqual('grabbing');
    expect(getCursor(ToolTypes.NONE, 0, true)).toEqual('grabbing');
  });

  test('Курсор при выборе кистей', () => {
    expect(getCursor(ToolTypes.BRUSH, 100, false)).toEqual(getCVGCursor(100));
    expect(getCursor(ToolTypes.ERASER, 200, false)).toEqual(getCVGCursor(200));
    expect(getCursor(ToolTypes.MAGIC, 99, false)).toEqual(getCVGCursor(99));
  });

  test('Курсор при выборе фигур', () => {
    expect(getCursor(ToolTypes.RECT, 100, false)).toEqual('crosshair');
    expect(getCursor(ToolTypes.CIRCLE, 200, false)).toEqual('crosshair');
    expect(getCursor(ToolTypes.TRIANGLE, 99, false)).toEqual('crosshair');
    expect(getCursor(ToolTypes.ARBITRARY, 300, false)).toEqual('crosshair');
    expect(getCursor(ToolTypes.LINE, 20, false)).toEqual('crosshair');
  });
});
