import { Toast } from 'zarm';
import baseRequest from './request/index';
import { createModuleUrl } from '../utils/createModuleUrl';
let customHeaders = {};
/**
 * @name 批量设置header
 * @param { Record<string, string>} headers
 */
export const serHeaders = (headers) => {
    customHeaders = {
        ...customHeaders,
        ...headers,
    };
};
export default async function request(relativeUrl, options = {}) {
    // const absoluteUrl = relativeUrl.startWith('/') ? relativeUrl :
    const absoluteUrl = relativeUrl.startsWith('/')
        ? createModuleUrl('', 'http:') + relativeUrl
        : relativeUrl;
    const headers = { ...customHeaders };
    if (options.auth !== false) {
        headers['X-Access-Token'] = localStorage['X-Access-Token'];
    }
    return baseRequest(absoluteUrl, {
        ...options,
        headers: { ...headers, ...options.headers },
    }).catch(error => {
        Toast.show(error.msg);
        throw error;
    });
}
//# sourceMappingURL=request.js.map