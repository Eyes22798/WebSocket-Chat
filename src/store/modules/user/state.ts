import { UserInfo } from '@/api/modules/user'

export interface UserState {
  isLogin: boolean;
  userInfo: UserInfo | string;
}

const emptyUserInfo: UserInfo = {
  name: '',
  pass: '',
  code: '',
  photo: [],
  signature: '',
  nickname: '',
  email: '',
  sex: '3', // 0 男 1 女 3 保密
  bubble: '', // 气泡
  chatColor: '', // 聊天文字颜色
  bgOpa: 0, // 聊天框透明度
  projectTheme: '', // 项目主题
  wallpaper: '', // 聊天壁纸
  signUpTime: '' as unknown as Date,// 注册时间
  lastLoginTime: '' as unknown as Date,// 最后一次登录
  conversationsList: [],// 会话列表 * name 会话名称 * photo 会话头像 * id 会话id * type 会话类型 group/ frend
  cover: [], // 封面展示
  emoji: [], // 表情包
  status: 0 , // 0：正常可用，1：冻结不可用，2：注销不可用
  age: '',
  loginSetting: {
    browser: '',
    country: '',
    ip: '',
    os: '',
  }, // 存储用户登录的IP、浏览器、OS等信息
  onlineTime: 0,
}

export const state = {
  isLogin: JSON.parse(window.sessionStorage.getItem('isLogin') || "false") as boolean,
  userInfo: JSON.parse(window.localStorage.getItem('userInfo') || '{}')
}
