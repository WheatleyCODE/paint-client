import { ChangeEvent } from 'react';
import { map, Observable, startWith } from 'rxjs';

export const createStream = <
  T extends ChangeEvent<HTMLInputElement>,
  R extends string | number | boolean
>(
  stream$: Observable<T>,
  initValue: R
): Observable<string | R> => {
  const newStream$ = stream$.pipe(
    map((e) => e.target.value),
    startWith(initValue)
  );

  return newStream$;
};
