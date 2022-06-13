<template>
  <div :class="isNormal ? 'normal_container' : 'elder_container'" @click="$emit('click', item)">
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
    },
    isNormal: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
// 正常版
.normal_container {
  width: 105px;
  height: 124px;
  background: #FAFAFA;
  border-radius: 6px;
  text-align: center;
  padding: 8px;
  box-sizing: border-box;
  .header_icon {
    width: 38px;
    height: 38px;
  }

  .header_text {
    font-weight: 400;
    color: #111F2C;
    font-size: 13px;
  }
}

// 长辈版
.elder_container {
  background: #FAFAFA;
  border-radius: 6px;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  .header_icon {
    width: 54px;
    height: 54px;
  }

  .header_text {
    font-weight: 400;
    color: #111F2C;
    font-size: 20px;
    padding-left: 16px;
  }
}
</style>
