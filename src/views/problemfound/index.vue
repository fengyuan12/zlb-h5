<template>
  <div class="container">
    <QuestionForm v-for="(item, index) of formList" :key="index" :item-info="item" :form-data="formData" />
    <CustomButton @handleSumbit="handleSumbit" />
  </div>
</template>

<script>
import Api from '@/api/question/index'
export default {
  components: {
    QuestionForm: () => import('@/components/QuestionForm'),
    CustomButton: () => import('@/components/CustomButton')
  },
  data() {
    return {
      formList: [
        {
          type: 'input',
          title: '问题名称：',
          value: 'clueName'
        },
        {
          type: 'picker',
          title: '问题类型：',
          value: 'questionType',
          pickerOptions: ['设备设施', '电气路线', '消防安全', '职业健康', '生产车间现场', '危化品使用', '工业气体使用']
        },
        {
          type: 'date',
          title: '发现时间：',
          value: 'createTime'
        },
        {
          type: 'textarea',
          title: '问题详情：',
          value: 'clueDetail'
        },
        {
          type: 'uploadImg',
          title: '问题图片：',
          value: 'cluePicture',
          imgName: 'cluePictureName'
        },
        {
          type: 'input',
          title: '发现人：',
          readonly: true,
          value: 'createUnitName'
        },
        {
          type: 'picker',
          key: 'question_unit',
          title: '问题单位：',
          value: 'rectifyIndex',
          pickerOptions: []
        }
      ],
      formData: {
        clueName: '',
        questionType: '',
        state: 0,
        createTime: '',
        clueDetail: '',
        cluePicture: [],
        cluePictureName: [],
        createUnitId: '',
        createUnitName: '',
        rectifyIndex: null,
        rectifyUnitId: '',
        rectifyUnitName: ''
      },
      unitList: []
    }
  },
  mounted() {
    this.getUnitList()
  },
  methods: {
    async getUnitList() {
      const params = {
        keywords: ''
      }
      const result = await Api.getUnitList(params)
      if (result.code === '200') {
        this.unitList = result.data.filter(_ => _.unitName)
        const data = this.formList.find(_ => _.key === 'question_unit')
        if (data) {
          data.pickerOptions = result.data.filter(_ => _.unitName).map(_ => _.unitName)
        }
      }
    },
    async handleSumbit() {
      const { formData, unitList } = this
      if (!formData.clueName) {
        this.$Toast.fail('问题名称不能为空')
        return
      }
      if (!formData.questionType) {
        this.$Toast.fail('问题类型不能为空')
        return
      }
      if (!formData.createTime) {
        this.$Toast.fail('发现时间不能为空')
        return
      }
      if (!formData.clueDetail) {
        this.$Toast.fail('问题详情不能为空')
        return
      }
      if (!formData.cluePicture || formData.cluePicture.length === 0) {
        this.$Toast.fail('问题图片不能为空')
        return
      }
      if (!formData.rectifyUnitId) {
        this.$Toast.fail('问题单位不能为空')
        return
      }
      if (formData.rectifyIndex > -1) {
        const data = unitList[formData.rectifyIndex]
        if (data) {
          formData.rectifyUnitId = data.id
          formData.rectifyUnitName = data.unitName
        }
      }
      const result = await Api.postCule(formData)
      if (result.code === '200') {
        this.$Toast.success('保存成功')
        this.$router.back()
      } else {
        this.$Toast.fail('保存失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #F6F7FB;
  box-sizing: border-box;
  padding: 8px 16px;
}
</style>
