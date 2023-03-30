import { Observable } from 'rxjs';
import { ChangeEvent } from 'react';

export type Change = ChangeEvent<HTMLInputElement>;

export interface IObservables {
  color$?: Observable<ChangeEvent<HTMLInputElement>>;
  lineWidth$?: Observable<ChangeEvent<HTMLInputElement>>;
  borderWidth$?: Observable<ChangeEvent<HTMLInputElement>>;
  fill$?: Observable<ChangeEvent<HTMLInputElement>>;
  fillColor$?: Observable<ChangeEvent<HTMLInputElement>>;
}
