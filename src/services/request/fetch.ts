import { Headers, Request, Response, DOMException } from 'whatwg-fetch';
import { FetchObserver, FetchObserverCallback } from './FetchObserver';

const global: typeof globalThis =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  window;

const support = {
  searchParams: 'URLSearchParams' in global,
  iterable: 'Symbol' in global && 'iterator' in Symbol,
  blob:
    'FileReader' in global &&
    'Blob' in global &&
    (function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        /* istanbul ignore next */
        return false;
      }
    })(),
  formData: 'FormData' in global,
  arrayBuffer: 'ArrayBuffer' in global,
};
function normalizeValue(value: unknown) {
  return typeof value === 'string' ? value : String(value);
}

function parseHeaders(rawHeaders: string) {
  const headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
  // https://github.com/github/fetch/issues/748
  // https://github.com/zloirock/core-js/issues/751
  preProcessedHeaders
    .split('\r')
    .map(header =>
      header.indexOf('\n') === 0 ? header.substr(1, header.length) : header,
    )
    .forEach(function (line) {
      const parts = line.split(':');
      const key = parts.shift()!.trim();
      if (key) {
        const value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
  return headers;
}

/* istanbul ignore next */
function fixUrl(url: string) {
  try {
    return url === '' && global.location.href ? global.location.href : url;
  } catch (e) {
    return url;
  }
}

interface RequestInitWithObserve extends RequestInit {
  observe?: FetchObserverCallback;
}

/* istanbul ignore next */
export function fetch(
  input: RequestInfo,
  init?: RequestInitWithObserve,
): Promise<Response> {
  return new Promise(function (resolve, reject) {
    const request = new Request(input, init);

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'));
    }

    const xhr = new XMLHttpRequest();

    const abortXhr = () => xhr.abort();

    xhr.onload = function () {
      const headers = parseHeaders(xhr.getAllResponseHeaders() || '');
      const options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers,
        url:
          'responseURL' in xhr ? xhr.responseURL : headers.get('X-Request-URL'),
      };
      const body = (('response' in xhr) as boolean)
        ? xhr.response
        : xhr.responseText;
      setTimeout(function () {
        resolve(new Response(body, options));
      }, 0);
    };

    xhr.onerror = function () {
      setTimeout(function () {
        reject(new TypeError('Network request failed'));
      }, 0);
    };

    xhr.ontimeout = function () {
      setTimeout(function () {
        reject(new TypeError('Network request failed'));
      }, 0);
    };

    xhr.onabort = function () {
      setTimeout(function () {
        reject(new DOMException('Aborted', 'AbortError'));
      }, 0);
    };

    xhr.open(request.method, fixUrl(request.url), true);

    if (request.credentials === 'include') {
      xhr.withCredentials = true;
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false;
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        xhr.responseType = 'blob';
      } else if (
        support.arrayBuffer &&
        request.headers.get('Content-Type') &&
        request.headers
          .get('Content-Type')!
          .indexOf('application/octet-stream') !== -1
      ) {
        xhr.responseType = 'arraybuffer';
      }
    }

    if (
      init &&
      typeof init.headers === 'object' &&
      !(init.headers instanceof Headers)
    ) {
      const headers = init.headers as Record<string, string>;
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        xhr.setRequestHeader(name, normalizeValue(headers[name]));
      });
    } else {
      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr);

      xhr.onreadystatechange = function () {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr);
        }
      };
    }

    if (init && init.observe) {
      const observer = new FetchObserver();
      // 上传进度
      xhr.upload.onprogress = function (originEvent) {
        const event = new ProgressEvent('requestprogress', {
          loaded: originEvent.loaded,
          total: originEvent.total,
          lengthComputable: originEvent.lengthComputable,
        });
        observer.dispatchEvent(event);
        observer.onrequestprogress && observer.onrequestprogress(originEvent);
      };
      // 下载进度
      xhr.onprogress = function (originEvent) {
        const event = new ProgressEvent('responseprogress', {
          loaded: originEvent.loaded,
          total: originEvent.total,
          lengthComputable: originEvent.lengthComputable,
        });
        observer.dispatchEvent(event);
        observer.onresponseprogress && observer.onresponseprogress(event);
      };
      init.observe(observer);
    }

    const bodyInit = (request as any)._bodyInit;

    xhr.send(typeof bodyInit === 'undefined' ? null : bodyInit);
  });
}
