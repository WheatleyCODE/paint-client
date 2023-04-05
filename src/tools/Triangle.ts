import { map, Observable, switchMap, takeLast, takeUntil, tap, withLatestFrom } from 'rxjs';
import { Shape } from './abstract/Shape';
import { applyFillTypeStyles, createStream } from '../utils';
import {
  Change,
  IDrawSelectParams,
  IDrawTriangleParams,
  ITriangle,
  ShapeFillTypes,
  SocketMethods,
  SocketPayload,
  ToolTypes,
} from '../types';
import { calcTriangle, removeStylesOnSelectSquare } from '../utils/paint.utils';

export class Triangle extends Shape implements ITriangle {
  type = ToolTypes.TRIANGLE;
  isTriangle = true;
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
    initShapeFileType: ShapeFillTypes,
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
      initShapeFileType,
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

            const width = startCoords.x - coords.x;
            const height = startCoords.y - coords.y;

            const triangleParams = calcTriangle(width, height);

            const params: IDrawSelectParams = {
              startCoords,
              coords,
              isShow: true,
              figure: this.type,
              triangleParams,
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

    const sub = streamMouseDown$.subscribe(({ coords, options }) => {
      const { lineWidth, majorColor, minorColor, fillType, startCoords } = options;

      const width = startCoords.x - coords.x;
      const height = startCoords.y - coords.y;

      const firstX = coords.x + width / 2;
      const firstY = startCoords.y;

      const lastX = startCoords.x;
      const lastY = startCoords.y - height;

      const params: IDrawTriangleParams = {
        lineWidth: +lineWidth,
        strokeStyle: majorColor,
        firstY,
        firstX,
        secondX: coords.x,
        secondY: coords.y,
        lastX,
        lastY,
        fillType,
        fillStyle: minorColor,
      };

      this.socketNext(SocketMethods.DRAW, {
        type: ToolTypes.TRIANGLE,
        params,
      });

      Triangle.draw(this.canvasCtx, params);

      // clear select
      removeStylesOnSelectSquare(this.$selectSquare, this.type);
      this.socketNext(SocketMethods.SELECT, {
        params: { startCoords, coords, figure: this.type, isShow: false },
        type: ToolTypes.NONE,
      });
    });

    this.subs.push(sub);
  }

  static draw(canvasCtx: CanvasRenderingContext2D, params: IDrawTriangleParams) {
    const {
      firstX,
      firstY,
      secondX,
      secondY,
      lastX,
      lastY,
      fillType,
      fillStyle,
      lineWidth,
      strokeStyle,
    } = params;

    canvasCtx.lineCap = 'butt';
    canvasCtx.lineJoin = 'miter';
    canvasCtx.strokeStyle = strokeStyle;
    canvasCtx.lineWidth = lineWidth;
    canvasCtx.fillStyle = fillStyle;

    canvasCtx.beginPath();
    canvasCtx.moveTo(firstX, firstY);
    canvasCtx.lineTo(secondX, secondY);
    canvasCtx.lineTo(lastX, lastY);
    canvasCtx.closePath();

    applyFillTypeStyles(canvasCtx, fillType);
  }

  setSocketNext(socketNext: (method: SocketMethods, payload: SocketPayload) => void): void {
    this.socketNext = socketNext;
  }
}
