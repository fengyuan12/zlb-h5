<template>
  <div>
    <div class="form_remark" v-if="itemInfo.type === 'remark'">
      <span>注意：<br />
        1.企业在本单位内发生影响较大的生态环境事件实行考核“一票否决制”；<br />
        2.企业当年因违反生态环保问题被上级环保部门立案处罚且影响较轻的，每出现1次扣30分；<br />
        3.企业涉及环保信访投诉被街道或上级环保主管部门查出确有问题需整改的，每出现1次扣10分；<br />
        4.街道在日常环保检查中发现企业存在环保问题，企业未按时间节点限时完成整改的，每出现1次扣10分。
      </span>
    </div>
    <div class="form_body" v-else>
      <div v-for="item of itemInfo.itemList" :key="item.key">
        <div v-if="item.type === 'first_title'">
          <div style="padding-top: 18px">{{item.content}}</div>
          <div class="divider"></div>
        </div>
        <div v-if="item.type === 'title'">
          <div class="form_item_title">
            <span>{{item.subTitle}} {{item.content}}</span>
            <span>{{item.score}}</span>
          </div>
          <div class="form_item_sub_title">
            <span @click="handleShowToast('基本要求', item.demand)">基本要求</span>
            <span class="form_item_sub_divider"></span>
            <span @click="handleShowToast('评分标准' ,item.scored)">评分标准</span>
          </div>
          <div>
            <input class="form_item_input" type="number" oninput="if(value.length>2) value=value.slice(0,2)" :maxlength="2" v-model="formData[item.value]" placeholder="请输入" @input="$emit('handleKeyInput')" :disabled="disabled" />
          </div>
        </div>
        <div v-if="item.type === 'total'">
          <div style="padding-top: 18px">{{item.content}}</div>
          <div class="divider"></div>
          <div>
            <input disabled class="form_item_input" type="number" v-model="formData[item.value]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleShowToast(title, val) {
      this.$dialog.alert({
        title,
        message: val,
        confirmButtonText: '关闭',
        confirmButtonColor: '#2784FF'
      }).then(() => {
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.form_remark {
  box-sizing: border-box;
  padding: 16px;
  background: #FFFFFF;
  border-radius: 6px;
  line-height: 24px;
}

.form_body {
  margin-top: 10px;
  padding: 0 16px 16px 16px;
  background: #FFFFFF;
  border-radius: 6px;
  line-height: 24px;
}

.divider {
  background: #F6F6F8;
  margin: 12px 0;
  width: 100%;
  height: 1px;
}

.form_item_title {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form_item_sub_title {
  margin: 8px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #2784FF;
}

.form_item_sub_divider {
  display: inline-block;
  margin: 0 12px;
  width: 1px;
  height: 12px;
  background: #DADADA;
}

.form_item_input {
  // background: #F6F7FB;
  padding: 0 8px;
  height: 36px;
  border: none;
  outline: none;
  width: 100%;
  &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color : #B3B5B9;
  }
  &:disabled {
    background: #fff;
  }
}
</style>
