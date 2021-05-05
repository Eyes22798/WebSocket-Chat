import { MutationTree } from 'vuex'
import { UserState } from './state'
import { UserMutationTypes } from './mutation-types'
import { UserInfo } from '@/api/modules/user'

export type Mutations<S = UserState> = {
  [UserMutationTypes.SET_LOGINTAG](state: S, isLogin: boolean): void
  [UserMutationTypes.SET_USERINFO](state: S, userInfo: UserInfo): void
}

export const mutations: MutationTree<UserState> & Mutations = {
  [UserMutationTypes.SET_LOGINTAG](state: UserState, isLogin: boolean) {
    state.isLogin = isLogin
  },

  [UserMutationTypes.SET_USERINFO](state: UserState, userInfo: UserInfo) {
    state.userInfo = userInfo
  },
}
