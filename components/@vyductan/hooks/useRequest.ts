import { useEffect, useState } from "react";

// type UseRequest = a
export declare type Service<R, P extends any[]> = (...args: P) => Promise<R>;
export declare type RequestService =
  | string
  | {
      [key: string]: any;
    };
export declare type CombineService<R, P extends any[]> =
  | RequestService
  | ((...args: P) => RequestService)
  | Service<R, P>;

type ResultWithData<T = any> = { data?: T; [key: string]: any };
export declare type noop = (...args: any[]) => void;
export declare type Mutate<R> = (x: R | undefined | ((data: R) => R)) => void;

export interface FetchResult<R, P extends any[]> {
  loading: boolean;
  data: R | undefined;
  error: Error | undefined;
  params: P;
  cancel: noop;
  refresh: () => Promise<R>;
  mutate: Mutate<R>;
  run: (...args: P) => Promise<R>;
  unmount: () => void;
}

export interface BaseResult<R, P extends any[]> extends FetchResult<R, P> {
  reset: () => void;
  fetches: {
    [key in string]: FetchResult<R, P>;
  };
}

// function useRequest<R extends ResultWithData = any, P extends any[] = any>(
//   service: CombineService<R, P>
// ): BaseResult<R["data"], P> {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState();
//   useEffect(() => {
//     service().then((data) => {
//       setData(data);
//       setLoading(false);
//     });
//   }, []);
//   return { loading, data };
// }

type Result<R> = {
  loading: boolean;
  data?: R;
};
function useRequest<R>(service: () => Promise<R>): Result<R> {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<R>();
  useEffect(() => {
    service().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [service]);
  return { loading, data };
}
// const useRequest = (service: () => Promise<T>): BaseResult<R['data'], P> => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState();
//   useEffect(() => {
//     service().then((data) => {
//       setData(data);
//       setLoading(false);
//     });
//   }, []);
//   return { loading, data };
// };

export default useRequest;
