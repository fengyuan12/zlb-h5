<template>
  <div class="container">
    <Form v-for="(item, index) of formList" :disabled="state >= 2" :key="index" :item-info="item" :form-data="formData" @handleKeyInput="handleKeyInput" />
    <CustomButton v-if="state < 2" @handleSumbit="handleSumbit" />
  </div>
</template>

<script>
import environmentApi from '@/api/star/environment' // 生态环境“星级”评定
import safetyratingApi from '@/api/star/safetyrating'
import scoreminingApi from '@/api/star/scoremining' // 企业安全生产责任制“星级”评分
import communitysafetyApi from '@/api/star/communitysafety' // 行政村、社区安全生产责任制“星
import schoolsafetyApi from '@/api/star/schoolsafety' // 学校安全生产责任制“星级”评分
import medicalsafetyApi from '@/api/star/medicalsafety' // 医疗机构
import {
  ECOLOGY_List,
  SCORE_MINING_LIST,
  SCORE_VILLAGE_LIST,
  SCORE_SCHOOL_LIST,
  SCORE_FACILITY_LIST } from '@/utils/constant'
export default {
  components: {
    Form: () => import('./components/Form'),
    CustomButton: () => import('@/components/CustomButton')
  },
  data() {
    return {
      formList: [],
      formData: {},
      state: null,
      starKey: null,
      Api: null
    }
  },
  mounted() {
    const { starKey, item } = this.$route.query
    if (item) {
      const info = JSON.parse(item)
      this.state = info.state
      this.handleSetApi(starKey, info.type)
      this.starKey = starKey
      this.getData(info)
    }
  },
  methods: {
    handleSetApi(key, safetyType) {
      let Api = ''
      let formList = ECOLOGY_List
      if (key === 'ECOLOGY') {
        Api = environmentApi
      }
      switch (safetyType) {
        case 0:
          Api = scoreminingApi
          formList = SCORE_MINING_LIST
          break;
        case 1:
          Api = communitysafetyApi
          formList = SCORE_VILLAGE_LIST
          break;
        case 2:
          Api = schoolsafetyApi
          formList = SCORE_SCHOOL_LIST
          break;
        case 3:
          Api = medicalsafetyApi
          formList = SCORE_FACILITY_LIST
          break;
        default:
          break;
      }
      this.Api = Api
      this.formList = formList
    },
    async getData(item) {
      const Api = this.starKey === 'ECOLOGY' ? environmentApi : safetyratingApi
      const params = {
        id: item.id,
        type: item.type
      }
      const result = await Api.getDetail(params)
      if (result.code === '200') {
        this.formData = {
          ...result.data
        }
      } else {
        this.formData = {}
      }
    },
    // 提交按钮事件
    async handleSumbit() {
      const { formData: data, Api } = this
      const result = data.id ? await Api.putData(data) : await Api.postData(data)
      if (result.code === '200') {
        this.$Toast.success('保存成功')
        this.$router.back()
      } else {
        this.$Toast.fail('保存失败')
      }
    },
    handleKeyInput() {
      let totalObj = {}
      const formList = this.formList.find(_ => _.type === 'body')
      if (formList) {
        const { itemList } = formList
        const { formData } = this
        const isTotal = itemList.find(_ => _.type === 'total')
        if (isTotal) {
          const computedItemList = itemList.filter(_ => _.computed)
          totalObj[isTotal.value] = computedItemList.reduce((pre, cur) => {
            pre = pre + (+formData[cur.value] || 0)
            return pre
          }, 0)
        }
        this.formData = {
          ...this.formData,
          ...totalObj
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #f6f7fb;
  box-sizing: border-box;
  padding: 8px 16px;
}
</style>
