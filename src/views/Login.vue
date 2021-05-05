<template>
  <div class="login">
    我是登录页
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore()
    console.log(store.state.user.isLogin)
  }
})
</script>

<style lang="scss" scoped>
.login {
  background: #808080;

}

</style>