import { Observable } from 'rxjs';
import { Rect } from '../Rect';
import { Change, ShapeFillTypes } from '../../types';
import { ShapeBuilder } from './ShapeBuilder';

export class RectBuilder extends ShapeBuilder {
  protected tool: Rect;

  constructor($shield: HTMLDivElement, $canvas: HTMLCanvasElement) {
    super();
    const obs$ = new Observable<Change>();
    const div = document.createElement('div');
    const socketNext = () => {};

    this.tool = new Rect(
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
