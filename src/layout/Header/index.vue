<template>
  <div class="layout-header__com">
    <el-header>
      <div class="logo">
        <router-link to="/" class="logo-link">
          Co-Messager
          <span class="logo-img"></span>
        </router-link>
      </div>
      <div class="operation">
        <span class="item">
          <router-link to="/add" tag="span">
            加好友 <i class="el-icon-plus"></i>
          </router-link>
        </span>
        <span class="item">
          <router-link to="/mzone" tag="span">
            发动态 <i class="el-icon-plus"></i>
          </router-link>
        </span>
      </div>
      <div class="user-info">
        <el-dropdown class="droplist">
          <span class="el-dropdown-link">
            <el-badge :is-dot="validateUnReadCount > 0" class="badge-item">
              <el-avatar size="large"
                class="avatar"
                :src="IMG_URL + userInfo.photo"
                @error="() => true"
              >
                <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" srcset="">
              </el-avatar>
            </el-badge>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="user-menu-item">
                <router-link to="/setting" class="link">
                  个人设置
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="user-menu-item">
                <el-badge
                  :value="validateUnReadCount"
                  :hidden="validateUnReadCount === 0"
                >
                  <router-link to="/system" class="link">
                    系统消息
                  </router-link>
                </el-badge>
              </el-dropdown-item>
              <el-dropdown-item class="user-menu-item">
                <router-link to="/setting" class="link">
                  主题设置
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="user-menu-item">
                <router-link to="/setting" class="link">
                  反馈
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="user-menu-item">
                <a class="link" @click="logout">
                  退出
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
          
        </el-dropdown>
        <div class="name-sigin">
          <span class="name">{{userInfo.nickname}}</span>
          <span class="sigin">{{userInfo.signature}}</span>
        </div>
      </div>
    </el-header>
    <transition name="fade">
      <vue-draggable-resizable
        v-if="isToCoArtBoard"
        drag-cancel=".drawingarea"
      >
        <div class="co-art-board">
          <co-art-board :currentconversation="currentConversation" :state="webRTCState" :web-rtc-type="WEB_RTC_MSG_TYPE.artBoard" />
        </div>
      </vue-draggable-resizable>
    </transition>
    <transition name="fade">
      <vue-draggable-resizable
        v-if="isVideoing || isAudioing"
        :x="0"
        :y="500"
        drag-cancel=".drawingarea"
      >
        <div class="co-art-board box-shadow1">
          <co-video
            :currentconversation="currentConversation"
            :state="webRTCState"
            :web-rtc-type="coVideoWebRtcType"
          />
        </div>
      </vue-draggable-resizable>
    </transition>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { CoArtBoardReplyTypes, WEB_RTC_MSG_TYPE } from '@/const'
import { removeCookie } from '@/utils/token'

enum WEB_RTC_MSG_TYPE_TEXT {
  artBoard = '白板协作',
  video = '视频通话',
  audio = '语音通话'
}

let timer: number

export default defineComponent({
  setup() {
    const router = useRouter()
    const { $socket }: any = getCurrentInstance()?.appContext.config.globalProperties

    const webRTCState = ref('apply') // 用于定义进入webRTC通信组件时的状态，如果时apply就发起请求，如果是reply就回复
    const IMG_URL = import.meta.env.VITE_IMG_URL

    const logout = () => {
      router.replace('/login')
      $socket.emit('leave')
      removeCookie()
    }

  },
})
</script>
