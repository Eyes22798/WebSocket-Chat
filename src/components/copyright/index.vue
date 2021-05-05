<template>
  <div class="copyright-cmp">
    <p class="copyright-item">Copyright©2020-{{endTime}}</p>
    <p class="copyright-item">作者：Helox</p>
    <p class="copyright-item">联系我：eyes22798@gmail.com</p>
  </div>
</template>

<script>
import { computed } from "vue"

export default {
  setup() {
    const endTime = computed(() => {
      return new Date().getFullYear()
    })

    return {
      endTime,
    }
  }
}
</script>

<style lang="scss">
.copyright-cmp {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  .copyright-item {
    margin: 0 0 5px;
    color: #ffffff;
    font-size: 14px;
  }
}
</style>
