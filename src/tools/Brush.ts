import { map, Observable, pairwise, switchMap, takeUntil, withLatestFrom } from 'rxjs';
import { Tool } from './abstract/Tool';
import { createStream } from '../utils';
import {
  IBrush,
  IDrawBrashParams,
  ToolTypes,
  Change,
  SocketMethods,
  SocketPayload,
} from '../types';

export class Brush extends Tool implements IBrush {
  isBrush = true;
  type = ToolTypes.BRUSH;
  protected socketNext: (method: SocketMethods, payload: SocketPayload) => void;

  constructor(
    $canvas: HTMLCanvasElement,
    color$: Observable<Change>,
    initColor: string,
    lineWidth$: Observable<Change>,
    initLineWidth: number,
    socketNext: (method: SocketMethods, payload: SocketPayload) => void
  ) {
    super($canvas, color$, initColor, lineWidth$, initLineWidth);
    this.socketNext = socketNext;
  }

  init(): void {
    const colorStream$ = createStream(this.color$, this.initColor);
    const lineWidthStream$ = createStream(this.lineWidth$, this.initLineWidth);

    const streamMV$ = this.mouseMove$.pipe(
      map((e) => ({ x: e.offsetX, y: e.offsetY })),
      pairwise(),
      takeUntil(this.mouseUp$),
      takeUntil(this.mouseOut$)
    );

    const streamMD$ = this.mouseDown$.pipe(
      withLatestFrom(lineWidthStream$, colorStream$, (_, lineWidth, color) => ({
        lineWidth,
        color,
      })),
      switchMap((options) => {
        return streamMV$.pipe(map((val) => ({ coords: val, options })));
      })
    );

    const sub = streamMD$.subscribe(({ coords, options }) => {
      const [from, to] = coords;
      const { lineWidth, color } = options;

      const params: IDrawBrashParams = {
        lineWidth: +lineWidth,
        strokeStyle: color,
        fromX: from.x,
        fromY: from.y,
        toX: to.x,
        toY: to.y,
      };

      this.socketNext(SocketMethods.DRAW, {
        type: ToolTypes.BRUSH,
        params,
      });

      Brush.draw(this.canvasCtx, params);
    });

    this.subs.push(sub);
  }

  static draw(canvasCtx: CanvasRenderingContext2D, params: IDrawBrashParams): void {
    const { lineWidth, strokeStyle, fromY, fromX, toY, toX } = params;
    canvasCtx.lineWidth = lineWidth;
    canvasCtx.strokeStyle = strokeStyle;
    canvasCtx.beginPath();
    canvasCtx.moveTo(fromX, fromY);
    canvasCtx.lineTo(toX, toY);
    canvasCtx.stroke();
  }
}
