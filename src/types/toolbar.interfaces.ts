import { Observable } from 'rxjs';
import { ChangeEvent } from 'react';

export interface IObservables {
  color$?: Observable<ChangeEvent<HTMLInputElement>>;
  lineWidth$?: Observable<ChangeEvent<HTMLInputElement>>;
}
