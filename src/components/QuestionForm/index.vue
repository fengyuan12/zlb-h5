<template>
  <div :class="isNormal ? 'normal_container' : 'elder_container'">
    <div v-if="itemInfo.type === 'input'">
      <!-- 文本 -->
      <div class="question_form_box">
        <div class="question_form_item_label">
          <span>{{itemInfo.title}}</span>
        </div>
        <div style="flex: 1;">
          <input class="question_form_item_input" :disabled="itemInfo.readonly" v-model="formData[itemInfo.value]" :placeholder="`请输入${itemInfo.title}`" />
        </div>
      </div>
      <div class="question_divider"></div>
    </div>
    <div v-if="itemInfo.type === 'picker'">
      <!-- 选择框 -->
      <div class="question_form_box">
        <div class="question_form_item_label">
          <span>{{itemInfo.title}}</span>
        </div>
        <div style="flex: 1;" @click="handlePicker">
          <input class="question_form_item_input" readonly :value="itemInfo.pickerOptions[formData[itemInfo.value]]" :placeholder="`请选择${itemInfo.title}`" />
        </div>
      </div>
      <div class="question_divider"></div>
    </div>
    <!-- 自定义下拉框 -->
    <div v-if="itemInfo.type === 'custom_picker'">
      <!-- 选择框 -->
      <div class="question_form_box">
        <div class="question_form_item_label">
          <span>{{itemInfo.title}}</span>
        </div>
        <div style="flex: 1;" @click="handlePicker">
          <input class="question_form_item_input" readonly :value="formData[itemInfo.value]" :placeholder="`请选择${itemInfo.title}`" />
        </div>
      </div>
      <div class="question_divider"></div>
    </div>
    <div v-if="itemInfo.type === 'date'">
      <!-- 日期选择框 -->
      <div class="question_form_box">
        <div class="question_form_item_label">
          <span>{{itemInfo.title}}</span>
        </div>
        <div style="flex: 1;" @click="handlePicker">
          <input class="question_form_item_input" readonly :value="formData[itemInfo.value]" :placeholder="`请选择${itemInfo.title}`" />
        </div>
      </div>
      <div class="question_divider"></div>
    </div>
    <div v-if="itemInfo.type === 'textarea'">
      <!-- 多文本 -->
      <div class="question_form_textarea">
        <div class="question_form_textarea_label">
          <span>{{itemInfo.title}}</span>
        </div>
        <textarea :disabled="itemInfo.readonly" v-model="formData[itemInfo.value]" :placeholder="`请输入${itemInfo.title}`" />
      </div>
      <div class="question_divider"></div>
    </div>
    <div v-if="itemInfo.type === 'uploadImg'">
      <!-- 上传图片 -->
      <div class="question_form_textarea">
        <div class="question_form_textarea_label">
          <span>{{itemInfo.title}}</span>
        </div>
        <div class="question_upload_box">
          <div v-if="formData[itemInfo.value] && formData[itemInfo.value].length > 0">
            <img v-for="(item, index) of formData[itemInfo.value]" :key="index" class="question_upload_box_img" :src="item" />
          </div>
          <!-- <img v-if="!itemInfo.readonly" @click="handleUpload" class="question_upload_box_img" src="@/assets/img/question/upload.png" /> -->
          <div v-if="!itemInfo.readonly" @click="handleUpload" class="question_upload_box_custom" flex="main:center">
            <div class="custom_content" flex="main:center">
              <div class="content_plus"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="question_divider"></div>
    </div>
    <div v-if="itemInfo.type === 'text'">
      <div class="question_form_text">
        <div class="question_form_text_icon"></div>
        <div>
          <span>{{itemInfo.title}}</span>
        </div>
      </div>
    </div>
    <div v-if="itemInfo.type === 'star'">
      <div class="question_form_box">
        <div class="qustion_form_star">
          <span>{{itemInfo.title}}</span>
          <img v-for="(item, index) of formData[itemInfo.value]" :key="index" class="question_star_icon" src="@/assets/img/mine/star_icon.png" />
        </div>
      </div>
      <div class="question_divider"></div>
    </div>
    <!-- 下拉弹框 -->
    <van-popup v-model="showPicker" round position="bottom" get-container="body">
      <van-picker
        v-if="itemInfo.type === 'picker'"
        show-toolbar
        :columns="itemInfo.pickerOptions"
        :default-index="pickerIndex"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
      <van-datetime-picker
        v-if="itemInfo.type === 'date'"
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :formatter="formatter"
        @cancel="showPicker = false"
        @confirm="onDateConfirm"
      />
      <van-picker
        v-if="itemInfo.type === 'custom_picker'"
        show-toolbar
        :columns="itemInfo.pickerOptions"
        :default-index="pickerIndex"
        @cancel="showPicker = false"
        @confirm="customConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import moment from 'dayjs'
import { UiStyle } from '@/mixins/uistyle'
import { getToken } from '@/utils/token'
export default {
  mixins: [UiStyle],
  props: {
    itemInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      showPicker: false,
      pickerIndex: 0,
      currentDate: new Date(),
      tokenInfo: getToken() || {
        unitName: ''
      }
    }
  },
  methods: {
    onConfirm(value, index) {
      this.formData[this.itemInfo.value] = index
      this.showPicker = false
    },
    customConfirm(value) {
      let val = value
      if (val === '实名') {
        val = this.tokenInfo.unitName
      }
      this.formData[this.itemInfo.value] = val
      this.showPicker = false
    },
    onDateConfirm(value) {
      this.formData[this.itemInfo.value] = moment(value).format('YYYY-MM-DD')
      this.showPicker = false
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      }
      return val;
    },
    handlePicker() {
      if (this.itemInfo.readonly) {
        return
      }
      this.showPicker = true
    },
    handleUpload() {
      const { formData, itemInfo } = this
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
          formData[itemInfo.value] = [...picPath]
          formData[itemInfo.imgName] = [...picPath].map(_ => format(_))
        }
        console.log('成功：' + JSON.stringify(result))
      }).catch((error) => {
        console.log('失败：' + JSON.stringify(error))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.normal_container {
  .question_form_box {
    box-sizing: border-box;
    background: #ffffff;
    display: flex;
    align-items: center;
    border-radius: 6px;
    line-height: 44px;
  }

  .question_form_item_label {
    display: inline-block;
    color: #666666;
    width: 80px;
  }

  .question_form_item_input {
    background-color: inherit;
    width: 100%;
    line-height: 44px;
    border: none;
    outline: none;
    &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
      color : #B3B5B9;
    }
  }

  .question_form_textarea {
    box-sizing: border-box;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    textarea {
      border: none;
      outline: none;
      resize: none;
      height: 80px;
      line-height: 1.5;
      padding-bottom: 8px;
      &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color : #B3B5B9;
      }
      &:disabled {
        background: #fff;
      }
    }
  }

  .question_form_textarea_label {
    color: #666666;
    line-height: 44px;
  }

  .question_divider {
    height: 1px;
    background: #E8E9EC;
    margin: 4px 0;
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

  .question_form_text {
    display: flex;
    align-items: center;
    margin: 16px 0;
  }

  .question_form_text_icon {
    width: 3px;
    height: 14px;
    background: #2784FF;
    border-radius: 1px;
    margin-right: 6px;
  }

  .question_star_icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }

  .qustion_form_star {
    display: flex;
    align-items: center;
  }

  @media (max-width: 360px) {
    .question_form_item_label {
      width: 100px;
    }
  }
}

// 长辈版
.elder_container {
  font-size: 18px;
  .question_form_box {
    box-sizing: border-box;
    background: #ffffff;
    display: flex;
    align-items: center;
    border-radius: 6px;
    line-height: 44px;
  }

  .question_form_item_label {
    display: inline-block;
    color: #666666;
    width: 80px;
  }

  .question_form_item_input {
    background-color: inherit;
    width: 100%;
    line-height: 44px;
    border: none;
    outline: none;
    &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
      color : #B3B5B9;
    }
  }

  .question_form_textarea {
    box-sizing: border-box;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    textarea {
      border: none;
      outline: none;
      resize: none;
      height: 80px;
      line-height: 1.5;
      padding-bottom: 8px;
      &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color : #B3B5B9;
      }
      &:disabled {
        background: #fff;
      }
    }
  }

  .question_form_textarea_label {
    color: #666666;
    line-height: 44px;
  }

  .question_divider {
    height: 1px;
    background: #E8E9EC;
    margin: 4px 0;
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

  .question_form_text {
    display: flex;
    align-items: center;
    margin: 16px 0;
    font-size: 22px;
  }

  .question_form_text_icon {
    width: 3px;
    height: 18px;
    background: #2784FF;
    border-radius: 1px;
    margin-right: 6px;
  }

  .question_star_icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }

  .qustion_form_star {
    display: flex;
    align-items: center;
  }

  @media (max-width: 360px) {
    .question_form_item_label {
      width: 100px;
    }
  }
}
</style>
