import request from '../request';
const serviceName = '/api/user';
export function register(params) {
    return request(`${serviceName}/register`, { method: 'POST', body: params, auth: false });
}
export function login(params) {
    return request(`${serviceName}/login`, { method: 'POST', body: params, auth: false });
}
export function getInfo() {
    return request(`${serviceName}/getUserInfo`, { method: 'POST', });
}
export function editInfo(params) {
    return request(`${serviceName}/editUserInfo`, { method: "POST", body: params });
}
export function modifyPass(params) {
    return request(`${serviceName}/modifyPass`, { method: 'POST', body: params });
}
//# sourceMappingURL=user.js.map