<template>
  <div>
    <div :class="[isNormal ? 'normal_container' : 'elder_container']">
      <span class="custom-title-icon"></span>
      <span class="custom-title-text">{{title}}</span>
    </div>
  </div>
</template>

<script>
import { UiStyle } from '@/mixins/uistyle'
export default {
  name: 'CustomTitle',
  mixins: [UiStyle],
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
// 正常版
.normal_container {
  padding: 15px 0;
  display: flex;
  align-items: center;
  .custom-title-icon {
    display: inline-block;
    width: 3px;
    height: 14px;
    background: #2784FF;
    border-radius: 1px;
  }

  .custom-title-text {
    padding-left: 6px;
    font-weight: 600;
    color: #111F2C;
  }
}

// 长辈版
.elder_container {
  padding: 15px 0;
  display: flex;
  align-items: center;
  .custom-title-icon {
    display: inline-block;
    width: 3px;
    height: 21px;
    background: #2784FF;
    border-radius: 1px;
  }

  .custom-title-text {
    padding-left: 6px;
    font-size: 22px;
    font-weight: 600;
    color: #111F2C;
  }
}
</style>
