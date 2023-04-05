import { map, Observable, pairwise, switchMap, takeUntil, withLatestFrom } from 'rxjs';
import { Tool } from './abstract/Tool';
import { createStream } from '../utils';
import { MOUSE_RIGHT } from '../consts';
import {
  IBrush,
  IDrawBrushParams,
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
    $shield: HTMLDivElement,
    $canvas: HTMLCanvasElement,
    majorColor$: Observable<Change>,
    initMajorColor: string,
    minorColor$: Observable<Change>,
    initMinorColor: string,
    lineWidth$: Observable<Change>,
    initLineWidth: number,
    socketNext: (method: SocketMethods, payload: SocketPayload) => void
  ) {
    super(
      $shield,
      $canvas,
      majorColor$,
      initMajorColor,
      minorColor$,
      initMinorColor,
      lineWidth$,
      initLineWidth
    );

    this.socketNext = socketNext;
  }

  init(): void {
    const majorColorStream$ = createStream(this.majorColor$, this.initMajorColor);
    const minorColorStream$ = createStream(this.minorColor$, this.initMinorColor);
    const lineWidthStream$ = createStream(this.lineWidth$, this.initLineWidth);

    const streamMouseMove$ = this.mouseMove$.pipe(
      map((e) => ({ x: e.offsetX, y: e.offsetY })),
      pairwise(),
      takeUntil(this.mouseUp$),
      takeUntil(this.mouseOut$)
    );

    const streamMouseDown$ = this.mouseDown$.pipe(
      map((e) => ({ isReverse: e.buttons === MOUSE_RIGHT })),
      withLatestFrom(
        majorColorStream$,
        minorColorStream$,
        lineWidthStream$,
        ({ isReverse }, majorColor, minorColor, lineWidth) => ({
          majorColor,
          minorColor,
          lineWidth,
          isReverse,
        })
      ),
      switchMap((options) => {
        return streamMouseMove$.pipe(map((val) => ({ coords: val, options })));
      })
    );

    const subscriptionMouseDown = streamMouseDown$.subscribe(({ coords, options }) => {
      const [from, to] = coords;
      const { lineWidth, majorColor, minorColor, isReverse } = options;

      const params: IDrawBrushParams = {
        lineWidth: +lineWidth,
        strokeStyle: isReverse ? minorColor : majorColor,
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

    this.subs.push(subscriptionMouseDown);
  }

  static draw(canvasCtx: CanvasRenderingContext2D, params: IDrawBrushParams): void {
    const { lineWidth, strokeStyle, fromY, fromX, toY, toX } = params;
    canvasCtx.lineWidth = lineWidth;
    canvasCtx.strokeStyle = strokeStyle;
    canvasCtx.beginPath();
    canvasCtx.moveTo(fromX, fromY);
    canvasCtx.lineTo(toX, toY);
    canvasCtx.lineCap = 'round';
    canvasCtx.lineJoin = 'round';
    canvasCtx.stroke();
  }

  setSocketNext(socketNext: (method: SocketMethods, payload: SocketPayload) => void) {
    this.socketNext = socketNext;
  }
}
