import request from '../utils/request';
import qs from 'querystring';

export async function query(params) {
  return request(`/api/users?${qs.stringify(params)}`);
}