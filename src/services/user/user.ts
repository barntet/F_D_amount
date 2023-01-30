import request from '../request';

const serviceName = '/api/user';

export function register(params: any) {
  return request(`${serviceName}/register`, { method: 'POST', body: params, auth: false })
}

export function login(params: any) {
  return request(`${serviceName}/login`, { method: 'POST', body: params, auth: false })
}