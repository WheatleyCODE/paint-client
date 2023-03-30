import { map, pairwise, switchMap, takeUntil, withLatestFrom } from 'rxjs';
import { Tool } from './abstract/Tool';
import { createStream } from '../utils/stream.utils';
import { IBrush, ToolTypes } from '../types/tools.interfaces';

export class Brush extends Tool implements IBrush {
  isBrush = true;
  type = ToolTypes.BRUSH;

  init() {
    const colorStream$ = createStream(this.color$, this.initColor);
    const lineWidthStream$ = createStream(this.lineWidth$, this.initLineWidth);

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
