import request from '../request'

const serviceName = '/api/bill';

type Params = { date: number, page?: number, page_size?: number, type_id?: number | string }

export function getBillData({ date, page = 1, page_size = 10, type_id = 'all' }: Params) {
  return request(`${serviceName}/list`, { body: { date, page, page_size, type_id } })
}


export function updateBill(params: any) {
  return request(`${serviceName}/update`, {
    method: 'POST',
    body: params
  })
}

export function addBill(params: any) {
  return request(`${serviceName}/add`, {
    method: "POST",
    body: params
  })
}