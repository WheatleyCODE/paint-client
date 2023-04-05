import { Observable } from 'rxjs';
import { ToolBuilder } from './ToolBuilder';
import { Change, Shape, ShapeFillTypes } from '../../types';

export abstract class ShapeBuilder extends ToolBuilder {
  protected abstract tool: Shape;

  setFill$(obs$: Observable<Change>) {
    this.tool.setFill$(obs$);
    return this;
  }

  setInitShapeFillType(shapeFillType: ShapeFillTypes) {
    this.tool.setInitShapeFillType(shapeFillType);
    return this;
  }

  setSelectSquare($selectSquare: HTMLDivElement) {
    this.tool.setSelectSquare($selectSquare);
    return this;
  }
}
