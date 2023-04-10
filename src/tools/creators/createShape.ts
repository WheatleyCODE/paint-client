import {
  ArbitraryBuilder,
  CircleBuilder,
  LineBuilder,
  RectBuilder,
  TriangleBuilder,
} from '../builders';
import { ICreateShapeParams } from '../../types/create-tools.interfaces';
import { ShapeTypes } from '../../types';

const shapeBuilders = {
  [ShapeTypes.RECT]: RectBuilder,
  [ShapeTypes.CIRCLE]: CircleBuilder,
  [ShapeTypes.TRIANGLE]: TriangleBuilder,
  [ShapeTypes.ARBITRARY]: ArbitraryBuilder,
  [ShapeTypes.LINE]: LineBuilder,
};

export const createShape = (shape: ShapeTypes, params: ICreateShapeParams) => {
  const { shield, canvas, toolSettings, observables, socketNext, select } = params;
  const { majorColor$, minorColor$, lineWidth$, effectSpeed$, fill$ } = observables;

  if (!shield || !canvas || !majorColor$ || !minorColor$ || !lineWidth$ || !effectSpeed$) return;
  if (!select || !majorColor$ || !minorColor$ || !fill$ || !lineWidth$) return;

  return new shapeBuilders[shape](shield, canvas)
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
