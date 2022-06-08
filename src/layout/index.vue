<template>
  <div>
    <div :class="{'layout_body': showNavBar}">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <NavBar :info-status="infoStatus" v-if="showNavBar" />
  </div>
</template>

<script>
import infoApi from '@/api/info/index'
export default {
  components: {
    NavBar: () => import('./components/NavBar')
  },
  computed: {
    showNavBar() {
      return ['index', 'info', 'mine'].includes(this.nowRouteName)
    }
  },
  data() {
    return {
      nowRouteName: 'index',
      infoStatus: false
    }
  },
  watch: {
    '$route'(newVal) {
      this.nowRouteName = newVal.name
      this.handleInfoStatus()
    }
  },
  mounted() {
    const { name } = this.$route
    this.nowRouteName = name
    this.handleInfoStatus()
  },
  methods: {
    async handleInfoStatus() {
      this.infoStatus = false
      // 设置消息是否未读
      const result = await infoApi.getUnreadMessage()
      if (result.code === '200') {
        this.infoStatus = result.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout_body {
  height: calc(100vh - 64px);
  overflow: hidden auto;
}
</style>
