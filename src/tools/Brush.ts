import { map, pairwise, switchMap, takeUntil, Observable, withLatestFrom, startWith } from 'rxjs';
import { ChangeEvent } from 'react';
import { Tool } from './Tool';
import { IBrush, ToolTypes } from '../types/tools.interfaces';

export class Brush extends Tool implements IBrush {
  initColor: string;
  initLineWidth: number;
  type: ToolTypes = ToolTypes.BRUSH;
  protected color$: Observable<ChangeEvent<HTMLInputElement>>;
  protected lineWidth$: Observable<ChangeEvent<HTMLInputElement>>;

  constructor(
    $canvas: HTMLCanvasElement,
    color$: Observable<ChangeEvent<HTMLInputElement>>,
    lineWidth$: Observable<ChangeEvent<HTMLInputElement>>,
    initColor: string,
    initLineWidth: number
  ) {
    super($canvas);
    this.color$ = color$;
    this.lineWidth$ = lineWidth$;
    this.initColor = initColor;
    this.initLineWidth = initLineWidth;
  }

  init() {
    const lineWidthStream$ = this.lineWidth$.pipe(
      map((e) => e.target.value),
      startWith(2)
    );

    const colorStream$ = this.color$.pipe(
      map((e) => e.target.value),
      startWith('#000')
    );

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

      this.canvasCtx.lineWidth = +lineWidth;
      this.canvasCtx.strokeStyle = color;

      this.canvasCtx.beginPath();
      this.canvasCtx.moveTo(from.x, from.y);
      this.canvasCtx.lineTo(to.x, to.y);
      this.canvasCtx.stroke();
    });

    this.subs.push(sub);
  }
}
