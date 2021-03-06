/**
 * 设备信息查询
 */
import { getDeviceType, findParentNode } from '@/utils'
import { RootState } from '@/store/type'
import { ActionContext } from 'vuex'
const deviceMap = {
  Desktop: 'Desktop',
  Mobile: 'Mobile'
}
 
const _registerEvent = () => {
  document.addEventListener('click', (e) => {
  // conversation-list
  const conversationList = findParentNode(e.target as HTMLElement, 'conversation-list')
  // conversationitem__cmp active
  const conversationItem = findParentNode(e.target as HTMLElement, 'conversationitem__cmp')
  /**同时会话进入聊天区域 */
  if (conversationItem && conversationList) {
    state.currentUI = UIMap.chatArea
  }
  })
}

const _initCSS = () => {
  const style = document.createElement('style')
  style.setAttribute('device', 'mobile')
  style.innerText = `.el-message-box {width: auto} !important;`
  const head = document.querySelector('head') as HTMLElement
  head.appendChild(style)
}

/**
* 针对移动端设备下，【会话列表】和【聊天区域】等...不可以同时出现的情况
*/
const UIMap = {
  conversation: 'conversation',
  chatArea: 'chatArea'
}

export interface DeviceState {
  deviceType: string;
  currentUI: string;
}

const state: DeviceState = {
  deviceType: deviceMap[getDeviceType()],
  currentUI: UIMap.conversation
}

if(state.deviceType === deviceMap.Mobile) {
  _registerEvent()
  _initCSS()
}

const mutations = {
  setCurrentUI(state: DeviceState, data: string) {
    state.currentUI = data
  }
}

const actions = {
  SET_CURRENT_UI(context:ActionContext<DeviceState, RootState>, data: string) {
    context.commit('setCurrentUI', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
