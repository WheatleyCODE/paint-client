import { map, Observable, switchMap, takeLast, takeUntil, tap, withLatestFrom } from 'rxjs';
import { Shape } from './abstract/Shape';
import { createStream, applyFillTypeStyles } from '../utils';

import {
  Change,
  IDrawRectParams,
  IDrawSelectParams,
  IRect,
  ShapeFillTypes,
  SocketMethods,
  SocketPayload,
  ToolTypes,
} from '../types';
import { removeStylesOnSelectSquare } from '../utils/paint.utils';

export class Rect extends Shape implements IRect {
  type = ToolTypes.RECT;
  isRect = true;
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
    fill$: Observable<Change>,
    initShapeFillType: ShapeFillTypes,
    $selectSquare: HTMLDivElement,
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
      initLineWidth,
      fill$,
      initShapeFillType,
      $selectSquare
    );

    this.socketNext = socketNext;
  }

  init() {
    const majorColorStream$ = createStream(this.majorColor$, this.initMajorColor);
    const minorColorStream$ = createStream(this.minorColor$, this.initMinorColor);
    const lineWidthStream$ = createStream(this.lineWidth$, this.initLineWidth);
    const fill$Stream$ = createStream(this.fill$, this.initShapeFillType);

    const streamMouseMove$ = this.mouseMove$.pipe(
      map((e) => ({ x: e.offsetX, y: e.offsetY })),
      takeUntil(this.mouseUp$),
      takeUntil(this.mouseOut$)
    );

    const streamMouseDown$ = this.mouseDown$.pipe(
      tap(() => this.save()),
      map((e) => ({ x: e.offsetX, y: e.offsetY })),
      withLatestFrom(
        majorColorStream$,
        minorColorStream$,
        lineWidthStream$,
        fill$Stream$,
        (startCoords, majorColor, minorColor, lineWidth, fillType) => ({
          startCoords,
          majorColor,
          minorColor,
          lineWidth,
          fillType,
        })
      ),
      switchMap((options) => {
        return streamMouseMove$.pipe(
          map((coords) => ({ coords, options })),
          tap((value) => {
            const { startCoords } = value.options;
            const { coords } = value;

            const params: IDrawSelectParams = {
              startCoords,
              coords,
              isShow: true,
              figure: this.type,
            };

            Shape.drawSelectSquare(this.$selectSquare, this.$canvas, params);

            this.socketNext(SocketMethods.SELECT, {
              params,
              type: ToolTypes.NONE,
            });
          }),
          takeLast(1)
        );
      })
    );

    const subscriptionMouseDown = streamMouseDown$.subscribe(({ coords, options }) => {
      const { lineWidth, majorColor, minorColor, fillType, startCoords } = options;

      const width = startCoords.x - coords.x;
      const height = startCoords.y - coords.y;

      const params: IDrawRectParams = {
        lineWidth: +lineWidth,
        strokeStyle: majorColor,
        x: coords.x,
        y: coords.y,
        width,
        height,
        fillType,
        fillStyle: minorColor,
      };

      this.socketNext(SocketMethods.DRAW, {
        type: ToolTypes.RECT,
        params,
      });

      Rect.draw(this.canvasCtx, params);

      // clear select
      removeStylesOnSelectSquare(this.$selectSquare, this.type);
      this.socketNext(SocketMethods.SELECT, {
        params: { startCoords, coords, figure: this.type, isShow: false },
        type: ToolTypes.NONE,
      });
    });

    this.subs.push(subscriptionMouseDown);
  }

  static draw(canvasCtx: CanvasRenderingContext2D, params: IDrawRectParams) {
    const { lineWidth, strokeStyle, x, y, width, height, fillType, fillStyle } = params;

    canvasCtx.lineWidth = lineWidth;
    canvasCtx.strokeStyle = strokeStyle;
    canvasCtx.lineCap = 'butt';
    canvasCtx.lineJoin = 'miter';
    canvasCtx.fillStyle = fillStyle;

    canvasCtx.beginPath();
    canvasCtx.rect(x, y, width, height);

    applyFillTypeStyles(canvasCtx, fillType);
  }

  setSocketNext(socketNext: (method: SocketMethods, payload: SocketPayload) => void): void {
    this.socketNext = socketNext;
  }
}
