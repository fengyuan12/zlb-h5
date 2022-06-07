<template>
  <div class="container" @click="$emit('click', item)">
    <div>
      <img :src="item.src" class="header_icon">
    </div>
    <span class="header_text">{{item.title}}</span>
  </div>
</template>

<script>
export default {
  name: 'BusinessTable',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 105px;
  height: 124px;
  background: #FAFAFA;
  border-radius: 6px;
  text-align: center;
  padding: 8px;
  box-sizing: border-box;
}

.header_icon {
  width: 38px;
  height: 38px;
}

.header_text {
  font-weight: 400;
  color: #111F2C;
  font-size: 13px;
}
</style>
