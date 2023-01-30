import request from '../request';

export function getData(param: any) {
  // return request(
  //   `https://jisutqybmf.market.alicloudapi.com/weather/query?city=广州`,
  //   { method: 'GET', headers: { auth: false, Authorization: 'APPCODE 3f93473258724dac80e58562f8f09933' } }
  // );
  return request(
    `http://127.0.0.1:7001/api/bill/list`,
    { method: 'GET', auth: false, headers: { authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ6b3ZpIiwiZXhwIjoxNjc0MTEzNjMxLCJpYXQiOjE2NzQwMjcyMzF9.fpY3AJbTnytvmYuN_tsSD5jthKRHGJjV8Rb0vIW_TOk' } }
  );
}
