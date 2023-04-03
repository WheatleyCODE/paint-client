import { Observable } from 'rxjs';
import { ChangeEvent } from 'react';

export type Change = ChangeEvent<HTMLInputElement>;

export interface IObservables {
  majorColor$?: Observable<ChangeEvent<HTMLInputElement>>;
  minorColor$?: Observable<ChangeEvent<HTMLInputElement>>;
  lineWidth$?: Observable<ChangeEvent<HTMLInputElement>>;
  fill$?: Observable<ChangeEvent<HTMLInputElement>>;
}
