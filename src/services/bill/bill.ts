import request from '../request'

const serviceName = '/api/bill';

export function getBillData({ date = new Date().valueOf(), page = 1, page_size = 10, type_id = 'all' } = {}) {
  console.log(page)
  return request(`${serviceName}/list`, { body: { date, page, page_size, type_id } })
}