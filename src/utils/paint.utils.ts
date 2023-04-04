import { SelectSquareParams, ToolTypes } from '../types';

export const setStylesOnSelectSquare = (
  div: HTMLDivElement,
  params: SelectSquareParams,
  type: ToolTypes
) => {
  div.style.display = 'flex';
  div.classList.add(type.toLowerCase());
  div.style.top = params.top ? `${params.top}px` : 'initial';
  div.style.left = params.left ? `${params.left}px` : 'initial';
  div.style.right = params.right ? `${params.right}px` : 'initial';
  div.style.bottom = params.bottom ? `${params.bottom}px` : 'initial';

  div.style.height = `${params.height}px`;
  div.style.width = `${params.width}px`;
};
