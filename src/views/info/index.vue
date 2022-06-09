<template>
  <div>
    <div class="header" v-if="itemList.length > 0">
      <div class="header_content" @click="handleClear">
        <span>一键清除</span>
        <img class="clear_icon" src="@/assets/img/info/info_clear.png" />
      </div>
    </div>
    <CustomInfo v-for="(item, index) of itemList" :key="index" :item-info="item" @cardClick="handleCardClick" />
    <van-empty v-if="!itemList || itemList.length === 0" description="暂无数据" />
  </div>
</template>

<script>
import Api from '@/api/info/index'
export default {
  components: {
    CustomInfo: () => import('./components/CustomInfo')
  },
  data() {
    return {
      itemList: []
    }
  },
  mounted() {
    this.fetchData()
  },
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = false
    next()
  },
  methods: {
    handleCardClick(item) {
      // 0企业安全生产责任制检查项目表, 1工矿企业检查项目表, 2劳动密集型企业检查项目表, 3企业安全生产责任制, 4行政村、社区安全生产责任制, 5学校安全生产责任制, 6医疗机构安全生产责任制, 7生态环境“星级”评定, 8问题整改
      const safetyRatingList = ['企业安全生产责任制星级评分', '行政村、社区安全生产责任制星级评分', '学校安全生产责任制星级评分', '医疗机构安全生产责任制星级评分']
      switch (item.type) {
        case 0:
        case 1:
        case 2: {
          let obj = {
            id: item.id,
            relevanceId: item.relevanceId,
            type: item.type,
            correctionKey: item.type + 1
          }
          this.$router.push({ path: '/list/correction', query: { ...obj }})
          break;
        }
        case 3:
        case 4:
        case 5:
        case 6: {
          let obj = {
            starKey: 'SAFETYRATING',
            item: JSON.stringify({
              id: item.id,
              relevanceId: item.relevanceId,
              type: item.type,
              safetyType: safetyRatingList.findIndex(_ => _ === item.title),
              startLevelState: item.startLevelState
            })
          }
          this.$router.push({ path: '/list/score', query: { ...obj }})
          break;
        }
        case 7: {
          let obj = {
            starKey: 'ECOLOGY',
            item: JSON.stringify({
              id: item.id,
              relevanceId: item.relevanceId,
              type: item.type,
              safetyType: null,
              startLevelState: item.startLevelState
            })
          }
          this.$router.push({ path: '/list/score', query: { ...obj }})
          break;
        }
        case 8: {
          let obj = {
            id: item.id,
            relevanceId: item.relevanceId,
            type: item.type,
            state: 0,
            key: 1
          }
          this.$router.push({ path: '/rectification', query: { ...obj }})
          break;
        }
        default:
          break;
      }
      console.log(item, '?');
    },
    // 一键清除
    async handleClear() {
      const data = this.itemList.map(_ => {
        return _.id
      })
      const result = await Api.putDetail(data)
      if (result.code === '200') {
        this.fetchData()
      }
    },
    async fetchData() {
      const params = {
        remind: ''
      }
      const result = await Api.getData(params)
      if (result.code === '200') {
        this.itemList = result.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  text-align: right;
  padding: 28px 18px 0 18px;
  display: flex;
  flex-direction: row-reverse;
}

.header_content {
  display: flex;
  align-items: center;
}

.clear_icon {
  margin-left: 4px;
  width: 20px;
  height: 20px;
}
</style>
