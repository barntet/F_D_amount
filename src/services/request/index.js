import 'abort-controller/polyfill';
import { fetch } from './fetch';
import { stringify } from 'qs';
export * from './FetchObserver';
/**
 * @name 请求封装
 * @param originUrl 请求地址
 * @param options 请求参数
 */
export default function request(originUrl, options) {
    const mixedOptions = {
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
        delete mixedOptions.headers['Content-Type'];
    }
    else if (mixedOptions.headers['Content-Type'] === 'application/json') {
        mixedOptions.body = mixedOptions.body && JSON.stringify(mixedOptions.body);
    }
    if (mixedOptions.useBeacon &&
        typeof navigator !== 'undefined' &&
        navigator.sendBeacon) {
        const result = navigator.sendBeacon(originUrl, mixedOptions.body);
        if (!result)
            return Promise.reject(new Error('network error'));
        return Promise.resolve(true);
    }
    else {
        return fetch(originUrl, mixedOptions)
            .then(res => mixedOptions.parseResponse
            ? mixedOptions.parseResponse(res)
            : res.json())
            .then(data => processData(data));
    }
}
function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
/* istanbul ignore next */
function processData(result) {
    if (!result) {
        throw result;
    }
    else if (has(result, 'success') && result.success === false) {
        throw result;
    }
    else if (has(result, 'code') && result.code !== 0) {
        throw result;
    }
    else if (result.list) {
        return result.list;
    }
    else if (has(result, 'data')) {
        return result.data;
    }
    else {
        return result;
    }
}
//# sourceMappingURL=index.js.map