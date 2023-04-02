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

import { IDrawRectParams, IRect, ToolTypes, SocketMethods, SocketPayload, Change } from '../types';

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
    const div = document.querySelector('#select') as HTMLDivElement;

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
          tap((value) => {
            const { startCoords } = value.options;
            const wid = value.coords.x - startCoords.x;
            const hei = value.coords.y - startCoords.y;

            type SelectSquare = {
              top?: number;
              left?: number;
              bottom?: number;
              right?: number;
              height?: number;
              width?: number;
            };

            const data: SelectSquare = {};

            const { left, top, height, width } = this.canvasRect;

            data.left = startCoords.x;
            data.top = startCoords.y;

            let selHight = value.coords.y - startCoords.y;
            let selWidth = value.coords.x - startCoords.x;

            if (selHight < 0) {
              selHight *= -1;
              data.top = undefined;
              data.bottom = height - startCoords.y + 6;
            }

            if (selWidth < 0) {
              selWidth *= -1;
              data.left = undefined;
              data.right = width - startCoords.x;
            }

            data.height = selHight;
            data.width = selWidth;

            if (data.top) {
              div.style.top = `${data.top}px`;
            } else {
              div.style.top = 'initial';
            }

            if (data.left) {
              div.style.left = `${data.left}px`;
            } else {
              div.style.left = 'initial';
            }

            if (data.right) {
              div.style.right = `${data.right}px`;
            } else {
              div.style.right = 'initial';
            }

            if (data.bottom) {
              div.style.bottom = `${data.bottom}px`;
            } else {
              div.style.bottom = 'initial';
            }

            div.style.height = `${data.height}px`;
            div.style.width = `${data.width}px`;
          }),
          takeLast(1)
        );
      })
    );

    const sub = streamMD$.subscribe(({ coords, options }) => {
      const { lineWidth, color, fill, startCoords, fillColor } = options;

      const width = startCoords.x - coords.x;
      const height = startCoords.y - coords.y;

      const onload$ = this.copy();

      onload$.subscribe((img) => {
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
    });

    this.subs.push(sub);
  }

  static draw(canvasCtx: CanvasRenderingContext2D, params: IDrawRectParams) {
    const { lineWidth, strokeStyle, x, y, width, height, fill, fillColor } = params;

    canvasCtx.beginPath();
    canvasCtx.lineWidth = lineWidth;
    canvasCtx.strokeStyle = strokeStyle;
    canvasCtx.lineCap = 'butt';
    canvasCtx.lineJoin = 'miter';
    canvasCtx.rect(x, y, width, height);

    if (fill) {
      canvasCtx.fill();
      canvasCtx.fillStyle = fillColor;
    }
    canvasCtx.stroke();
  }
}
