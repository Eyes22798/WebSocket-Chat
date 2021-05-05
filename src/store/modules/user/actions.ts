import { ActionTree, ActionContext } from 'vuex'
import { useStore } from '@/store'
import { RootState } from '@/store/type'
import { state, UserState } from './state'
import { Mutations } from './mutations'
import { UserMutationTypes } from './mutation-types'
import { UserActionTypes } from './action-types'
import { UserInfo } from '@/api/modules/user'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

export interface Actions {
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userInfo: UserInfo
  ): void
  [UserActionTypes.ACTION_LOGIN_OUT](
    { commit }: AugmentedActionContext
  ): void
}

export const actions: ActionTree<UserState, RootState> & Actions = {
  async [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userInfo: UserInfo
  ) {
    state.isLogin = true,
    state.userInfo = userInfo
    let dataString = JSON.stringify(userInfo)
    window.localStorage.setItem('userInfo', dataString)
    window.sessionStorage.setItem('isLogin', String(true))
  },

  [UserActionTypes.ACTION_LOGIN_OUT](
    { commit }: AugmentedActionContext
  ) {
    console.log(commit)
    state.isLogin = false,
    state.userInfo = ''
    window.localStorage.setItem('userInfo', '')
    window.sessionStorage.setItem('isLogin', String(false))
  }
}