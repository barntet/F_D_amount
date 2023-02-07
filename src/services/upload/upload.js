import request from '../request';
const serviceName = '/api';
export function upload(file) {
    let formData = new FormData();
    formData.append('file', file.file);
    return request(`${serviceName}/upload`, { method: 'POST', body: formData, headers: { 'Content-Type': 'multiple/form-data' } });
}
//# sourceMappingURL=upload.js.map