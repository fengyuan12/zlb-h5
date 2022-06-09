<template>
  <div>
    <div class="header">
      <div class="header_content">
        <img class="header_content_icon" src="@/assets/img/question/search.png" />
        <input class="header_content_input" placeholder="搜索" v-model="searchVal" @input="handleInputSearch" />
      </div>
    </div>
    <div class="container">
      <div v-if="type === 'CORRECTION' && listData.length > 0">
        <div class="card" v-for="item of listData" :key="item.id" @click="handleCardClick(item)">
          <div class="card_title">
            <div>
              <div>{{item.checkDate || ''}}</div>
            </div>
            <img v-if="item.checkState === 0" class="card_title_icon" src="@/assets/img/list/pending.png" />
            <img v-else class="card_title_icon" src="@/assets/img/list/done.png" />
          </div>
          <div class="card_item">
            <img class="card_item_icon" src="@/assets/img/question/time.png" />
            <span class="card_item_title">检查月份</span>
            <span class="card_item_content">{{item.checkMonth || ''}}</span>
          </div>
          <div class="card_item">
            <img class="card_item_icon" src="@/assets/img/list/user.png" />
            <span class="card_item_title">检查人&emsp;</span>
            <span class="card_item_content">{{item.checkPeople || ''}}</span>
          </div>
          <div class="divider"></div>
        </div>
      </div>
      <div v-else-if="type === 'STAR' && listData.length > 0">
        <div class="card" v-for="item of listData" :key="item.id" @click="handleCardClick(item)">
          <div class="card_title">
            <div>
              <span>{{item.year}}年</span>
            </div>
            <div v-if="starKey === 'SAFETYRATING'">
              <span v-if="item.type === 0">企业安全生产</span>
              <span v-if="item.type === 1">行政村、社区安全生产</span>
              <span v-if="item.type === 2">学校安全生产</span>
              <span v-if="item.type === 3">医疗机构安全生产</span>
            </div>
            <span v-if="item.state === 0">未自评</span>
            <span v-if="item.state === 1">待考评</span>
            <span v-if="item.state === 2">已考评</span>
            <span v-if="item.state === 3">已公布</span>
          </div>
          <div class="card_item">
            <img class="card_item_icon" src="@/assets/img/list/date.png" />
            <span class="card_item_title">批次</span>
            <span class="card_item_content">{{item.batch ? '下半年' : '上半年'}}</span>
          </div>
          <div class="card_item">
            <img class="card_item_icon" src="@/assets/img/question/unit.png" />
            <span class="card_item_title">单位</span>
            <span class="card_item_content">{{item.unitName || ''}}</span>
          </div>
          <div class="divider"></div>
        </div>
      </div>
      <div v-else>
        <van-empty description="暂无数据" />
      </div>
    </div>
  </div>
</template>

<script>
import environmentApi from '@/api/star/environment' // 生态环境“星级”评定
import safetyratingApi from '@/api/star/safetyrating' // 安全生产“星级”评分
import safetyApi from '@/api/correction/safety' // 企业安全生产责任制
import miningApi from '@/api/correction/mining' // 工矿企业
import labourApi from '@/api/correction/labour' // 劳动密集型企业
export default {
  data() {
    return {
      type: 'CORRECTION', // CORRECTION: 企业自查自纠； STAR: 星级评定
      correctionKey: null, // 1: 企业安全生产责任制检查项目表；2：工矿企业检查项目表；3：劳动密集型企业检查项目表
      starKey: null, // ECOLOGY: 生态环境“星级”评定 SAFETYRATING：安全生产“星级”评定
      listData: [],
      searchVal: ''
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    this.init()
  },
  beforeRouteLeave(to, from, next) {
    from.meta.keepAlive = true
    next()
  },
  methods: {
    init() {
      const { type, starKey, correctionKey } = this.$route.query
      this.type = type
      this.starKey = starKey
      this.correctionKey = +correctionKey
      switch (type) {
        case 'CORRECTION':
          this.handleSetCorrApi() // 设置三张表的Api
          break;
        case 'STAR':
        case 'SAFETYRATING':
          this.handleSetStarApi() // 设置星级评定的Api
          break
        default:
          break;
      }
      this.getData()
    },
    handleInputSearch() {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getData(this.searchVal)
      }, 300)
    },
    async getData(keyword) {
      const { Api } = this
      const params = {
        keyword: keyword || ''
      }
      const result = await Api.getData(params)
      if (result.code === '200') {
        this.listData = result.data
      } else {
        this.listData = []
      }
    },
    // set 星级评定 API
    handleSetStarApi() {
      const { starKey } = this
      switch (starKey) {
        case 'ECOLOGY':
          this.Api = environmentApi
          break;
        case 'SAFETYRATING':
          this.Api = safetyratingApi
          break;
        default:
          break;
      }
    },
    // set 企业自查自纠三张表 API
    handleSetCorrApi() {
      let Api = ''
      switch (this.correctionKey) {
        case 1:
          Api = safetyApi
          break;
        case 2:
          Api = miningApi
          break;
        case 3:
          Api = labourApi
          break;
        default:
          break;
      }
      this.Api = Api
    },
    // 点击卡片跳转
    handleCardClick(item) {
      const { type, correctionKey, starKey } = this
      if (type === 'CORRECTION') {
        const obj = {
          correctionKey,
          id: item.id
        }
        this.$router.push({ path: '/list/correction', query: { ...obj }})
      }
      if (type === 'STAR') {
        const obj = {
          starKey,
          item: JSON.stringify({
            id: item.id,
            safetyType: item.type,
            state: item.state
          })
        }
        this.$router.push({ path: '/list/score', query: { ...obj }})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 8px 16px;
}

.header_content {
  background: #F6F7FB;
  border-radius: 20px;
  border: 1px solid #F2F3F5;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.header_content_icon {
  width: 16px;
  height: 16px;
}

.header_content_input {
  padding: 0 8px;
  border: none;
  background-color: inherit;
  outline: none;
  flex: 1;
}

.container {
  min-height: calc(100vh - 62px);
  // background: #F6F7FB;
  box-sizing: border-box;
  padding: 16px;
}

.card {
  background: #FFFFFF;
  border-radius: 6px;
  // padding: 12px;
  margin-bottom: 8px;
}

.card_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.card_title_icon {
  width: 56px;
  height: 22px;
}

.divider {
  width: 100%;
  height: 1px;
  background: #F6F7FB;
  margin: 12px 0;
}

.card_item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.card_item_icon {
  width: 12px;
  height: 12px;
}

.card_item_title {
  padding: 0 20px 0 4px;
  color: #666666;
}

.card_item_content{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
}
</style>
