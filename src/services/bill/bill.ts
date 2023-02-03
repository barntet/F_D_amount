import request from '../request'

const serviceName = '/api/bill';

type Params = { date: number, page?: number, page_size?: number, type_id?: number | string }

export function getBillList({ date, page = 1, page_size = 10, type_id = 'all' }: Params) {
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


export function getBillDetail(id: number) {
  return request(`${serviceName}/detail?id=${id}`)
}

export function deleteBill(id: number) {
  return request(`${serviceName}/delete`, { method: 'POST', body: { id } })
}

export function getBillData(date: number) {
  return request(`${serviceName}/data`, { body: { date } })

}