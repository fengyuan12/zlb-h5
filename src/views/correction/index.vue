<template>
  <div :class="isNormal ? 'normal_container' : 'elder_container'">
    <Form v-for="(item, index) of formList" :key="index" :form-item="item" :form-data="formData" />
    <div class="question_bg">
      <div class="question_content">
        <div>
          <span>其他问题及描述：</span>
        </div>
        <div class="qustion_divider"></div>
        <textarea placeholder="其他问题及描述：" class="card_textarea" v-model="formData.existProblem" />
        <div>
          <span>问题图片：</span>
        </div>
        <div class="qustion_divider"></div>
        <div class="question_upload_box">
          <div v-if="formData.explains && formData.explains.length > 0">
            <img v-for="(item, index) of formData.explains" :key="index" class="question_upload_box_img" :src="item.url" @click="handleView(index, formData.explains)" @touchstart="touchStart(index)" @touchend="touchEnd" />
          </div>
          <div @click="handleUpload" class="question_upload_box_custom" flex="main:center">
            <div class="custom_content" flex="main:center">
              <div class="content_plus"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card_divider"></div>
    <div style="padding: 0 16px">
      <CustomButton v-if="formData.checkMonth === nowDate" @handleSumbit="handleSumbit" />
    </div>
  </div>
</template>

<script>
import safetyApi from '@/api/correction/safety' // 企业安全生产责任制
import miningApi from '@/api/correction/mining' // 工矿企业
import labourApi from '@/api/correction/labour' // 劳动密集型企业
import infoApi from '@/api/info/index' // 消息模块
import { ImagePreview } from 'vant'
import {
  SAFETY_LIST,
  MINING_LIST,
  LABOUR_LIST } from '@/utils/constant'
import moment from 'dayjs'
import { UiStyle } from '@/mixins/uistyle'
export default {
  mixins: [UiStyle],
  components: {
    Form: () => import('./components/Form'),
    CustomButton: () => import('@/components/CustomButton')
  },
  data() {
    return {
      formList: [],
      formData: {},
      nowDate: moment().format('YYYY-MM'),
      Api: null,
      touchTimer: null
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
    if (['/list', '/info'].includes(to.path)) {
      to.meta.keepAlive = true
    } else {
      to.meta.keepAlive = false
    }
    next()
  },
  methods: {
    handleView(startPosition, imagesArr) {
      ImagePreview({
        images: imagesArr.map(_ => _.url),
        startPosition
      })
    },
    touchStart(index) {
      const _this = this
      //手指触摸
      this.touchTimer && clearTimeout(this.touchTimer)
      this.touchTimer = setTimeout(() => {
        this.$dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          _this.formData.explains.splice(index, 1)
        }).catch(() => {
          console.log('点击了取消')
        })
      }, 1111)
    },
    touchEnd() {
      //手指离开
      console.log(1)
      this.touchTimer && clearTimeout(this.touchTimer)
    },
    handleUpload() {
      const { formData } = this
      // eslint-disable-next-line no-undef
      ZWJSBridge.chooseImage({
        upload: true
      }).then((result) => {
        const { picPath } = result
        if (Array.isArray(picPath) && picPath.length > 0) {
          const format = (val) => {
            const list = val.split('/')
            return list[list.length - 1]
          }
          const obj = [
            {
              url: picPath[0],
              name: format(picPath[0])
            }
          ]
          formData.explains = [...formData.explains, ... obj]
        }
        console.log('成功：' + JSON.stringify(result))
      }).catch((error) => {
        console.log('失败：' + JSON.stringify(error))
      })
    },
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
          ...result.data,
          explains: result.data.explains ? JSON.parse(result.data.explains) : []
        }
      } else {
        this.formData = {}
      }
    },
    async handleSumbit() {
      const { formData, Api } = this
      const data = { ...formData }
      data.explains = data.explains ? JSON.stringify(data.explains) : ''
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
          ...result.data,
          explains: result.data.explains ? JSON.parse(result.data.explains) : []
        }
      } else {
        this.formData = {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.normal_container {
  .question_bg {
    box-sizing: border-box;
    background: #f6f7fb;
    // padding: 0 16px 8px;
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
    background: #E8E9EC;
    margin: 16px 0;
    width: 100%;
    height: 1px;
  }

  .card_textarea {
    box-sizing: border-box;
    height: 80px;
    width: 100%;
    // background: #f6f7fb;
    outline: none;
    border: none;
    padding: 5px;
    resize: none;
    line-height: 1.5;
    &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
      color : #B3B5B9;
    }
  }

  .card_divider {
    height: 8px;
    background: #F6F7FB;
  }

  .question_upload_box {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 18px;
  }

  .question_upload_box_img {
    margin: 0 8px 8px 0;
    width: 100px;
    height: 100px;
  }

  .question_upload_box_custom {
    margin: 0 8px 8px 0;
    width: 100px;
    height: 100px;
    background: #EBF3FE;
    border-radius: 8px;
    align-items: center;
    .custom_content {
      width: 36px;
      height: 36px;
      background: #428FFC;
      border-radius: 50%;
      align-items: center;
      .content_plus {
        width: 18px;
        height: 18px;
        position: relative;
        box-sizing: border-box;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 8px;
          width: 100%;
          height: 2px;
          background-color: #fff;
        }
        &::after {
          content: "";
          position: absolute;
          left: 8px;
          top: 0;
          width: 2px;
          height: 100%;
          background-color: #fff;
        }
      }
    }
  }
}

.elder_container {
  font-size: 18px;
  .question_bg {
    box-sizing: border-box;
    background: #f6f7fb;
    // padding: 0 16px 8px;
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
    background: #E8E9EC;
    margin: 16px 0;
    width: 100%;
    height: 1px;
  }

  .card_textarea {
    box-sizing: border-box;
    height: 80px;
    width: 100%;
    // background: #f6f7fb;
    outline: none;
    border: none;
    padding: 5px;
    resize: none;
    line-height: 1.5;
    &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
      color : #B3B5B9;
    }
  }

  .card_divider {
    height: 8px;
    background: #F6F7FB;
  }

  .question_upload_box {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 18px;
  }

  .question_upload_box_img {
    margin: 0 8px 8px 0;
    width: 100px;
    height: 100px;
  }

  .question_upload_box_custom {
    margin: 0 8px 8px 0;
    width: 100px;
    height: 100px;
    background: #EBF3FE;
    border-radius: 8px;
    align-items: center;
    .custom_content {
      width: 36px;
      height: 36px;
      background: #428FFC;
      border-radius: 50%;
      align-items: center;
      .content_plus {
        width: 18px;
        height: 18px;
        position: relative;
        box-sizing: border-box;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 8px;
          width: 100%;
          height: 2px;
          background-color: #fff;
        }
        &::after {
          content: "";
          position: absolute;
          left: 8px;
          top: 0;
          width: 2px;
          height: 100%;
          background-color: #fff;
        }
      }
    }
  }
}
</style>
