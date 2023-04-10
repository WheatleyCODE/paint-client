import { Brush } from '../Brush';
import { BrushBuilder } from '../builders';
import { colors } from '../../consts';
import { EffectTypes, ToolTypes } from '../../types';
import { ICreateBrushParams } from '../../types/create-tools.interfaces';

export interface ICreateMagicParams extends ICreateBrushParams {
  currentEffect: EffectTypes;
  changeLineWidth: (num: number) => void;
}

export const createMagic = (params: ICreateMagicParams): Brush | undefined => {
  const { shield, canvas, toolSettings, observables, currentEffect, socketNext, changeLineWidth } =
    params;

  const { majorColor$, minorColor$, lineWidth$, effectSpeed$, saturation$, lightness$ } =
    observables;

  if (
    !shield ||
    !canvas ||
    !majorColor$ ||
    !minorColor$ ||
    !lineWidth$ ||
    !effectSpeed$ ||
    !lightness$ ||
    !saturation$
  )
    return;

  return new BrushBuilder(shield, canvas)
    .setType(ToolTypes.MAGIC)
    .setInitMajorColor(colors.WHITE)
    .setInitMinorColor(colors.WHITE)
    .setLineWidth$(lineWidth$)
    .setInitLineWidth(toolSettings.lineWidth)
    .setLightness$(lightness$)
    .setInitLightness$(toolSettings.lightness)
    .setSaturation$(saturation$)
    .setInitSaturation$(toolSettings.saturation)
    .setEffects([EffectTypes.RAINBOW, currentEffect])
    .setEffectSpeed$(effectSpeed$)
    .setInitEffectSpeed(toolSettings.effectSpeed)
    .setChangeLineWidth(changeLineWidth)
    .setSocketNext(socketNext)
    .build();
};
