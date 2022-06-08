<template>
  <div>
    <Form v-for="(item, index) of formList" :key="index" :form-item="item" :form-data="formData" />
    <div class="question_bg">
      <div class="question_content">
        <div>
          <span>存在其他问题：</span>
        </div>
        <div class="qustion_divider"></div>
        <textarea placeholder="存在其他问题：" class="card_textarea" v-model="formData.existProblem" />
      </div>
    </div>
    <CustomButton v-if="formData.checkMonth === nowDate" @handleSumbit="handleSumbit" />
  </div>
</template>

<script>
import safetyApi from '@/api/correction/safety' // 企业安全生产责任制
import miningApi from '@/api/correction/mining' // 工矿企业
import labourApi from '@/api/correction/labour' // 劳动密集型企业
import infoApi from '@/api/info/index' // 消息模块
import {
  SAFETY_LIST,
  MINING_LIST,
  LABOUR_LIST } from '@/utils/constant'
import moment from 'dayjs'
export default {
  components: {
    Form: () => import('./components/Form'),
    CustomButton: () => import('@/components/CustomButton')
  },
  data() {
    return {
      formList: [],
      formData: {},
      nowDate: moment().format('YYYY-MM'),
      Api: null
    }
  },
  mounted() {
    const item = this.$route.query
    this.handleFormList(item)
    if (item.relevanceId) {
      this.getDetailInfo(item)
    } else {
      this.getData(item)
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === '/info') {
      to.meta.keepAlive = true
    } else {
      to.meta.keepAlive = false
    }
    next()
  },
  methods: {
    handleFormList(item) {
      const { correctionKey } = item
      switch (correctionKey) {
        case '1':
          this.formList = SAFETY_LIST
          this.Api = safetyApi
          break;
        case '2':
          this.formList = MINING_LIST
          this.Api = miningApi
          break;
         case '3':
          this.formList = LABOUR_LIST
          this.Api = labourApi
          break;
        default:
          break;
      }
    },
    async getData(item) {
      const params = {
        id: item.id
      }
      const result = await this.Api.getDetail(params)
      if (result.code === '200') {
        this.formData = {
          ...result.data
        }
      } else {
        this.formData = {}
      }
    },
    async handleSumbit() {
      const { formData: data, Api } = this
      const result = await Api.postData(data)
      if (result.code === '200') {
        this.$Toast.success('保存成功')
        this.$router.back()
      } else {
        this.$Toast.fail('保存失败')
      }
    },
    // 从消息模块点击详情
    async getDetailInfo(item) {
      const params = {
        id: item.id,
        relevanceId: item.relevanceId,
        type: item.type
      }
      const result = await infoApi.getDetail(params)
      if (result.code === '200') {
        this.formData = {
          ...result.data
        }
      } else {
        this.formData = {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.question_bg {
  box-sizing: border-box;
  background: #f6f7fb;
  padding: 8px 16px;
  width: 100%;
}

.question_content {
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  background: #ffffff;
  border-radius: 6px;
}

.qustion_divider {
  background: #f6f6f8;
  margin: 16px 0;
  width: 100%;
  height: 1px;
}

.card_textarea {
  box-sizing: border-box;
  height: 80px;
  width: 100%;
  background: #f6f7fb;
  outline: none;
  border: none;
  padding: 5px;
  resize: none;
  line-height: 1.5;
}
</style>
