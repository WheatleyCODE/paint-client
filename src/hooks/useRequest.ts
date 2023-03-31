import { useState } from 'react';
import { $api } from '../api';

export interface IRequestStatus {
  data: any;
  isLoading: boolean;
  error: any | null;
}

export interface IRequestReturnStatus<T, E = unknown> {
  data: T;
  isLoading: boolean;
  error: E;
  req: (filds?: any) => Promise<void>;
}

export type Method = 'post' | 'get';

export interface IUseRequestParams {
  url: string;
  method: Method;
}

export const initState: IRequestStatus = {
  isLoading: false,
  error: null,
  data: undefined,
};

export const useRequest = <T, E = unknown>(prms: IUseRequestParams): IRequestReturnStatus<T, E> => {
  const { url, method } = prms;

  const [reqStatus, setReqStatus] = useState<IRequestStatus>(initState);

  const req = async (filds?: any) => {
    try {
      setReqStatus((p) => ({ ...p, isLoading: true }));
      const { data } = await $api[method]<T>(url, filds);

      setReqStatus((p) => ({ ...p, data }));
    } catch (error) {
      setReqStatus((p) => ({ ...p, error }));
    } finally {
      setReqStatus((p) => ({ ...p, isLoading: true }));
    }
  };

  return { ...reqStatus, req };
};
