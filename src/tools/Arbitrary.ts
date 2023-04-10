import { map, Observable, tap, withLatestFrom } from 'rxjs';
import { Shape } from './abstract/Shape';
import { applyFillTypeStyles, createStream, removeStylesOnSelectSquare } from '../utils';
import { MOUSE_RIGHT } from '../consts';
import {
  Change,
  Coords,
  IArbitrary,
  IDrawArbitraryParams,
  ShapeFillTypes,
  SocketMethods,
  SocketPayload,
  ToolTypes,
} from '../types';

export class Arbitrary extends Shape implements IArbitrary {
  type = ToolTypes.ARBITRARY;
  isArbitrary = true;
  protected socketNext: (method: SocketMethods, payload: SocketPayload) => void;
  protected coords: Coords[] = [];

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

    const streamMouseDown$ = this.mouseDown$.pipe(
      tap(() => this.save()),
      map((e) => ({
        coords: { x: e.offsetX, y: e.offsetY },
        isReverse: e.buttons === MOUSE_RIGHT,
      })),
      withLatestFrom(
        majorColorStream$,
        minorColorStream$,
        lineWidthStream$,
        fill$Stream$,
        ({ coords, isReverse }, majorColor, minorColor, lineWidth, fillType) => ({
          coords,
          options: {
            majorColor,
            minorColor,
            lineWidth,
            fillType,
            isReverse,
          },
        })
      )
    );

    const streamMouseOut$ = this.mouseOut$.pipe(
      withLatestFrom(streamMouseDown$, (_, options) => ({
        ...options,
      }))
    );

    const subscriptionMouseOut = streamMouseOut$.subscribe(({ options }) => {
      const { lineWidth, majorColor, minorColor, fillType, isReverse } = options;

      this.coords = [];

      const params: IDrawArbitraryParams = {
        lineWidth: +lineWidth,
        strokeStyle: isReverse ? minorColor : majorColor,
        coords: [],
        isEnd: true,
        fillType,
        fillStyle: isReverse ? majorColor : minorColor,
      };

      this.socketNext(SocketMethods.DRAW, {
        type: ToolTypes.ARBITRARY,
        params,
      });

      Arbitrary.draw(this.canvasCtx, params);
    });

    const subscriptionMouseDown = streamMouseDown$.subscribe(({ coords, options }) => {
      const { lineWidth, majorColor, minorColor, fillType, isReverse } = options;

      this.coords.push([coords.x, coords.y]);

      const params: IDrawArbitraryParams = {
        lineWidth: +lineWidth,
        strokeStyle: isReverse ? minorColor : majorColor,
        coords: this.coords,
        isEnd: false,
        fillType,
        fillStyle: isReverse ? majorColor : minorColor,
      };

      this.socketNext(SocketMethods.DRAW, {
        type: ToolTypes.ARBITRARY,
        params,
      });

      Arbitrary.draw(this.canvasCtx, params);
      removeStylesOnSelectSquare(this.$selectSquare, this.type);
    });

    this.subs.push(subscriptionMouseDown);
    this.subs.push(subscriptionMouseOut);
  }

  static draw(canvasCtx: CanvasRenderingContext2D, params: IDrawArbitraryParams) {
    const { lineWidth, strokeStyle, coords, isEnd, fillType, fillStyle } = params;

    if (isEnd) {
      canvasCtx.closePath();
      applyFillTypeStyles(canvasCtx, fillType);
      return;
    }

    canvasCtx.lineWidth = lineWidth;
    canvasCtx.strokeStyle = strokeStyle;
    canvasCtx.lineCap = 'butt';
    canvasCtx.lineJoin = 'miter';
    canvasCtx.fillStyle = fillStyle;

    if (coords.length === 1) {
      canvasCtx.beginPath();
      canvasCtx.moveTo(coords[0][0], coords[0][1]);
    }

    if (coords.length > 1) {
      const [x, y] = coords[coords.length - 1];
      canvasCtx.lineTo(x, y);
    }

    applyFillTypeStyles(canvasCtx, fillType);
  }

  setSocketNext(socketNext: (method: SocketMethods, payload: SocketPayload) => void): void {
    this.socketNext = socketNext;
  }
}
