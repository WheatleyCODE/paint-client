import { SelectSquareParams, ToolTypes, TriangleParams } from '../../types';

export const setStylesOnSelectSquare = (
  div: HTMLDivElement,
  params: SelectSquareParams,
  type: ToolTypes,
  isTop?: boolean
) => {
  div.style.display = 'flex';
  div.classList.add(type.toLowerCase());
  div.style.top = params.top ? `${params.top}px` : 'initial';
  div.style.left = params.left ? `${params.left}px` : 'initial';
  div.style.right = params.right ? `${params.right}px` : 'initial';
  div.style.bottom = params.bottom ? `${params.bottom}px` : 'initial';

  div.style.height = `${params.height}px`;
  div.style.width = `${params.width}px`;

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  isTop ? div.classList.add('top') : div.classList.remove('top');
};

export const removeStylesOnSelectSquare = (div: HTMLDivElement, type: ToolTypes) => {
  div.style.display = 'none';
  div.style.top = '0px';
  div.style.left = '0px';
  div.style.right = '0px';
  div.style.bottom = '0px';

  div.style.height = '0px';
  div.style.width = '0px';
  div.classList.remove(type.toLowerCase());
};

export const calcTriangleAngles = (a: number, b: number, c: number) => {
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const cosB = (a * a + c * c - b * b) / (2 * a * c);
  const cosC = (a * a + b * b - c * c) / (2 * a * b);

  const angleA = (Math.acos(cosA) * 180) / Math.PI;
  const angleB = (Math.acos(cosB) * 180) / Math.PI;
  const angleC = (Math.acos(cosC) * 180) / Math.PI;

  return [Math.round(angleA), Math.round(angleB), Math.round(angleC)];
};

export const calcTriangle = (width: number, height: number): TriangleParams => {
  const w = width < 0 ? width * -1 : width;
  const h = height < 0 ? height * -1 : height;

  const side = Math.round(Math.sqrt((width / 2) ** 2 + h ** 2));
  const angles = calcTriangleAngles(side, side, w);

  const triangleParams: TriangleParams = {
    sides: {
      a: side * 2,
      b: side * 2,
      c: w,
    },

    angles: {
      a: angles[0],
      b: angles[1],
      c: angles[2],
    },

    translateX: (w / 4) * 2,
  };

  return triangleParams;
};

export const generateId = () => {
  return `f${Date.now().toString(16)}w`;
};
