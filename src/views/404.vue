<template>
  <div class="error">
    404 NOT FOUND
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound',
  setup() {
    console.log(404)
  }
})
</script>

<style lang="scss" scoped>
.error {
  background: #ccc;

}

</style>