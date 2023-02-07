import request from '../request';
const serviceName = '/api/bill';
export function getBillList({ date, page = 1, page_size = 10, type_id = 'all' }) {
    return request(`${serviceName}/list`, { body: { date, page, page_size, type_id } });
}
export function updateBill(params) {
    return request(`${serviceName}/update`, {
        method: 'POST',
        body: params
    });
}
export function addBill(params) {
    return request(`${serviceName}/add`, {
        method: "POST",
        body: params
    });
}
export function getBillDetail(id) {
    return request(`${serviceName}/detail?id=${id}`);
}
export function deleteBill(id) {
    return request(`${serviceName}/delete`, { method: 'POST', body: { id } });
}
export function getBillData(date) {
    return request(`${serviceName}/data`, { body: { date } });
}
//# sourceMappingURL=bill.js.map