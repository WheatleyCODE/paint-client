import { Observable } from 'rxjs';
import { ITool, ToolTypes } from '../../types/tools.interfaces';
import { Canvas } from './Canvas';
import { Change } from '../../types/toolbar.interfaces';

export abstract class Tool extends Canvas implements ITool {
  initColor: string;
  initLineWidth: number;

  protected color$: Observable<Change>;
  protected lineWidth$: Observable<Change>;

  abstract type: ToolTypes;

  constructor(
    $canvas: HTMLCanvasElement,
    color$: Observable<Change>,
    initColor: string,
    lineWidth$: Observable<Change>,
    initLineWidth: number
  ) {
    super($canvas);
    this.color$ = color$;
    this.lineWidth$ = lineWidth$;
    this.initColor = initColor;
    this.initLineWidth = initLineWidth;
  }
}
