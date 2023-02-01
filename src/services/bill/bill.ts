import request from '../request'

const serviceName = '/api/bill';

export function getBillData({ date = new Date().valueOf(), page = 1, page_size = 10, type_id = 'all' } = {}) {
  return request(`${serviceName}/list`, { body: { date: 1674144000000, page, page_size, type_id } })
}