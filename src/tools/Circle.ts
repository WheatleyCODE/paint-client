import { map, Observable, switchMap, takeLast, takeUntil, tap, withLatestFrom } from 'rxjs';
import { Shape } from './abstract/Shape';
import { applyFillTypeStyles, createStream, removeStylesOnSelectSquare } from '../utils';
import { MOUSE_RIGHT } from '../consts';
import {
  Change,
  ICircle,
  IDrawCircleParams,
  IDrawSelectParams,
  ShapeFillTypes,
  SocketMethods,
  SocketPayload,
  ToolTypes,
} from '../types';

export class Circle extends Shape implements ICircle {
  type = ToolTypes.CIRCLE;
  isCircle = true;
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
      map((e) => ({
        startCoords: { x: e.offsetX, y: e.offsetY },
        isReverse: e.buttons === MOUSE_RIGHT,
      })),
      withLatestFrom(
        majorColorStream$,
        minorColorStream$,
        lineWidthStream$,
        fill$Stream$,
        ({ startCoords, isReverse }, majorColor, minorColor, lineWidth, fillType) => ({
          startCoords,
          majorColor,
          minorColor,
          lineWidth,
          fillType,
          isReverse,
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
      const { lineWidth, majorColor, minorColor, fillType, startCoords, isReverse } = options;

      const width = startCoords.x - coords.x;
      const height = startCoords.y - coords.y;
      const centerX = width / 2 + coords.x;
      const centerY = height / 2 + coords.y;
      let radiusX = width / 2;
      let radiusY = height / 2;

      radiusY = radiusY < 0 ? radiusY * -1 : radiusY;
      radiusX = radiusX < 0 ? radiusX * -1 : radiusX;

      const params: IDrawCircleParams = {
        lineWidth: +lineWidth,
        strokeStyle: isReverse ? minorColor : majorColor,
        centerX,
        centerY,
        radiusX,
        radiusY,
        fillType,
        fillStyle: isReverse ? majorColor : minorColor,
      };

      this.socketNext(SocketMethods.DRAW, {
        type: ToolTypes.CIRCLE,
        params,
      });

      Circle.draw(this.canvasCtx, params);

      // clear select
      removeStylesOnSelectSquare(this.$selectSquare, this.type);
      this.socketNext(SocketMethods.SELECT, {
        params: { startCoords, coords, figure: this.type, isShow: false },
        type: ToolTypes.NONE,
      });
    });

    this.subs.push(subscriptionMouseDown);
  }

  static draw(canvasCtx: CanvasRenderingContext2D, params: IDrawCircleParams) {
    const { lineWidth, strokeStyle, centerX, centerY, radiusX, radiusY, fillType, fillStyle } =
      params;

    canvasCtx.lineWidth = lineWidth;
    canvasCtx.strokeStyle = strokeStyle;
    canvasCtx.lineCap = 'butt';
    canvasCtx.lineJoin = 'miter';
    canvasCtx.fillStyle = fillStyle;

    canvasCtx.beginPath();
    canvasCtx.ellipse(centerX, centerY, radiusX, radiusY, Math.PI, 0, 2 * Math.PI);

    applyFillTypeStyles(canvasCtx, fillType);
  }

  setSocketNext(socketNext: (method: SocketMethods, payload: SocketPayload) => void): void {
    this.socketNext = socketNext;
  }
}
