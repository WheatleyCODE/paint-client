import {
  map,
  Observable,
  startWith,
  switchMap,
  takeLast,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Shape } from './abstract/Shape';
import { IDrawRectParams, IRect, ToolTypes } from '../types/tools.interfaces';
import { createStream } from '../utils/stream.utils';
import { SocketMethods, SocketPayload } from '../types/socket.interfaces';
import { Change } from '../types/toolbar.interfaces';

export class Rect extends Shape implements IRect {
  type = ToolTypes.RECT;
  isRect = true;
  protected socketNext: (method: SocketMethods, payload: SocketPayload) => void;

  constructor(
    $canvas: HTMLCanvasElement,
    color$: Observable<Change>,
    initColor: string,
    lineWidth$: Observable<Change>,
    initLineWidth: number,
    fill$: Observable<Change>,
    initFill: boolean,
    fillColor$: Observable<Change>,
    initFillColor: string,
    socketNext: (method: SocketMethods, payload: SocketPayload) => void
  ) {
    super(
      $canvas,
      color$,
      initColor,
      lineWidth$,
      initLineWidth,
      fill$,
      initFill,
      fillColor$,
      initFillColor
    );
    this.socketNext = socketNext;
  }

  init() {
    const colorStream$ = createStream(this.color$, this.initColor);
    const lineWidthStream$ = createStream(this.lineWidth$, this.initLineWidth);
    const fill$Stream$ = this.fill$.pipe(
      map((e) => e.target.checked),
      startWith(this.initFill)
    );
    const fillColor$Stream$ = createStream(this.fillColor$, this.initFillColor);

    const streamMV$ = this.mouseMove$.pipe(
      map((e) => ({ x: e.offsetX, y: e.offsetY })),
      takeUntil(this.mouseUp$),
      takeUntil(this.mouseOut$)
    );

    const streamMD$ = this.mouseDown$.pipe(
      tap(() => this.save()),
      map((e) => ({ x: e.offsetX, y: e.offsetY })),
      withLatestFrom(
        lineWidthStream$,
        colorStream$,
        fill$Stream$,
        fillColor$Stream$,
        (startCoords, lineWidth, color, fill, fillColor) => ({
          startCoords,
          lineWidth,
          color,
          fill,
          fillColor,
        })
      ),
      switchMap((options) => {
        return streamMV$.pipe(
          map((val) => ({ coords: val, options })),
          takeLast(2)
        );
      })
    );

    const sub = streamMD$.subscribe(({ coords, options }) => {
      const { lineWidth, color, fill, startCoords, fillColor } = options;

      const width = startCoords.x - coords.x;
      const height = startCoords.y - coords.y;

      const params: IDrawRectParams = {
        lineWidth: +lineWidth,
        strokeStyle: color,
        x: coords.x,
        y: coords.y,
        width,
        height,
        fill,
        fillColor,
      };

      this.socketNext(SocketMethods.DRAW, {
        type: ToolTypes.RECT,
        params,
      });

      Rect.draw(this.canvasCtx, params);
    });

    this.subs.push(sub);
  }

  static draw(canvasCtx: CanvasRenderingContext2D, params: IDrawRectParams) {
    const { lineWidth, strokeStyle, x, y, width, height, fill, fillColor } = params;

    canvasCtx.beginPath();
    canvasCtx.lineWidth = lineWidth;
    canvasCtx.strokeStyle = strokeStyle;
    canvasCtx.rect(x, y, width, height);

    if (fill) {
      canvasCtx.fill();
      canvasCtx.fillStyle = fillColor;
    }
    canvasCtx.stroke();
  }
}
