import { ChangeEvent } from 'react';
import { map, Observable, Observer, startWith } from 'rxjs';

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
