<template>
  <div class="avatar-choose-cmp all0">
    <div class="avatar-list hor-ver-center" :style="device === 'Mobile' ? {width: '90%'} : {}">
      <i class="el-icon-close p-r-t" @click="close"></i>
      <span class="p-l-t">选择头像</span>
      <div
        class="avatar-item box-shadow1"
        v-for="(item, index) in avatarList"
        :key="index"
        @click="choose('face/'+item)"
      >
        <img width="80" height="80" :src="IMG_URL + 'face/' + item" alt="" srcset="">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'AvatarChoose',
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.avatar-choose-cmp {
  position: fixed;
  z-index: 1004;
  background-color: rgba(0, 0, 0, .2);
  .avatar-list {
    width: 504px;
    height: 350px;
    padding: 40px 20px 20px;
    background-color: #ffffff;
    overflow-x: hidden;
    border-radius: 5px;
    .avatar-item {
      box-sizing: border-box;
      display: inline-block;
      margin: 5px;
      border: 1px solid #DCDFE6;
      cursor: pointer;
    }
  }
}
</style>