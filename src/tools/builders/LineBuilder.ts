import { Observable } from 'rxjs';
import { Line } from '../Line';
import { Change, ShapeFillTypes } from '../../types';
import { ShapeBuilder } from './ShapeBuilder';

export class LineBuilder extends ShapeBuilder {
  protected tool: Line;

  constructor($shield: HTMLDivElement, $canvas: HTMLCanvasElement) {
    super();
    const obs$ = new Observable<Change>();
    const div = document.createElement('div');
    const socketNext = () => {};

    this.tool = new Line(
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
