import { Observable } from 'rxjs';
import { Canvas } from './Canvas';
import { ITool, ToolTypes, Change } from '../../types';

export abstract class Tool extends Canvas implements ITool {
  initMajorColor: string;
  initMinorColor: string;
  initLineWidth: number;

  protected majorColor$: Observable<Change>;
  protected minorColor$: Observable<Change>;
  protected lineWidth$: Observable<Change>;

  abstract type: ToolTypes;

  constructor(
    $shield: HTMLDivElement,
    $canvas: HTMLCanvasElement,
    majorColor$: Observable<Change>,
    initMajorColor: string,
    minorColor$: Observable<Change>,
    initMinorColor: string,
    lineWidth$: Observable<Change>,
    initLineWidth: number
  ) {
    super($shield, $canvas);

    this.majorColor$ = majorColor$;
    this.initMajorColor = initMajorColor;
    this.minorColor$ = minorColor$;
    this.initMinorColor = initMinorColor;
    this.lineWidth$ = lineWidth$;
    this.initLineWidth = initLineWidth;
  }

  setMajorColor$(obs$: Observable<Change>) {
    this.majorColor$ = obs$;
  }

  setInitMajorColor$(majorColor: string) {
    this.initMajorColor = majorColor;
  }

  setMinorColor$(obs$: Observable<Change>) {
    this.minorColor$ = obs$;
  }

  setInitMinorColor$(minorColor: string) {
    this.initMinorColor = minorColor;
  }

  setLineWidth$(obs$: Observable<Change>) {
    this.lineWidth$ = obs$;
  }

  setInitLineWidth(lineWidth: number) {
    this.initLineWidth = lineWidth;
  }
}
