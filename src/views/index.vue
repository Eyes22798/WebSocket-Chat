<template>
  <div class="index-page">
    index
  </div>
</template>

<script>

</script>

<style lang="scss">
@import './../../static/css/animation.scss';
.index-page {
  display: flex;
  width: 100%;
  // height: calc(100vh - 60px);
  height: 100%;
  .conversation-list {
    width: 30%;
    border-right: 1px solid #cccccc;
    background-color: var(--primary-bgcolor-4);
    &.mobile {
      position: absolute;
      width: 100%;
    }
  }
  .conversation-chat-area {
    position: relative;
    width: 70%;
    &.mobile {
      // position: absolute;
      width: 100%;
    }
    .no-conversation {
      text-align: center;
    }
  }
}
</style>
