import { Brush } from '../Brush';
import { BrushBuilder } from '../builders';
import { IPaintObservables } from '../../hooks/paint/usePaintObservables';
import { EffectTypes, IToolSettings, SocketMethods, SocketPayload } from '../../types';

export interface ICreateBrushParams {
  shield?: HTMLDivElement;
  canvas?: HTMLCanvasElement;
  toolSettings: IToolSettings;
  observables: IPaintObservables;
  socketNext: (method: SocketMethods, payload: SocketPayload) => void;
  currentEffect: EffectTypes;
  changeLineWidth: (num: number) => void;
}

export const createBrush = (params: ICreateBrushParams): Brush | undefined => {
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
