import { createStore, createLogger } from 'vuex'
import { store as user, UserStore } from '@/store/modules/user/index'
import { RootState } from './type'

export interface State {
  count: number
}

export type Store =  UserStore<Pick<RootState, 'user'>>

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []
// Plug in session storage based persistence
// plugins.push(createPersistedState({ storage: window.sessionStorage }))

export const store = createStore({
  plugins,
  modules: {
    user,
  }
})

export function useStore(): Store {
  return store as Store
}