import { UserState } from './modules/user'
import { DeviceState } from './modules/device'

export interface RootState {
  user: UserState;
  device: DeviceState;
}
