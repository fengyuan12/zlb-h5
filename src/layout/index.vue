<template>
  <div>
    <div :class="{'layout_body': showNavBar}">
      <router-view></router-view>
    </div>
    <NavBar v-if="showNavBar" />
  </div>
</template>

<script>
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
      nowRouteName: 'index'
    }
  },
  watch: {
    '$route'(newVal) {
      this.nowRouteName = newVal.name
    }
  },
  mounted() {
    const { name } = this.$route
    this.nowRouteName = name
  }
}
</script>

<style lang="scss" scoped>
.layout_body {
  height: calc(100vh - 64px);
  overflow: hidden auto;
}
</style>
