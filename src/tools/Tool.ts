import { fromEvent, Observable, Subscription } from 'rxjs';
import { ITool, ToolTypes } from '../types/tools.interfaces';

export abstract class Tool implements ITool {
  protected mouseDown$: Observable<MouseEvent>;
  protected mouseUp$: Observable<MouseEvent>;
  protected mouseMove$: Observable<MouseEvent>;
  protected mouseOut$: Observable<MouseEvent>;

  protected $canvas: HTMLCanvasElement;
  protected canvasCtx: CanvasRenderingContext2D;
  protected canvasRect: DOMRect;
  protected scale: number;

  protected subs: Subscription[] = [];
  abstract type: ToolTypes;

  constructor($canvas: HTMLCanvasElement) {
    this.$canvas = $canvas;
    this.canvasCtx = $canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvasRect = $canvas.getBoundingClientRect();
    this.scale = window.devicePixelRatio;

    this.mouseMove$ = fromEvent<MouseEvent>($canvas, 'mousemove');
    this.mouseDown$ = fromEvent<MouseEvent>($canvas, 'mousedown');
    this.mouseUp$ = fromEvent<MouseEvent>($canvas, 'mouseup');
    this.mouseOut$ = fromEvent<MouseEvent>($canvas, 'mouseout');
  }

  destroyEvents() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  abstract init(): void;
}
