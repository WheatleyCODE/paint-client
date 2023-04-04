import { Observable } from 'rxjs';
import { Tool } from './Tool';
import { IShape, Change, ShapeTypes, SelectSquareParams, IDrawSelectParams } from '../../types';
import { setStylesOnSelectSquare } from '../../utils/paint.utils';

export abstract class Shape extends Tool implements IShape {
  initShapeType: ShapeTypes;
  protected fill$: Observable<Change>;
  protected $selectSquare: HTMLDivElement;

  constructor(
    $shield: HTMLDivElement,
    $canvas: HTMLCanvasElement,
    majorColor$: Observable<Change>,
    initMajorColor: string,
    minorColor$: Observable<Change>,
    initMinorColor: string,
    lineWidth$: Observable<Change>,
    initLineWidth: number,
    fill$: Observable<Change>, // todo check
    initShapeType: ShapeTypes,
    $selectSquare: HTMLDivElement
  ) {
    super(
      $shield,
      $canvas,
      majorColor$,
      initMajorColor,
      minorColor$,
      initMinorColor,
      lineWidth$,
      initLineWidth
    );

    this.fill$ = fill$;
    this.initShapeType = initShapeType;
    this.$selectSquare = $selectSquare;
  }

  static drawSelectSquare(
    $selectSquare: HTMLDivElement,
    $canvas: HTMLCanvasElement,
    drawParams: IDrawSelectParams
  ) {
    const { isShow, startCoords, coords, figure } = drawParams;

    if (!isShow) {
      $selectSquare.style.display = 'none';
      return;
    }

    const rect = $canvas.getBoundingClientRect();
    const params: SelectSquareParams = {};

    const { height, width } = rect;
    params.left = startCoords.x;
    params.top = startCoords.y;

    let selHight = coords.y - startCoords.y;
    let selWidth = coords.x - startCoords.x;

    if (selHight < 0) {
      selHight *= -1;
      params.top = undefined;
      params.bottom = height - startCoords.y + 6;
    }

    if (selWidth < 0) {
      selWidth *= -1;
      params.left = undefined;
      params.right = width - startCoords.x;
    }

    params.height = selHight;
    params.width = selWidth;

    setStylesOnSelectSquare($selectSquare, params, figure);
  }

  setSelectSquare($selectSquare: HTMLDivElement) {
    this.$selectSquare = $selectSquare;
  }
}
