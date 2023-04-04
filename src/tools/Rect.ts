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
import { createStream } from '../utils';

import {
  Change,
  IDrawRectParams,
  IDrawSelectParams,
  IRect,
  ShapeTypes,
  SocketMethods,
  SocketPayload,
  ToolTypes,
} from '../types';

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
    initShapeType: ShapeTypes,
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
      initShapeType,
      $selectSquare
    );

    this.socketNext = socketNext;
  }

  init() {
    const majorColorStream$ = createStream(this.majorColor$, this.initMajorColor);
    const minorColorStream$ = createStream(this.minorColor$, this.initMinorColor);
    const lineWidthStream$ = createStream(this.lineWidth$, this.initLineWidth);

    const fill$Stream$ = this.fill$.pipe(
      map((e) => e.target.checked),
      startWith(this.initShapeType)
    );

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
        (startCoords, majorColor, minorColor, lineWidth, fill) => ({
          startCoords,
          majorColor,
          minorColor,
          lineWidth,
          fill,
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
          takeLast(2)
        );
      })
    );

    const sub = streamMouseDown$.subscribe(({ coords, options }) => {
      const { lineWidth, majorColor, minorColor, fill, startCoords } = options;

      const width = startCoords.x - coords.x;
      const height = startCoords.y - coords.y;

      const params: IDrawRectParams = {
        lineWidth: +lineWidth,
        strokeStyle: majorColor,
        x: coords.x,
        y: coords.y,
        width,
        height,
        fill: true, // todo
        fillStyle: minorColor,
      };

      this.socketNext(SocketMethods.DRAW, {
        type: ToolTypes.RECT,
        params,
      });

      Rect.draw(this.canvasCtx, params);

      // clear select
      this.$selectSquare.style.display = 'none';
      this.socketNext(SocketMethods.SELECT, {
        params: { startCoords, coords, figure: this.type, isShow: false },
        type: ToolTypes.NONE,
      });
    });

    this.subs.push(sub);
  }

  static draw(canvasCtx: CanvasRenderingContext2D, params: IDrawRectParams) {
    const { lineWidth, strokeStyle, x, y, width, height, fill, fillStyle } = params;

    canvasCtx.beginPath();
    canvasCtx.lineWidth = lineWidth;
    canvasCtx.strokeStyle = strokeStyle;
    canvasCtx.lineCap = 'butt';
    canvasCtx.lineJoin = 'miter';
    canvasCtx.rect(x, y, width, height);

    if (fill) {
      canvasCtx.fill();
      canvasCtx.fillStyle = fillStyle;
    }
    canvasCtx.stroke();
  }

  setSocketNext(socketNext: (method: SocketMethods, payload: SocketPayload) => void): void {
    this.socketNext = socketNext;
  }

  setFill$(obs$: Observable<Change>): void {
    this.fill$ = obs$;
  }

  setInitShapeType(shapeType: ShapeTypes): void {
    this.initShapeType = shapeType;
  }
}
