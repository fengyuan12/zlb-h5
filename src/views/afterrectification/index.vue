<template>
  <div :class="isNormal ? 'normal_container' : 'elder_container'">
    <div class="header">
      <div class="header_content">
        <img class="header_content_icon" src="@/assets/img/question/search.png" />
        <input class="header_content_input" placeholder="搜索" v-model="keywords" @input="handleInputSearch" />
      </div>
    </div>
    <div class="body">
      <Form :is-normal="isNormal" v-for="(item, index) of listData" :key="index" :item-info="item" @handleCardClick="handleCardClick" />
      <van-empty v-if="!listData || listData.length === 0" description="暂无数据" />
    </div>
  </div>
</template>

<script>
import Api from '@/api/question/index'
import { UiStyle } from '@/mixins/uistyle'
import { getToken } from '@/utils/token'
export default {
  mixins: [UiStyle],
  components: {
    Form: () => import('./components/Form')
  },
  data() {
    return {
      listData: [],
      keywords: '',
      key: null, // 1：待整改，2：已整改
      timer: null
    }
  },
  mounted() {
    this.key = +this.$route.query.key
    this.fetchData()
  },
  methods: {
    handleCardClick(item) {
      this.$router.push({ path: '/rectification', query: { id: item.id, state: item.state, key: this.key }})
    },
    handleInputSearch() {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.fetchData()
      }, 300)
    },
    async fetchData() {
      const { key, keywords } = this
      const params = {
        id: getToken() ? getToken().id : '',
        keywords
      }
      const result = key === 1 ? await Api.getAfterRectificationData(params) : await Api.getCorrectedData(params)
      if (result.code === '200') {
        const list = ['待整改', '整改待审核', '待督察', '待办结', '已办结']
        this.listData = result.data.map(item => {
          return {
            ...item,
            stateText: list[item.state]
          }
        })
      } else {
        this.listData = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.normal_container {
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
    border: none;
    outline: none;
    padding: 0 8px;
    background-color: inherit;
    flex: 1;
  }

  .body {
    // background: #F6F7FB;
    padding: 8px 0px;
    box-sizing: border-box;
    min-height: calc(100vh - 62px);
  }
}

// 长辈版
.elder_container {
  font-size: 18px;
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
    width: 18px;
    height: 18px;
  }

  .header_content_input {
    border: none;
    outline: none;
    padding: 0 8px;
    background-color: inherit;
    flex: 1;
  }

  .body {
    // background: #F6F7FB;
    padding: 8px 0px;
    box-sizing: border-box;
    min-height: calc(100vh - 62px);
  }
}
</style>
