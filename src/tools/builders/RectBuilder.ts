import { Observable } from 'rxjs';
import { Rect } from '../Rect';
import { Change, ShapeTypes } from '../../types';
import { ToolBuilder } from './ToolBuilder';

export class RectBuilder extends ToolBuilder {
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
      ShapeTypes.FILL_BORDER,
      div,
      socketNext
    );
  }

  setFill$(obs$: Observable<Change>) {
    this.tool.setFill$(obs$);
    return this;
  }

  setInitShapeType(shapeType: ShapeTypes) {
    this.tool.setInitShapeType(shapeType);
    return this;
  }

  setSelectSquare($selectSquare: HTMLDivElement) {
    this.tool.setSelectSquare($selectSquare);
    return this;
  }

  build() {
    return this.tool;
  }
}
