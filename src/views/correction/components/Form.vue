<template>
  <div class="container">
    <div class="card">
      <span>{{formItem.key}}.{{formItem.content}}</span>
      <div class="divider"></div>
      <textarea class="card_textarea" style="margin-top: 0" placeholder="检查情况：" v-model="formData[formItem.situation]" />
      <textarea class="card_textarea" placeholder="备注：" v-model="formData[formItem.remark]" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formItem: {
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
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 8px 16px;
  box-sizing: border-box;
  background: #F6F7FB;
}

.card {
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  background: #ffffff;
  border-radius: 6px;
}

.divider {
  background: #F6F6F8;
  margin: 12px 0;
  width: 100%;
  height: 1px;
}

.card_textarea  {
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  background: #F6F7FB;
  line-height: 1.5;
  border: none;
  padding: 4px;
  margin-top: 12px;
  resize: none;
}
</style>
