import { ShapeBuilderFactory } from '../builders';
import { ICreateShapeParams } from '../../types/create-tools.interfaces';
import { ShapeTypes } from '../../types';

export const createShape = (shape: ShapeTypes, params: ICreateShapeParams) => {
  const { shield, canvas, toolSettings, observables, socketNext, select } = params;
  const { majorColor$, minorColor$, lineWidth$, effectSpeed$, fill$ } = observables;

  if (!shield || !canvas || !majorColor$ || !minorColor$ || !lineWidth$ || !effectSpeed$) return;
  if (!select || !majorColor$ || !minorColor$ || !fill$ || !lineWidth$) return;

  return ShapeBuilderFactory.create(shape, shield, canvas)
    .setMajorColor$(majorColor$)
    .setInitMajorColor(toolSettings.majorColor)
    .setMinorColor$(minorColor$)
    .setInitMinorColor(toolSettings.minorColor)
    .setLineWidth$(lineWidth$)
    .setInitLineWidth(toolSettings.lineWidth)
    .setSocketNext(socketNext)
    .setFill$(fill$)
    .setInitShapeFillType(toolSettings.currentShapeFillType)
    .setSelectSquare(select)
    .build();
};
