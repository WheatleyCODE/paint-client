import { Observable } from 'rxjs';
import { ToolBuilder } from './ToolBuilder';
import { Change, Shape, ShapeTypes } from '../../types';

export abstract class ShapeBuilder extends ToolBuilder {
  protected abstract tool: Shape;

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
}
