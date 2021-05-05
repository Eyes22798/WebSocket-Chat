import user from './modules/user'
import sys from './modules/sys'

export const API = 'api/v1'

export default {
  ...user,
  ...sys,
}
