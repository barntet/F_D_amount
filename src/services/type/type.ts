import request from '../request'

const serviceName = '/api/type';

export function getType() {
  return Promise.resolve([
    { id: 1, name: '餐饮', type: 1, user_id: 0 },
    { id: 2, name: '服饰', type: 1, user_id: 0 },
    { id: 3, name: '交通', type: 1, user_id: 0 },
    { id: 4, name: '日用', type: 1, user_id: 0 },
    { id: 5, name: '购物', type: 1, user_id: 0 },
    { id: 6, name: '学习', type: 1, user_id: 0 },
    { id: 7, name: '医疗', type: 1, user_id: 0 },
    { id: 8, name: '旅行', type: 1, user_id: 0 },
    { id: 9, name: '人情', type: 1, user_id: 0 },
    { id: 10, name: '其他', type: 1, user_id: 0 },
    { id: 11, name: '工资', type: 2, user_id: 0 },
    { id: 12, name: '奖金', type: 2, user_id: 0 },
    { id: 13, name: '转账', type: 2, user_id: 0 },
    { id: 14, name: '理财', type: 2, user_id: 0 },
    { id: 15, name: '退款', type: 2, user_id: 0 },
    { id: 16, name: '其他', type: 2, user_id: 0 },
  ])
  // return request(`${serviceName}/getType`)
}