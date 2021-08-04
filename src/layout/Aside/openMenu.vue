<template>
  <div class="oper-menu">
    <el-dropdown placement="left">
      <span class="el-dropdown-link">
        <el-badge is-dot :value="validateUnReadCount" :hidden="!validateUnReadCount">
          <i class="oper-item el-icon-s-operation"></i>
        </el-badge>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <router-link to="/chat/setting" class="aside-menu-link">
              <el-button type="text">个人设置</el-button>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-badge
              :value="validateUnReadCount"
              :hidden="!validateUnReadCount"
            >
              <router-link to="/chat/system" class="aside-menu-link">
                <el-button type="text">系统消息</el-button>
              </router-link>
            </el-badge>
          </el-dropdown-item>
          <el-dropdown-item>
            <!-- <el-button type="text" @click="setShowTheme(true)">主题设置</el-button> -->
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/chat/setting" class="aside-menu-link">
              <!-- <el-button type="text">反馈</el-button> -->
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text" @click="logout">退出登录</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { removeCookie } from '@/utils/token'

export default defineComponent({
  setup(props, context) {
    const store = useStore()
    const router = useRouter()
    const { $socket }: any = getCurrentInstance()?.appContext.config.globalProperties
    

    const userInfo = computed(() => store.state.user.userInfo)
    const unreadNews = computed(() => store.state.new.unreadNews)
    const sysUsers = computed(() => store.state.app.sysUsers)

    // const validateUnReadCount = computed(() => {
    //   const validateSysUser = (sysUsers || []).find(item => item.code === '111111')
    //   const key = (validateSysUser || {})._id + '-' + (userInfo || {})._id
    //   return unreadNews[key]
    // })

    const logout = () => {
      router.replace('/login')
      $socket.emit('leave')
      store.dispatch('ACTION_LOGIN_OUT')
      removeCookie()
    }

    const setShowTheme = (flag: any) => {
      context.emit('setShowTheme', flag)
    }

    return {
      userInfo,
      unreadNews,
      sysUsers,
      logout,
      setShowTheme
    }
  }
})
</script>

<style lang="scss">
.oper-menu {
  .menu-item {
    display: block;
  }
}
</style>

