let prefix = '';
let host = location.host
    .split('.')
    .slice(-2)
    .join('.');
// 线上环境去除域名环境前缀
if (import.meta.env.MODE !== 'production') {
    prefix = import.meta.env.VITE_ENV + '.';
}
// 本地调试使用env文件中的host
if (import.meta.env.MODE !== 'production') {
    host = import.meta.env.VITE_HOST || host;
}
/**
 * @name 根据功能模块创建地址
 * @param { string } module
 */
export function createModuleUrl(module, protocol = location.protocol) {
    console.log(protocol, host);
    // return `${protocol}//${prefix}${module}.${host}`;
    return `${protocol}//${host}`;
}
//# sourceMappingURL=createModuleUrl.js.map