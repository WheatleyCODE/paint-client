import { Observable } from 'rxjs';
import { Tool } from './Tool';
import { IShape, Change, ShapeFillTypes, SelectSquareParams, IDrawSelectParams } from '../../types';
import { removeStylesOnSelectSquare, setStylesOnSelectSquare } from '../../utils/paint/paint.utils';
import { SELECT_BORDER_SUM, TOOLBAR_WIDTH } from '../../consts';

type TriangleSides = {
  bottom?: HTMLDivElement;
  right?: HTMLDivElement;
  left?: HTMLDivElement;
};

const cache: { [key: string]: TriangleSides } = {};

export abstract class Shape extends Tool implements IShape {
  initShapeFillType: ShapeFillTypes;
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
    fill$: Observable<Change>,
    initShapeFillType: ShapeFillTypes,
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
    this.initShapeFillType = initShapeFillType;
    this.$selectSquare = $selectSquare;
  }

  static drawSelectSquare(
    $selectSquare: HTMLDivElement,
    $canvas: HTMLCanvasElement,
    drawParams: IDrawSelectParams
  ) {
    const { isShow, startCoords, coords, figure, triangleParams, username } = drawParams;

    if (!isShow) {
      removeStylesOnSelectSquare($selectSquare, figure);
      return;
    }

    const rect = $canvas.getBoundingClientRect();
    const params: SelectSquareParams = {};

    const { height, width } = rect;
    params.left = startCoords.x;
    params.top = startCoords.y;

    let selHight = coords.y - startCoords.y;
    let selWidth = coords.x - startCoords.x;
    let isTop = false;

    if (selHight < 0) {
      selHight *= -1;
      params.top = undefined;
      params.bottom = height - startCoords.y + SELECT_BORDER_SUM;
      isTop = true;
    }

    if (selWidth < 0) {
      selWidth *= -1;
      params.left = undefined;
      params.right = width - startCoords.x;
    }

    params.height = selHight;
    params.width = selWidth;

    if (triangleParams) {
      const user = String(username);
      if (!cache[user]) cache[user] = {};

      if (!cache[user].right) {
        cache[user].right = $selectSquare.querySelector(
          '[data-triangle="right"]'
        ) as HTMLDivElement;
      }

      if (!cache[user].left) {
        cache[user].left = $selectSquare.querySelector('[data-triangle="left"]') as HTMLDivElement;
      }

      if (!cache[user].bottom) {
        cache[user].bottom = $selectSquare.querySelector(
          '[data-triangle="bottom"]'
        ) as HTMLDivElement;
      }

      const { right, left, bottom } = cache[user];
      if (!right || !left || !bottom) return;

      right.style.height = `${triangleParams.sides.a}px`;
      left.style.height = `${triangleParams.sides.b}px`;
      bottom.style.width = `${triangleParams.sides.c}px`;

      right.style.transform = `rotate(-${90 - triangleParams.angles.a}deg) translateX(-${
        triangleParams.translateX
      }px)`;

      left.style.transform = `rotate(${90 - triangleParams.angles.b}deg) translateX(${
        triangleParams.translateX
      }px)`;
    }

    setStylesOnSelectSquare($selectSquare, params, figure, isTop);
  }

  setSelectSquare($selectSquare: HTMLDivElement) {
    this.$selectSquare = $selectSquare;
  }

  setFill$(obs$: Observable<Change>): void {
    this.fill$ = obs$;
  }

  setInitShapeFillType(shapeFillType: ShapeFillTypes): void {
    this.initShapeFillType = shapeFillType;
  }
}
