<template>
  <div>
    <van-form @submit="login" v-if="showForm">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import md5 from 'js-md5'
import Api from '@/api/login'
import { TOKEN } from '@/utils/constant'
import { setToken } from '@/utils/token'
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      showForm: process.env.NODE_ENV === 'development'
    }
  },
  mounted() {
  },
  methods: {
    async login() {
      const { username, password } = this
      if (!username || !password) {
        return
      }
      const params = {
        username,
        password: md5(password)
      }
      const result = await Api.testLogin(params)
      if (result.code === '200') {
        const token = {
          ...result.data
        }
        setToken(TOKEN, token)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  font-size: 28px;
  width: 100%;
  padding: 20px;
  // background: red;
}
</style>
