import { Observable } from 'rxjs';
import { Change, ShapeTypes } from '../../types';
import { ShapeBuilder } from './ShapeBuilder';
import { Triangle } from '../Triangle';

export class TriangleBuilder extends ShapeBuilder {
  protected tool: Triangle;

  constructor($shield: HTMLDivElement, $canvas: HTMLCanvasElement) {
    super();
    const obs$ = new Observable<Change>();
    const div = document.createElement('div');
    const socketNext = () => {};

    this.tool = new Triangle(
      $shield,
      $canvas,
      obs$,
      '#fafafa',
      obs$,
      '#fafafa',
      obs$,
      10,
      obs$,
      ShapeTypes.FILL_BORDER,
      div,
      socketNext
    );
  }

  build() {
    return this.tool;
  }
}
