import { ChangeEvent } from 'react';
import { map, Observable, Observer, startWith } from 'rxjs';
import { MOUSE_LEFT, MOUSE_RIGHT } from '../consts';

export const createStream = <
  T extends ChangeEvent<HTMLInputElement>,
  R extends string | number | boolean
>(
  stream$: Observable<T>,
  initValue: R
): Observable<R> => {
  return stream$.pipe(
    map((e) => e.target.value as R),
    startWith(initValue)
  );
};

export const getStreamOnloadImg = (src: string): Observable<HTMLImageElement> => {
  return new Observable((observer: Observer<HTMLImageElement>) => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      observer.next(img);
      observer.complete();
    };

    img.onerror = (err) => {
      observer.error(err);
    };
  });
};

export const checkMouseButton = (e: MouseEvent) => {
  let isDisable = false;

  if (e.buttons !== MOUSE_RIGHT && e.buttons !== MOUSE_LEFT) {
    isDisable = true;
  }

  return { isDisable, isReverse: e.buttons === MOUSE_RIGHT };
};

export const checkMouseButtonAndGetOffsetCoords = (e: MouseEvent) => {
  let isDisable = false;

  if (e.buttons !== MOUSE_RIGHT && e.buttons !== MOUSE_LEFT) {
    isDisable = true;
  }

  return {
    startCoords: { x: e.offsetX, y: e.offsetY },
    isDisable,
    isReverse: e.buttons === MOUSE_RIGHT,
  };
};

export const getClientCoords = (e: MouseEvent) => {
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

export const getOffsetCoords = (e: MouseEvent) => {
  return {
    x: e.offsetX,
    y: e.offsetY,
  };
};
