import { Brush, BrushBuilder } from '../index';
import { ToolTypes } from '../../types';
import { ICreateBrushParams } from '../../types/create-tools.interfaces';
import { colors } from '../../consts';

export const createEraser = (params: ICreateBrushParams): Brush | undefined => {
  const { shield, canvas, toolSettings, observables, socketNext } = params;

  const { lineWidth$ } = observables;
  if (!shield || !canvas || !lineWidth$) return;

  return new BrushBuilder(shield, canvas)
    .setType(ToolTypes.ERASER)
    .setInitMajorColor(colors.WHITE)
    .setInitMinorColor(colors.WHITE)
    .setLineWidth$(lineWidth$)
    .setInitLineWidth(toolSettings.lineWidth)
    .setSocketNext(socketNext)
    .build();
};
