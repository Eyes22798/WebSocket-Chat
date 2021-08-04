export const enum ConversationTypes {
  friend = 'FRIEND',
  group = 'GROUP',
}

export const APP_VERSION = '1.0.0'

export const VueAMapKey = '33afa3152ef771f392d42091406689cc'

interface SearchObjectMap {
  id: number;
  label: string;
  value: string;
}

export const searchObjectMap: Array<SearchObjectMap> = [
  {id: 1, label: '人', value: 'friend'},
  {id: 2, label: '群', value: 'group'}
]

interface SearchTypes {
  friend: Array<SearchObjectMap>;
  group: Array<SearchObjectMap>;
}

export const searchTypes: SearchTypes = {
  friend: [
    {id: 1, label: 'Chat账号', value: 'code'},
    {id: 2, label: '用户账号', value: 'name'},
    {id: 3, label: '昵称', value: 'nickname'}
  ],
  group: [
    {id: 1, label: 'Chat账号', value: 'code'},
    {id: 2, label: '名称', value: 'title'}
  ]
}

export enum ValidateNewsTips {
  applyFriend = '请求添加你为好友',
  applyGroup = '请求加入群聊'
}

export const qiniu_URL = 'http://blog.static.chenr.cn/'

// 七牛云上传图片时的状态
export enum UploadImgStatusMap {
  error = 'error',
  next = 'next',
  complete = 'complete'
}

interface CoArtBoardHandleOption {
  name: string;
  type: string;
}

// 在CoArtBoard组件中对调色板的操作
export const coArtBoardHandleOption: Array<CoArtBoardHandleOption> = [
  { name: "圆", type: "arc" },
  { name: "线条", type: "line" },
  { name: "矩形", type: "rect" },
  { name: "多边形", type: "polygon" },
  { name: "橡皮擦", type: "eraser" },
  { name: "撤回", type: "cancel" },
  { name: "前进", type: "go" },
  { name: "清屏", type: "clear" },
  { name: "线宽", type: "lineWidth" },
  { name: "颜色", type: "color" }
]

export enum CoArtBoardReplyTypes {
  agree = 'agree',
  disagree = 'disagree',
  busy = 'busy'
}

export const weatherMap: Record<string, string> = {
  "阴": 'icon-tianqi',
  "多云": 'icon-tianqi1',
  "晴": 'icon-ziyuan',
  "小雨下雨": 'icon-n1'
}

export const weekNumZHMap: Record<string, string> = {
  "0": '星期天',
  "1": '星期一',
  "2": '星期二',
  "3": '星期三',
  "4": '星期四',
  "5": '星期五',
  "6": '星期六',
}

export const commentTips = "黑猫警长提示您文明发言"

interface UserID {
  photo: string;
  signature: string;
  nickname: string;
  _id: string;
}

interface DefaultPyqItem {
  pictures: Array<string>;
  readCount: number;
  _id: string;
  userId: UserID;
  createDate: Date;
  content: string;
  __v: number;
}

export const defaultPyqItem: DefaultPyqItem = {
  pictures: [
    'http://blog.static.chenr.cn/cc-messger-1702f38162c-92.jpeg'
  ],
  readCount: 0,
  _id: "5e3ea3518160c54408d9ba13",
  userId: {
    photo: "/uploads/2019-11-10/f-1573390856438-f1573390856092.png",
    signature: "signature",
    nickname: "nickname",
    _id: "5d9d903f49db3825a8e76a03"
  },
  createDate: new Date(),
  content: "content",
  __v: 0,
}

export enum WEB_RTC_MSG_TYPE {
  artBoard = 'artBoard',
  video =  'video',
  audio =  'audio'
}

export enum SYS_TYPES {
  sys = 'sys',
  text = 'text',
  img = 'img',
  file = 'file'
}

export const MSG_TYPES = { ...WEB_RTC_MSG_TYPE, ...SYS_TYPES }
