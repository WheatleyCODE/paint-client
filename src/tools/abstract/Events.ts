import { fromEvent, Observable, Subscription } from 'rxjs';
import { IEvents } from '../../types';

export abstract class Events implements IEvents {
  protected mouseDown$: Observable<MouseEvent>;
  protected mouseUp$: Observable<MouseEvent>;
  protected mouseMove$: Observable<MouseEvent>;
  protected mouseOut$: Observable<MouseEvent>;

  protected subs: Subscription[] = [];

  constructor($shield: HTMLDivElement) {
    this.mouseMove$ = fromEvent<MouseEvent>($shield, 'mousemove');
    this.mouseDown$ = fromEvent<MouseEvent>($shield, 'mousedown');
    this.mouseUp$ = fromEvent<MouseEvent>($shield, 'mouseup');
    this.mouseOut$ = fromEvent<MouseEvent>($shield, 'mouseout');
  }

  destroyEvents(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  abstract init(): void;
}
