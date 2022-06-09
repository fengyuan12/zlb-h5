<template>
  <div class="info-container" @click="$emit('cardClick', itemInfo)">
    <div class="info-content">
      <div class="info_header">
        <div class="info_header_left">
          <div class="info_header_left_imgbox">
            <img class="info_header_left_icon" src="@/assets/img/info/info_icon.png" />
            <div v-if="!itemInfo.state" class="info_header_left_unread"></div>
          </div>
          <span class="info_header_left_text">{{itemInfo.title}}</span>
        </div>
        <span class="info_header_right_text">{{itemInfo.created}}</span>
      </div>
      <div class="info_body">
        <span>{{itemInfo.content}}</span>
      </div>
      <div class="info_divider"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomInfo',
  props: {
    itemInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-container {
  width: 100%;
  height: 100%;
  padding: 0 16px;
  margin: 10px 0;
  box-sizing: border-box;
}

.info-content {
  width: 100%;
  box-sizing: border-box;
}

.info_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info_header_left {
  display: flex;
  align-items: center;
}

.info_header_left_imgbox {
  position: relative;
}

.info_header_left_icon {
  width: 30px;
  height: 30px;
}

.info_header_left_unread {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #FF6935;
  position: absolute;
  top: 2px;
  right: 0;
}

.info_header_left_text {
  padding-left: 8px;
  font-weight: 500;
  color: #111F2C;
  flex: 1;
}

.info_header_right_text {
  font-size: 12px;
  font-weight: 400;
  color: #999999;
  width: 134px;
  text-align: right;
}

/* 内容 */
.info_body {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
}

.info_divider {
  height: 1px;
  background: #E8E9EC;
  margin: 12px 0;
}
</style>
