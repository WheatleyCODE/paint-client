import { Brush, BrushBuilder } from '../index';
import { IToolSettings, SocketMethods, SocketPayload, ToolTypes } from '../../types';
import { IPaintObservables } from '../../hooks/paint/usePaintObservables';
import { colors } from '../../consts';

export interface ICreateEraserParams {
  shield?: HTMLDivElement;
  canvas?: HTMLCanvasElement;
  toolSettings: IToolSettings;
  observables: IPaintObservables;
  socketNext: (method: SocketMethods, payload: SocketPayload) => void;
}

export const createEraser = (params: ICreateEraserParams): Brush | undefined => {
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
