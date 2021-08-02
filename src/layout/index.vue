<template>
  <div>
    <myHeader />
    <transition
    name="fade-transform"
    mode="out-in"
  >
    <keep-alive>
      <router-view :key="key" />
    </keep-alive>
  </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import myHeader from './Header/index.vue'
import myAside from './Aside/index.vue'

export default defineComponent({
  components: {
    myHeader,
    myAside,
  },
  setup() {
    const route = useRoute()
    const cachedViews = () => {
      return ['Home']
    }
    const key = () => {
      return route.path
    }
    return {
      cachedViews,
      key
    }
  }
})
</script>