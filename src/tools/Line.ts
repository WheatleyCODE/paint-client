import { filter, map, Observable, switchMap, takeLast, takeUntil, tap, withLatestFrom } from 'rxjs';
import { Shape } from './abstract/Shape';
import {
  createStream,
  applyFillTypeStyles,
  removeStylesOnSelectSquare,
  checkMouseButtonAndGetOffsetCoords,
} from '../utils';
import { MOUSE_RIGHT } from '../consts';
import {
  Change,
  IDrawLineParams,
  ILine,
  ShapeFillTypes,
  SocketMethods,
  SocketPayload,
  ToolTypes,
} from '../types';

export class Line extends Shape implements ILine {
  type = ToolTypes.LINE;
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
    const fill$Stream$ = createStream(this.fill$, this.initShapeFillType);
    const majorColorStream$ = createStream(this.majorColor$, this.initMajorColor);
    const minorColorStream$ = createStream(this.minorColor$, this.initMinorColor);
    const lineWidthStream$ = createStream(this.lineWidth$, this.initLineWidth);

    const streamMouseMove$ = this.mouseMove$.pipe(
      map((e) => ({ x: e.offsetX, y: e.offsetY })),
      takeUntil(this.mouseUp$),
      takeUntil(this.mouseOut$)
    );

    const streamMouseDown$ = this.mouseDown$.pipe(
      tap(() => this.save()),
      map(checkMouseButtonAndGetOffsetCoords),
      filter((a) => !a.isDisable),
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
          takeLast(1)
        );
      })
    );

    const sub = streamMouseDown$.subscribe(({ coords, options }) => {
      const { lineWidth, majorColor, minorColor, fillType, startCoords, isReverse } = options;

      const params: IDrawLineParams = {
        lineWidth: +lineWidth,
        strokeStyle: isReverse ? minorColor : majorColor,
        fromX: startCoords.x,
        fromY: startCoords.y,
        toX: coords.x,
        toY: coords.y,
        fillType,
        fillStyle: isReverse ? majorColor : minorColor,
      };

      this.socketNext(SocketMethods.DRAW, {
        type: ToolTypes.LINE,
        params,
      });

      Line.draw(this.canvasCtx, params);

      // clear select
      removeStylesOnSelectSquare(this.$selectSquare, this.type);
    });

    this.subs.push(sub);
  }

  static draw(canvasCtx: CanvasRenderingContext2D, params: IDrawLineParams) {
    const { lineWidth, strokeStyle, fromX, fromY, toX, toY, fillType, fillStyle } = params;

    canvasCtx.lineWidth = lineWidth;
    canvasCtx.strokeStyle = strokeStyle;
    canvasCtx.lineCap = 'butt';
    canvasCtx.lineJoin = 'miter';
    canvasCtx.fillStyle = fillStyle;

    canvasCtx.beginPath();
    canvasCtx.moveTo(fromX, fromY);
    canvasCtx.lineTo(toX, toY);

    applyFillTypeStyles(canvasCtx, fillType);
  }

  setSocketNext(socketNext: (method: SocketMethods, payload: SocketPayload) => void): void {
    this.socketNext = socketNext;
  }
}
