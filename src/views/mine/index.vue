<template>
  <div class="mine_container">
    <img class="mine_bg" src="@/assets/img/mine/bg.png" />
    <div class="mine_header">
      <img class="mine_avator" :src="userInfo.avatarUrl" />
      <div class="mine_title">
        <span class="mine_title_text">{{tokenInfo.unitName || '企业名称内容信息'}}</span>
        <div>
          <img v-for="(item, index) of 3" :key="index" class="mine_star_icon" src="@/assets/img/mine/star_icon.png" />
        </div>
      </div>
    </div>
    <div class="mine_body">
      <div class="mine_body_item" v-for="item of itemList" :key="item.key" :data-item="item" @click="handleClickItem(item)">
        <div class="mine_body_item_left">
          <img v-if="item.key === 1" class="mine_body_item_icon" src="@/assets/img/mine/un_corrective_icon.png" />
          <img v-if="item.key === 2" class="mine_body_item_icon" src="@/assets/img/mine/corrective_icon.png" />
          <img v-if="item.key === 3" class="mine_body_item_icon" src="@/assets/img/mine/close_icon.png" />
          <span class="mine_body_item_text">{{item.title}}</span>
        </div>
        <img class="mine_body_item_guide" src="@/assets/img/mine/left_icon.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        avatarUrl: 'https://wx.qlogo.cn/mmhead/Q3auHgzwzM5myL3YOUEjjcck6Bay9T1fia2GFxz9AcwcdlnavwcMnmw/0'
      },
      itemList: [
        {
          key: 1,
          title: '我的问题-待整改'
        },
        {
          key: 2,
          title: '我的问题-已整改'
        },
        {
          key: 3,
          title: '退出账号'
        }
      ],
      tokenInfo: {

      }
    }
  },
  methods: {
    handleClickItem(item) {
      const { key } = item
      switch (key) {
        case 1:
        case 2:
          this.$router.push({ path: '/afterrectification', query: { key }})
          break;

        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mine_container {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mine_bg {
  width: 100%;
  height: 144px;
  position: absolute;
  z-index: 1;
}

/* 头部内容 */
.mine_header {
  top: 24px;
  left: 10px;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
}

/* 头像 */
.mine_avator {
  width: 54px;
  height: 54px;
  box-shadow: 0px 8px 12px -4px rgba(33, 41, 69, 0.11);
  border-radius: 50%;
  /* opacity: 0.6; */
  border: 2px solid #F6F7FB;
}

.mine_title {
  display: flex;
  flex-direction: column;
  margin-left: 12px;
}

.mine_title_text {
  font-size: 18px;
  font-weight: 500;
  color: #FFFFFF;
}

.mine_star_icon {
  margin-top: 8px;
  width: 16px;
  height: 16px;
  margin-right: 6px;
}

/* 卡片容器 */
.mine_body {
  position: absolute;
  top: 100px;
  z-index: 3;
  height: 180px;
  width: 92%;
  margin: 0 16px;
  box-sizing: border-box;
  background: #FFFFFF;
  box-shadow: 0px 2px 14px -2px rgba(77, 125, 249, 0.1);
  border-radius: 6px;
}

.mine_body_item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 28px 16px;
}

.mine_body_item_left {
  display: flex;
  align-items: center;
}

.mine_body_item_icon {
  width: 20px;
  height: 20px;
}

.mine_body_item_text {
  padding-left: 12px;
  font-weight: 400;
  color: #212945;
}

.mine_body_item_guide {
  width: 14px;
  height: 14px;
}
</style>
