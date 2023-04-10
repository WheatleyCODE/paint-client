import { ShapeTypes } from '../../types';
import { RectBuilder } from './RectBuilder';
import { CircleBuilder } from './CircleBuilder';
import { TriangleBuilder } from './TriangleBuilder';
import { ArbitraryBuilder } from './ArbitraryBuilder';
import { LineBuilder } from './LineBuilder';

export abstract class ShapeBuilderFactory {
  static shapeBuilders = {
    [ShapeTypes.RECT]: RectBuilder,
    [ShapeTypes.CIRCLE]: CircleBuilder,
    [ShapeTypes.TRIANGLE]: TriangleBuilder,
    [ShapeTypes.ARBITRARY]: ArbitraryBuilder,
    [ShapeTypes.LINE]: LineBuilder,
  };

  static create(shapeType: ShapeTypes, shield: HTMLDivElement, canvas: HTMLCanvasElement) {
    return new ShapeBuilderFactory.shapeBuilders[shapeType](shield, canvas);
  }
}
