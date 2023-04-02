import { fromEvent, Observable, Subscription } from 'rxjs';
import { IEvents } from '../../types';

export abstract class Events implements IEvents {
  protected mouseDown$: Observable<MouseEvent>;
  protected mouseUp$: Observable<MouseEvent>;
  protected mouseMove$: Observable<MouseEvent>;
  protected mouseOut$: Observable<MouseEvent>;

  protected subs: Subscription[] = [];

  constructor($canvas: HTMLCanvasElement) {
    const div = document.querySelector('#shield') as Element;
    this.mouseMove$ = fromEvent<MouseEvent>(div, 'mousemove');
    this.mouseDown$ = fromEvent<MouseEvent>(div, 'mousedown');
    this.mouseUp$ = fromEvent<MouseEvent>(div, 'mouseup');
    this.mouseOut$ = fromEvent<MouseEvent>(div, 'mouseout');
  }

  destroyEvents(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  abstract init(): void;
}
