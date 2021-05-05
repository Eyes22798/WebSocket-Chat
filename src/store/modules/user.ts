import { ActionTree, Module } from 'vuex'
import { RootState } from '../type'
import { UserInfo } from '@/api/modules/user'

export interface UserState {
  isLogin: boolean;
  userInfo: UserInfo | string;
}

const state: UserState = {
  isLogin: JSON.parse(window.sessionStorage.getItem('isLogin') || "false") as boolean,
  userInfo: JSON.parse(window.localStorage.getItem('userInfo') || '{}')
}

const mutations = {
  login(state: UserState, data: UserInfo) {
    state.isLogin = true,
    state.userInfo = data
    let dataString = JSON.stringify(data)
    window.localStorage.setItem('userInfo', dataString)
    window.sessionStorage.setItem('isLogin', String(true))
  },
  logout(state: UserState) {
    state.isLogin = false,
    state.userInfo = ''
    window.localStorage.setItem('userInfo', '')
    window.sessionStorage.setItem('isLogin', String(false))
  }
}

const actions: ActionTree<UserState, RootState> = {
  LOGIN({commit}, data) {
    commit('login', data)
  },
  LOGOUT({commit}, data) {
    commit('logout', data)
  }
}

const user: Module<UserState, RootState> = {
  state,
  mutations,
  actions
}

export default user