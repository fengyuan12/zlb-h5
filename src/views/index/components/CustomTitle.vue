<template>
  <div>
    <div class="container">
      <span class="custom-title-icon"></span>
      <span class="custom-title-text">{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomTitle',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 15px 0;
  display: flex;
  align-items: center;
}

.custom-title-icon {
  display: inline-block;
  width: 3px;
  height: 14px;
  background: #2784FF;
  border-radius: 1px;
}

.custom-title-text {
  padding-left: 6px;
  font-weight: 600;
  color: #111F2C;
}
</style>
