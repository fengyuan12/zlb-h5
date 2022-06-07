<template>
  <div class="footer_navbar">
    <ul flex="main:around">
      <li flex="dir:top" v-for="item of list" :key="item.key" @click="handleUpdateKey(item)">
        <img :src="item.key === nowKey ? item.iconFocus : item.icon">
        <span :class="{'focus_text': item.key === nowKey}">{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
const IndexIcon = require('@/assets/img/navbar/index.png')
const IndexIconFocus = require('@/assets/img/navbar/index_focus.png')
const InfoIcon = require('@/assets/img/navbar/info.png')
const InfoIconFocus = require('@/assets/img/navbar/info_focus.png')
const myIcon = require('@/assets/img/navbar/mine.png')
const myIconFocus = require('@/assets/img/navbar/mine_focus.png')
export default {
  data() {
    return {
      list: [
        {
          key: 'index',
          title: '首页',
          icon: IndexIcon,
          iconFocus: IndexIconFocus
        },
        {
          key: 'info',
          title: '消息',
          icon: InfoIcon,
          iconFocus: InfoIconFocus
        },
        {
          key: 'mine',
          title: '我的',
          icon: myIcon,
          iconFocus: myIconFocus
        }
      ],
      nowKey: 'index'
    }
  },
  watch: {
    '$route'(newVal) {
      const { name } = newVal
      const isExit = this.list.some(_ => _.key === name)
      if (isExit) {
        this.nowKey = name
      }
    }
  },
  methods: {
    handleUpdateKey(item) {
      const { key } = item
      this.nowKey = key
      this.$router.replace({ name: key })
    }
  }
}
</script>

<style lang="scss" scoped>
.footer_navbar {
  z-index: 999;
  position: fixed;
  bottom: 0;
  width: 100vw;
  text-align: center;
  background: #FFFFFF;
  box-shadow: 0px 6px 12px 8px rgba(89, 96, 116, 0.08);
  padding: 4px;
  box-sizing: border-box;
  img {
    width: 36px;
    height: 36px;
  }
}

.focus_text {
  color: #2784FF;
}
</style>

