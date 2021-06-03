import user from './modules/user'
import sys from './modules/sys'

export const API = 'api/v1'


interface Data {
  data: any;
  msg: string;
  status: string | number;
  timestamp?: string;
}
export interface Response {
  config: object;
  data: Data;
  header: object;
  request: object;
  status: number;
  statusText: string;
} 

export default {
  ...user,
  ...sys,
}
