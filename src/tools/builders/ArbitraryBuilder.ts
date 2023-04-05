import { Observable } from 'rxjs';
import { ShapeBuilder } from './ShapeBuilder';
import { Arbitrary } from '../Arbitrary';
import { Change, ShapeFillTypes } from '../../types';

export class ArbitraryBuilder extends ShapeBuilder {
  protected tool: Arbitrary;

  constructor($shield: HTMLDivElement, $canvas: HTMLCanvasElement) {
    super();
    const obs$ = new Observable<Change>();
    const div = document.createElement('div');
    const socketNext = () => {};

    this.tool = new Arbitrary(
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
