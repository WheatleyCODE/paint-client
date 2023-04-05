import { Observable } from 'rxjs';
import { Change, ShapeFillTypes } from '../../types';
import { ShapeBuilder } from './ShapeBuilder';
import { Circle } from '../Circle';

export class CircleBuilder extends ShapeBuilder {
  protected tool: Circle;

  constructor($shield: HTMLDivElement, $canvas: HTMLCanvasElement) {
    super();
    const obs$ = new Observable<Change>();
    const div = document.createElement('div');
    const socketNext = () => {};

    this.tool = new Circle(
      $shield,
      $canvas,
      obs$,
      '#fafafa',
      obs$,
      '#fafafa',
      obs$,
      10,
      obs$,
      ShapeFillTypes.FILL_BORDER,
      div,
      socketNext
    );
  }

  build() {
    return this.tool;
  }
}
