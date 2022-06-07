<template>
  <div>
    <div class="header" v-if="itemList.length > 0">
      <div class="header_content" bindtap="handleClear">
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
  methods: {
    handleCardClick(item) {
      switch (item.title) {
        case '企业安全生产责任制星级评分':
          // let obj = {
          //   id: item.id,
          //   relevanceId: item.relevanceId,
          //   type: item.type
          // }
          break;

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
