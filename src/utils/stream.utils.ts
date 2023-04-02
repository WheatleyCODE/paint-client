import { ChangeEvent } from 'react';
import { debounceTime, map, Observable, Observer, startWith, tap } from 'rxjs';

export const createStream = <
  T extends ChangeEvent<HTMLInputElement>,
  R extends string | number | boolean
>(
  stream$: Observable<T>,
  initValue: R
): Observable<string | R> => {
  return stream$.pipe(
    map((e) => e.target.value),
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
