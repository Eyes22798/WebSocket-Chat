import request from '@/utils/request'
import { API } from './../index'

interface KeyValue {
  value: string;
  key: string;
}

interface ConversationsList {
  id: string | number;
  name: string;
  photo: string;
  type: 'group' | 'friend';
}

interface LoginSetting {
  browser?: string;
  country?: string;
  ip?: string;
  os?: string;
}

export interface UserInfo {
  name: string;
  pass: string;
  code: string;
  photo: Array<string>;
  signature: string;
  nickname: string;
  email: string;
  province?: Array<KeyValue>;
  city?: Array<KeyValue>;
  town?: Array<KeyValue>;
  sex: '0' | '1' | '3'; // 0 男 1 女 3 保密
  bubble: string; // 气泡
  chatColor: string; // 聊天文字颜色
  bgOpa: number; // 聊天框透明度
  projectTheme: string; // 项目主题
  wallpaper: string; // 聊天壁纸
  signUpTime: Date; // 注册时间
  lastLoginTime: Date; // 最后一次登录
  conversationsList: Array<ConversationsList>;// 会话列表 * name 会话名称 * photo 会话头像 * id 会话id * type 会话类型 group/ frend
  cover: Array<string>; // 封面展示
  emoji: Array<string>; // 表情包
  status: 0 | 1 | 2; // 0：正常可用，1：冻结不可用，2：注销不可用
  age: string;
  loginSetting: LoginSetting; // 存储用户登录的IP、浏览器、OS等信息
  friendFenzu?: Record<string, Array<string>>;
  friendBeizhu?: Record<string, string>;
  onlineTime: number;
}

export default {}