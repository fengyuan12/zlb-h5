<template>
  <div class="container">
    <QuestionForm v-for="(item, index) of formList" :key="index" :item-info="item" :form-data="formData" />
    <CustomButton v-if="[0, 1].includes(queryVal.state)" title="整改反馈" @handleSumbit="handleSumbit" />
  </div>
</template>

<script>
import Api from '@/api/question/index'
import infoApi from '@/api/info/index'
export default {
  components: {
    QuestionForm: () => import('@/components/QuestionForm'),
    CustomButton: () => import('@/components/CustomButton')
  },
  data() {
    return {
      formList: [],
      formData: {},
      queryVal: {},
      proBelmDetailInfo: {}, // 问题详情
      proBelmRecttifiDetailInfo: {
        correctiveMeasures: '',
        id: '',
        rectificationAfterPicture: [],
        rectificationAfterPictureName: [],
        rectificationBeforePicture: [],
        rectificationBeforePictureName: []
      }, // 问题整改详情
      problemSuperviseFeedbackInfo: {}, // 问题督查
      problemConcludeInfo: {} // 问题办结
    }
  },
  mounted() {
    const queryVal = this.$route.query
    this.queryVal = {
      ...queryVal,
      state: +queryVal.state,
      key: +queryVal.key
    }
    if (queryVal.relevanceId) {
      this.formList = this.handleComputedFormList(0)
      this.getDetailInfo(queryVal)
    } else {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      this.problemSuperviseFeedbackInfo = {}
      this.problemConcludeInfo = {}
      const { queryVal: item } = this
      await this.getProBlemDetail(item.id)
      item.key === 2 && await this.getProBlemRectificaton(item.id)
      if (item.state === 3 || item.state === 4) {
        await this.getProblemSuperviseFeedback(item.id)
      }
      item.state === 4 && await this.getProblemConclude(item.id)
      const { proBelmDetailInfo, proBelmRecttifiDetailInfo, problemSuperviseFeedbackInfo, problemConcludeInfo } = this
      this.formData = {
        ...proBelmDetailInfo,
        ...proBelmRecttifiDetailInfo,
        ...problemSuperviseFeedbackInfo,
        ...problemConcludeInfo
      }
      this.formList = this.handleComputedFormList(item.state, this.problemSuperviseFeedbackInfo)
    },
    handleComputedFormList(state, obj) {
      let result = []
      switch (state) {
        case 0:
        case 1:
          result = [
            {
              type: 'input',
              title: '问题名称',
              readonly: true,
              value: 'problemName'
            },
            {
              type: 'input',
              title: '问题类型',
              readonly: true,
              value: 'probelmType',
              pickerOptions: [
                {
                  label: '设备设施',
                  value: 0
                },
                {
                  label: '电气路线',
                  value: 1
                },
                {
                  label: '消防安全',
                  value: 2
                },
                {
                  label: '职业健康',
                  value: 3
                },
                {
                  label: '生产车间现场',
                  value: 4
                },
                {
                  label: '危化品使用',
                  value: 5
                },
                {
                  label: '工业气体使用',
                  value: 6
                }
              ]
            },
            {
              type: 'date',
              title: '发现时间',
              readonly: true,
              value: 'discoverTime'
            },
            {
              type: 'textarea',
              title: '问题详情',
              readonly: true,
              value: 'problemDetail'
            },
            {
              type: 'uploadImg',
              title: '问题图片',
              readonly: true,
              value: 'attachment'
            },
            {
              type: 'input',
              title: '发现单位',
              readonly: true,
              value: 'createUnitName'
            },
            {
              type: 'input',
              title: '整改单位',
              readonly: true,
              value: 'rectifyUnitName'
            },
            {
              type: 'text',
              title: '问题整改'
            },
            {
              type: 'input',
              title: '整改措施',
              value: 'correctiveMeasures'
            },
            {
              type: 'uploadImg',
              title: '整改前图片',
              value: 'rectificationBeforePicture',
              imgName: 'rectificationBeforePictureName'
            },
            {
              type: 'uploadImg',
              title: '整改后图片',
              value: 'rectificationAfterPicture',
              imgName: 'rectificationAfterPictureName'
            }
          ]
          break;
        case 2:
          result = [
            {
              type: 'input',
              title: '问题名称',
              readonly: true,
              value: 'problemName'
            },
            {
              type: 'input',
              title: '问题类型',
              readonly: true,
              value: 'probelmType',
              pickerOptions: [
                {
                  label: '设备设施',
                  value: 0
                },
                {
                  label: '电气路线',
                  value: 1
                },
                {
                  label: '消防安全',
                  value: 2
                },
                {
                  label: '职业健康',
                  value: 3
                },
                {
                  label: '生产车间现场',
                  value: 4
                },
                {
                  label: '危化品使用',
                  value: 5
                },
                {
                  label: '工业气体使用',
                  value: 6
                }
              ]
            },
            {
              type: 'date',
              title: '发现时间',
              readonly: true,
              value: 'discoverTime'
            },
            {
              type: 'textarea',
              title: '问题详情',
              readonly: true,
              value: 'problemDetail'
            },
            {
              type: 'uploadImg',
              title: '问题图片',
              readonly: true,
              value: 'attachment'
            },
            {
              type: 'input',
              title: '发现单位',
              readonly: true,
              value: 'createUnitName'
            },
            {
              type: 'input',
              title: '整改单位',
              readonly: true,
              value: 'rectifyUnitName'
            },
            {
              type: 'text',
              title: '问题整改'
            },
            {
              type: 'input',
              title: '整改措施',
              readonly: true,
              value: 'correctiveMeasures'
            },
            {
              type: 'uploadImg',
              title: '整改前图片',
              readonly: true,
              value: 'rectificationBeforePicture',
              imgName: 'rectificationBeforePictureName'
            },
            {
              type: 'uploadImg',
              title: '整改后图片',
              readonly: true,
              value: 'rectificationAfterPicture',
              imgName: 'rectificationAfterPictureName'
            }
          ]
          break;
        case 3:
          result = [
            {
              type: 'input',
              title: '问题名称',
              readonly: true,
              value: 'problemName'
            },
            {
              type: 'input',
              title: '问题类型',
              readonly: true,
              value: 'probelmType',
              pickerOptions: [
                {
                  label: '设备设施',
                  value: 0
                },
                {
                  label: '电气路线',
                  value: 1
                },
                {
                  label: '消防安全',
                  value: 2
                },
                {
                  label: '职业健康',
                  value: 3
                },
                {
                  label: '生产车间现场',
                  value: 4
                },
                {
                  label: '危化品使用',
                  value: 5
                },
                {
                  label: '工业气体使用',
                  value: 6
                }
              ]
            },
            {
              type: 'date',
              title: '发现时间',
              readonly: true,
              value: 'discoverTime'
            },
            {
              type: 'textarea',
              title: '问题详情',
              readonly: true,
              value: 'problemDetail'
            },
            {
              type: 'uploadImg',
              title: '问题图片',
              readonly: true,
              value: 'attachment'
            },
            {
              type: 'input',
              title: '发现单位',
              readonly: true,
              value: 'createUnitName'
            },
            {
              type: 'input',
              title: '整改单位',
              readonly: true,
              value: 'rectifyUnitName'
            },
            {
              type: 'text',
              title: '问题整改'
            },
            {
              type: 'input',
              title: '整改措施',
              readonly: true,
              value: 'correctiveMeasures'
            },
            {
              type: 'uploadImg',
              title: '整改前图片',
              readonly: true,
              value: 'rectificationBeforePicture',
              imgName: 'rectificationBeforePictureName'
            },
            {
              type: 'uploadImg',
              title: '整改后图片',
              readonly: true,
              value: 'rectificationAfterPicture',
              imgName: 'rectificationAfterPictureName'
            }
          ]
          if (obj.showInspector) {
            result = [
              ...result,
              {
                type: 'text',
                title: '问题督查'
              },
              {
                type: 'input',
                title: '督查结果',
                readonly: true,
                value: 'superviseResult'
              },
              {
                type: 'date',
                title: '督查时间',
                readonly: true,
                value: 'superviseTime'
              },
              {
                type: 'uploadImg',
                title: '现场图片',
                readonly: true,
                value: 'supervisePricture'
              }
            ]
          }
          break;
        case 4:
          result = [
            {
              type: 'input',
              title: '问题名称',
              readonly: true,
              value: 'problemName'
            },
            {
              type: 'input',
              title: '问题类型',
              readonly: true,
              value: 'probelmType',
              pickerOptions: [
                {
                  label: '设备设施',
                  value: 0
                },
                {
                  label: '电气路线',
                  value: 1
                },
                {
                  label: '消防安全',
                  value: 2
                },
                {
                  label: '职业健康',
                  value: 3
                },
                {
                  label: '生产车间现场',
                  value: 4
                },
                {
                  label: '危化品使用',
                  value: 5
                },
                {
                  label: '工业气体使用',
                  value: 6
                }
              ]
            },
            {
              type: 'date',
              title: '发现时间',
              readonly: true,
              value: 'discoverTime'
            },
            {
              type: 'textarea',
              title: '问题详情',
              readonly: true,
              value: 'problemDetail'
            },
            {
              type: 'uploadImg',
              title: '问题图片',
              readonly: true,
              value: 'attachment'
            },
            {
              type: 'input',
              title: '发现单位',
              readonly: true,
              value: 'createUnitName'
            },
            {
              type: 'input',
              title: '整改单位',
              readonly: true,
              value: 'rectifyUnitName'
            },
            {
              type: 'text',
              title: '问题整改'
            },
            {
              type: 'input',
              title: '整改措施',
              readonly: true,
              value: 'correctiveMeasures'
            },
            {
              type: 'uploadImg',
              title: '整改前图片',
              readonly: true,
              value: 'rectificationBeforePicture',
              imgName: 'rectificationBeforePictureName'
            },
            {
              type: 'uploadImg',
              title: '整改后图片',
              readonly: true,
              value: 'rectificationAfterPicture',
              imgName: 'rectificationAfterPictureName'
            }
          ]
          if (obj.showInspector) {
            result = [
              ...result,
              {
                type: 'text',
                title: '问题督查'
              },
              {
                type: 'input',
                title: '督查结果',
                readonly: true,
                value: 'superviseResult'
              },
              {
                type: 'date',
                title: '督查时间',
                readonly: true,
                value: 'superviseTime'
              },
              {
                type: 'uploadImg',
                title: '现场图片',
                readonly: true,
                value: 'supervisePricture'
              }
            ]
          }
          result = [
            ...result,
            {
              type: 'text',
              title: '问题办结'
            },
            {
              type: 'textarea',
              title: '办结评价',
              readonly: true,
              value: 'concludeEvaluate'
            },
            {
              type: 'star',
              title: '质量评价',
              readonly: true,
              value: 'qualityEvaluate'
            }
          ]
          break;
        default:
          break;
      }
      return result
    },
    /**
     * 线索库详情
     */
    async getProBlemDetail(id) {
      const params = {
        id
      }
      const result = await Api.getProBlemDetail(params)
      if (result.code === '200') {
        this.proBelmDetailInfo = {
          ...result.data
        }
      }
    },

    /**
     * 问题整改详情
     */
    async getProBlemRectificaton(id) {
      const params = {
        id
      }
      const result = await Api.getProBlemRectificaton(params)
      if (result.code === '200') {
        this.proBelmRecttifiDetailInfo = {
          ...result.data
        }
      }
    },

    /**
     * 问题督查
     */
    async getProblemSuperviseFeedback(id) {
      const params = {
        id
      }
      const result = await Api.getProblemSuperviseFeedback(params)
      if (result.code === '200') {
        this.problemSuperviseFeedbackInfo = {
          ...result.data,
          superviseResult: result.data.superviseResult === 1 ? '合格' : '不合格',
          showInspector: true
        }
      }
    },

    /**
     * 问题办结
     */
    async getProblemConclude(id) {
      const params = {
        id
      }
      const result = await Api.getProblemConclude(params)
      if (result.code === '200') {
        this.problemConcludeInfo = {
          ...result.data
        }
      }
    },
    // 保存及修改
    async handleSumbit() {
      const saveData = {
        ...this.formData,
        id: this.queryVal.relevanceId || this.queryVal.id
      }
      if (!saveData.correctiveMeasures) {
        this.$Toast.fail('整改措施不能为空')
        return
      }
      if (!saveData.rectificationBeforePicture || saveData.rectificationBeforePicture.length === 0) {
        this.$Toast.fail('整改前图片不能为空')
        return
      }
      if (!saveData.rectificationAfterPicture || saveData.rectificationAfterPicture.length === 0) {
        this.$Toast.fail('整改后图片不能为空')
        return
      }
      const result = this.queryVal.key === 1 ? await Api.postProBlemRectificaton(saveData) : await Api.putProBlemRectificaton(saveData)
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
          ...result.data,
          ...this.proBelmRecttifiDetailInfo
        }
      } else {
        this.formData = {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  // background: #f6f7fb;
  box-sizing: border-box;
  padding: 8px 16px;
}
</style>
