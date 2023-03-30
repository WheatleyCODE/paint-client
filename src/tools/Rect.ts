import { map, tap, switchMap, takeUntil, withLatestFrom, takeLast } from 'rxjs';
import { Shape } from './abstract/Shape';
import { IRect, ToolTypes } from '../types/tools.interfaces';
import { createStream } from '../utils/stream.utils';

export class Rect extends Shape implements IRect {
  type = ToolTypes.RECT;
  isRect = true;

  init() {
    const colorStream$ = createStream(this.color$, this.initColor);
    const lineWidthStream$ = createStream(this.lineWidth$, this.initLineWidth);
    const fill$Stream$ = createStream(this.fill$, this.initFill);
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
        (startCoords, lineWidth, color, fill) => ({
          startCoords,
          lineWidth,
          color,
          fill,
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
      const { lineWidth, color, fill, startCoords } = options;

      const width = startCoords.x - coords.x;
      const height = startCoords.y - coords.y;

      const copy$ = this.copy();

      copy$.subscribe((copyImg) => {
        this.canvasCtx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.canvasCtx.drawImage(copyImg, 0, 0);
        this.canvasCtx.beginPath();
        this.canvasCtx.strokeStyle = color;
        this.canvasCtx.rect(coords.x, coords.y, width, height);
        this.canvasCtx.lineWidth = +lineWidth;

        if (fill) {
          this.canvasCtx.fill();
          this.canvasCtx.fillStyle = color;
        }
        this.canvasCtx.stroke();
      });
    });

    this.subs.push(sub);
  }
}
