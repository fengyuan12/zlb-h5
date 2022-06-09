<template>
  <div class="custom_sumbit">
    <button class="custom_sumbit_button" @click="$emit('handleSumbit')">{{title}}</button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '提交'
    }
  }
}
</script>

<style lang="scss" scoped>
.custom_sumbit {
  margin: 20px 0;
  width: 100%;
  box-sizing: border-box;
  // padding: 0 16px;
}

.custom_sumbit_button {
  background: #2784FF;
  color: white;
  height: 48px;
  border: none;
  font-weight: 500;
  width: 100%;
  font-size: 18px;
  border-radius: 24px;
}
</style>
