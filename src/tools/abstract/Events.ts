import { fromEvent, Observable, Subscription } from 'rxjs';
import { IEvents } from '../../types';

export abstract class Events implements IEvents {
  protected mouseDown$: Observable<MouseEvent>;
  protected mouseUp$: Observable<MouseEvent>;
  protected mouseMove$: Observable<MouseEvent>;
  protected mouseOut$: Observable<MouseEvent>;

  protected subs: Subscription[] = [];

  constructor($canvas: HTMLCanvasElement) {
    this.mouseMove$ = fromEvent<MouseEvent>($canvas, 'mousemove');
    this.mouseDown$ = fromEvent<MouseEvent>($canvas, 'mousedown');
    this.mouseUp$ = fromEvent<MouseEvent>($canvas, 'mouseup');
    this.mouseOut$ = fromEvent<MouseEvent>($canvas, 'mouseout');
  }

  destroyEvents(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  abstract init(): void;
}
