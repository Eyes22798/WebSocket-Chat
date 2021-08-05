import { UserState } from './modules/user/state'
import { DeviceState } from './modules/device'

export interface RootState {
  user: UserState;
  device: DeviceState;
}
