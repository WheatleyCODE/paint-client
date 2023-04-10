import { Brush } from '../Brush';
import { BrushBuilder } from '../builders';
import { EffectTypes } from '../../types';
import { ICreateBrushParams } from '../../types/create-tools.interfaces';

export interface ICreateDefaultBrushParams extends ICreateBrushParams {
  currentEffect: EffectTypes;
  changeLineWidth: (num: number) => void;
}

export const createBrush = (params: ICreateDefaultBrushParams): Brush | undefined => {
  const { shield, canvas, toolSettings, observables, currentEffect, socketNext, changeLineWidth } =
    params;

  const { majorColor$, minorColor$, lineWidth$, effectSpeed$ } = observables;
  if (!shield || !canvas || !majorColor$ || !minorColor$ || !lineWidth$ || !effectSpeed$) return;

  return new BrushBuilder(shield, canvas)
    .setMajorColor$(majorColor$)
    .setInitMajorColor(toolSettings.majorColor)
    .setMinorColor$(minorColor$)
    .setInitMinorColor(toolSettings.minorColor)
    .setLineWidth$(lineWidth$)
    .setInitLineWidth(toolSettings.lineWidth)
    .setEffects([currentEffect])
    .setEffectSpeed$(effectSpeed$)
    .setInitEffectSpeed(toolSettings.effectSpeed)
    .setSocketNext(socketNext)
    .setChangeLineWidth(changeLineWidth)
    .build();
};
