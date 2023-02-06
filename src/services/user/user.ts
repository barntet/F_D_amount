import request from '../request';

const serviceName = '/api/user';

export function register(params: any) {
  return request(`${serviceName}/register`, { method: 'POST', body: params, auth: false })
}

export function login(params: any) {
  return request(`${serviceName}/login`, { method: 'POST', body: params, auth: false })
}

export function getInfo() {
  return request(`${serviceName}/getUserInfo`, { method: 'POST', })
}

export function editInfo(params: {
  signature: string,
  avatar: string
}) {
  return request(`${serviceName}/editUserInfo`, { method: "POST", body: params })
}

export function modifyPass(params: { oldPass: string, newPass: string, newPassT: string }) {
  return request(`${serviceName}/modifyPass`, { method: 'POST', body: params })
}