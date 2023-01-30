import 'abort-controller/polyfill';
import { fetch } from './fetch';
import { stringify } from 'qs';
import { FetchObserverCallback } from './FetchObserver';

export * from './FetchObserver';

export interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  headers?: Record<string, string>;
  body?: BodyInit | Record<string, any>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  parseResponse?: (res: Response) => RequestResult<any>;
  observe?: FetchObserverCallback;
  useBeacon?: boolean;
}

/**
 * @name 请求封装
 * @param originUrl 请求地址
 * @param options 请求参数
 */
export default function request<T>(
  originUrl: string,
  options?: RequestOptions,
): Promise<T> {
  const mixedOptions: RequestOptions = {
    method: 'GET',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers),
    },
  };
  if (mixedOptions.method === 'GET' && mixedOptions.body) {
    const flag = originUrl.includes('?') ? '&' : '?';
    originUrl += flag + stringify(mixedOptions.body);
    delete mixedOptions.body;
  }
  if (mixedOptions.body instanceof FormData) {
    delete mixedOptions.headers!['Content-Type'];
  } else if (mixedOptions.headers!['Content-Type'] === 'application/json') {
    mixedOptions.body = mixedOptions.body && JSON.stringify(mixedOptions.body);
  }
  if (
    mixedOptions.useBeacon &&
    typeof navigator !== 'undefined' &&
    navigator.sendBeacon
  ) {
    const result = navigator.sendBeacon(
      originUrl,
      mixedOptions.body as BodyInit,
    );
    if (!result) return Promise.reject(new Error('network error'));
    return (Promise.resolve(true) as unknown) as Promise<T>;
  } else {
    return fetch(originUrl, mixedOptions as RequestInit)
      .then(res =>
        mixedOptions.parseResponse
          ? mixedOptions.parseResponse(res)
          : res.json(),
      )
      .then(data => processData(data));
  }
}

export interface RequestResult<T> {
  data?: T;
  list?: T;
  code?: number;
  message?: string;
  success?: boolean;
}

function has(obj: object, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/* istanbul ignore next */
function processData<T>(result?: RequestResult<T>) {
  if (!result) {
    throw result;
  } else if (has(result, 'success') && result.success === false) {
    throw result;
  } else if (has(result, 'code') && result.code !== 0) {
    throw result;
  } else if (result.list) {
    return result.list as T;
  } else if (has(result, 'data')) {
    return result.data as T;
  } else {
    return result as T;
  }
}
