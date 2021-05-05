<template>
  <div class="login">
    我是登录页
    <copyRight />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
  getCurrentInstance,
} from 'vue'
import { useStore } from 'vuex'
import ocean1 from '#/image/ocean1.jpg'
import canvasImg from '#/image/canvas2.jpg'
import { createCanvas } from '@/utils/cvcode'
import { accountReg, passwordReg } from '@/utils/index'

import copyRight from '@/components/copyright/index.vue'
import avatarChoose from '@/components/avatarChoose/index.vue'

const faceRandom = Math.ceil(Math.random()*10)

interface Info {
  account: string;
  password: string;
  cvCode: string;
  avatar: string;
}

interface LoginInfo extends Info {
  cvCodeTimestamp: string;
} 

interface RegisterInfo extends Info {
  rePassword: string;
} 

export default defineComponent({
  name: 'Login',
  components: {
    copyRight,
    avatarChoose,
  },
  setup() {
    const store = useStore()
    const $message = getCurrentInstance()?.appContext.config.globalProperties.$message
    const IMG_URL = import.meta.env.VITE_IMG_URL

    const loginInfo: LoginInfo = reactive({
      account: '',
      password:'',
      cvCode: '',
      cvCodeTimestamp: '',
      avatar: JSON.parse(window.localStorage.getItem('userInfo') || '{}').photo || ''
    })

    const registerInfo: RegisterInfo = reactive({
      account: '',
      password: '',
      rePassword: '',
      cvCode: '',
      avatar: `face/face${faceRandom}.jpg`
    })

    const avatar = computed(() => IMG_URL + registerInfo.avatar)
    const device = computed(() => store.state.device.deviceType)

      console.log()

    const login = () => {
      if (!accountReg.test(loginInfo.account)) {
        return $message.error('请输入3-6位由数字字母下划线组成的账号')
      }
      if (!passwordReg.test(loginInfo.password)) {
        return $message.error('请输入6-64位由数字字母组成的密码')
      }

      // const returnCitySN = window.returnCitySN ? window.returnCitySN : {}
      // const params = {
      //   ...loginInfo,
      //   setting: {
      //     os: window.OSInfo,
      //     browser: window.Browser,
      //     ip: returnCitySN["cip"],
      //     country: returnCitySN["cname"]
      //   }
      // }
    }

    return {
      avatar,
      device,
      
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  background: #808080;

}

</style>