<template>
  <div class="login-page" :style="'background-image: url('+ bgUrl +')'">
    <div class="ceshi" style="'marginTop': '30px'">
      <el-alert :closable="false" show-icon title="测试账号密码" description="账号1：cc1218，密码1：123456 | 账号2：lt0623，密码2：123456" type="success" />
    </div>
    <transition name="fade">
      <avatar-choose
        v-if="showChooseAvatar"
        @close="setShowChooseAvatar(false)"
        @choose="chooseAvatar"
      />
    </transition>
    <div class="wrapper hor-ver-center" :style="device === 'Mobile' ? {width: '90%'}:{}">
      <el-form class="login-form" v-if="isLoginState">
        <div class="avatar">
          <el-avatar :size="100" :src="IMG_URL + loginInfo.avatar" @error="()=>true">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          </el-avatar>
        </div>
        <el-form-item>
          <el-input v-model="loginInfo.account" prefix-icon="el-icon-user" @keydown.enter="login" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="loginInfo.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="cv-code">
          <el-input autocomplete="on" class="cv-code-inp" v-model="loginInfo.cvCode" v-on:enter="login" prefix-icon="el-icon-lock" placeholder="验证码(不区分大小写)"></el-input>
          <canvas v-show="!cvCodeing" width="120" height="40" ref="loginCanvas" @click="getCVCode"></canvas>
          <span style="width: 200px" v-show="cvCodeing">获取中...</span>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="login">登录</el-button>
          <span>没有账号？<span class="operation-text" style="display: inline" @click="changeState(false)">注册</span></span>
        </el-form-item>
      </el-form>
      <el-form class="register-form" v-if="!isLoginState">
        <div class="avatar" @click="setShowChooseAvatar(true)">
          <img :src="avatar" alt="" srcset="" width="100" height="100" style="border-radius: 50%">
          <!-- <el-avatar :size="100" :src="avatar">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          </el-avatar> -->
          <span class="secondary-font" style="display: inline-block; margin-bottom: 5px">
            点击头像切换头像
          </span>
        </div>
        <el-form-item>
          <el-input type="text" v-model="registerInfo.account" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
          <!-- <span class="account-errinfo">{{ registerErrInfo.account }}</span> -->
        </el-form-item>
        <el-form-item>
          <el-input type="text" onfocus="this.type = 'password'" v-model="registerInfo.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
          <!-- <span class="password-errinfo">{{ registerErrInfo.password }}</span> -->
        </el-form-item>
        <el-form-item>
          <el-input type="text" onfocus="this.type = 'password'" v-model="registerInfo.rePassword" prefix-icon="el-icon-lock" placeholder="请确认密码"></el-input>
          <!-- <span class="password-errinfo">{{ errInfo.password }}</span> -->
        </el-form-item>
        <el-form-item class="cv-code">
          <el-input class="cv-code-inp" v-model="registerInfo.cvCode" prefix-icon="el-icon-lock" placeholder="验证码(不区分大小写)"></el-input>
          <canvas width="120" height="40" ref="registerCanvas" @click="getCVCode"></canvas>
        </el-form-item>
        <el-form-item class="oper">
          <el-button class="login-btn" type="primary" @click="register">注册</el-button>
          <span>已有账号？<span class="operation-text" style="display: inline" @click="changeState(true)">登录</span></span>
        </el-form-item>
      </el-form>
    </div>
    <copyRight />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  getCurrentInstance,
  ref,
  nextTick,
  Ref,
  onMounted,
} from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import ocean1 from '#/image/ocean1.jpg'
import canvasImg from '#/image/canvas2.jpg'
import { createCanvas } from '@/utils/cvcode'
import { accountReg, passwordReg } from '@/utils/index'
import { UserLoginInfo } from '@/api/modules/user'
import { Response } from '@/api/index'

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
    const router = useRouter()
    const { $message, $confirm, $alert, $http, $socket }: any = getCurrentInstance()?.appContext.config.globalProperties

    const IMG_URL = import.meta.env.VITE_IMG_URL
    const bgUrl = ocean1

    const loginCanvas: Ref<HTMLCanvasElement | null> = ref(null)
    const registerCanvas: Ref<HTMLCanvasElement | null> = ref(null)
    const cvCode = ref('')
    const cvCodeing = ref(true)
    const isLoginState = ref(true)
    const showChooseAvatar = ref(false)

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

    const Browser = () => {
      const explorer = window.navigator.userAgent
      
      if (explorer.indexOf("MSIE") >= 0) {
          return 'ie'
      } else if (explorer.indexOf("Firefox") >= 0) {
          return 'Firefox'
      } else if(explorer.indexOf("Chrome") >= 0){
          return 'Chrome'
      } else if(explorer.indexOf("Opera") >= 0){
          return 'Opera'
      } else if(explorer.indexOf("Safari") >= 0){
          return 'Safari'
      }
    }

    const login = () => {
      if (!accountReg.test(loginInfo.account)) {
        return $message.error('请输入3-6位由数字字母下划线组成的账号')
      }
      if (!passwordReg.test(loginInfo.password)) {
        return $message.error('请输入6-64位由数字字母组成的密码')
      }

      const params: UserLoginInfo = {
        ...loginInfo,
        setting: {
          os: 'Windows NT 10.0',
          browser: Browser(),
          ip: localStorage.getItem('cip'),
          country: localStorage.getItem('cname')
        }
      }


      $http.login(params).then((res: Response) => {
        let { status, data, msg } = res.data
        if (status === 1002) { // 验证码错误重新获取验证码
          loginInfo.cvCode = ''
          getCVCode()
        }
        if (status === 1007) {
          getCVCode()
          return
        }

        if (res.status === 200 && status === 1000) {
          $message.success('登录成功！')
          store.dispatch('ACTION_LOGIN', data)
          const redirect = router.currentRoute.value.query.redirect
          const next = redirect ? redirect : '/chat/home'
          // bug-3 type any
          router.replace(next as any)
        } else {
          $message.error(msg)
          if (status === 1006 || status === 1007) {
            $confirm(`你的${msg}，如需恢复请联系管理员`, `通知：${msg}`, {
              // confirmButtonText: '确定',
              // cancelButtonText: '取消',
              type: 'error'
            })
          }
        }
      })
    }

    const register = () => {
      if (!accountReg.test(registerInfo.account)) {
        return $message.error('请输入3-6位由数字字母下划线组成的账号')
      }
      if (!passwordReg.test(registerInfo.password)) {
        return $message.error('请输入6-64位由数字字母组成的密码')
      }
      if (registerInfo.password !== registerInfo.rePassword) {
        return $message.error('两次输入的密码不一致')
      }
      $http.register(registerInfo).then((res: Response) => {
        let { msg, status, data } = res.data
        if (status !== 1005) {
          $message.error(msg)
          status === 1002 ? getCVCode() : ''
        } else if (status === 1005) {
          $alert(`这是你的chat账号:${data}，你可以以此账号登录系统`, '注册成功')
          isLoginState.value = true
        }
      })
    }

    const getCVCode = () => { // 获取验证码
      cvCodeing.value = true
      $http.getCVCode().then((res: Response) => {
        const { data, status, timestamp } = res.data
        cvCode.value = data
        loginInfo.cvCodeTimestamp = timestamp ?? ''
        nextTick(() => {
          const currCanvas = (isLoginState.value ? loginCanvas.value : registerCanvas.value) as unknown as HTMLCanvasElement
          createCanvas(cvCode.value, currCanvas, canvasImg, () => {
            cvCodeing.value = false
          })
        })
      })
    }

    const changeState = (flag: boolean) => {
      isLoginState.value = flag
      getCVCode()
    }

    const setShowChooseAvatar = (flag: boolean) => {
      showChooseAvatar.value = flag
    }

    const chooseAvatar = (item: string) => {
      registerInfo.avatar = item
    }

    onMounted(() => {
      getCVCode()
      $socket.io.emit('leave')
    })

    return {
      avatar,
      device,
      cvCodeing,
      loginCanvas,
      IMG_URL,
      bgUrl,
      showChooseAvatar,
      cvCode,
      isLoginState,
      loginInfo,
      registerInfo,
      registerCanvas,
      login,
      register,
      getCVCode,
      changeState,
      setShowChooseAvatar,
      chooseAvatar,
      Browser,
    }
  }
})
</script>

<style lang="scss">
.login-page {
  @import "./../../static/css/animation.scss";
  @import "./../../static/css/var.scss";
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all .8s ease;
  .ceshi {
    display: none;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
    width: 60%;
  }
  .wrapper {
    background-color: #fff;
    width: 400px;
    opacity: .9;
    padding: 35px 20px 0;
    border-radius: 5px;
    .login-form, .register-form {
      position: relative;
      .avatar {
        position: absolute;
        z-index: 1001;
        top: -110px;
        text-align: center;
        margin-bottom: 10px;
        .el-avatar {
          box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
        }
      }
    }
    .cv-code {
      .el-form-item__content {
        display: flex;
        justify-content: space-between;
        .cv-code-inp {
          margin-right: 20px;
        }
      }
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
