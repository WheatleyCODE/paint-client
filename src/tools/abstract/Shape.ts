import { Observable } from 'rxjs';
import { IShape } from '../../types/tools.interfaces';
import { Tool } from './Tool';
import { Change } from '../../types/toolbar.interfaces';

export abstract class Shape extends Tool implements IShape {
  initFill: boolean;
  initFillColor: string;
  protected fill$: Observable<Change>;
  protected fillColor$: Observable<Change>;

  constructor(
    $canvas: HTMLCanvasElement,
    color$: Observable<Change>,
    initColor: string,
    lineWidth$: Observable<Change>,
    initLineWidth: number,
    fill$: Observable<Change>,
    initFill: boolean,
    fillColor$: Observable<Change>,
    initFillColor: string
  ) {
    super($canvas, color$, initColor, lineWidth$, initLineWidth);

    this.fill$ = fill$;
    this.initFill = initFill;
    this.fillColor$ = fillColor$;
    this.initFillColor = initFillColor;
  }
}
