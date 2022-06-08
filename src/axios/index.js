'use strict'
import Vue from 'vue'
import axios from 'axios'
import config from './config'
import router from '@/router'
import { Toast } from 'vant';
// import { getToken } from '@/utils/token'

Vue.use(router)

// 加密开关
const _axios = axios.create(config)

const handleError = (res) => {
  const { status } = res
  if (status === 401) {
    Toast.fail('token已过期')
    router.push({ path: '/login' })
  }
}

// http request 拦截器
_axios.interceptors.request.use(
  config => {
    config.headers.Authriozation = '22ce385110a24c5c9cd686e3f7214a82'
    config.headers.userId = 22
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

_axios.interceptors.response.use(
  response => {
    // 二进制下载处理
    if (response.config.responseType === 'blob' && response.status === 200) {
      return Promise.resolve(response)
    }
    const star = response.config.url.lastIndexOf('/')
    const end = response.config.url.length
    const urls = response.config.url.substring(star, end)
    if (urls === 'serverconfig.json') {
      return Promise.resolve(response.data)
    }
      // 拦截响应，做统一处理 根据后端具体返回的状态码进行修改调整
    const { code, message } = response.data
      if (code || code === 0) {
        switch (code) {
          case '200':
            return response.data
          default:
            Toast.fail(message)
        }
      }
  },
  // 接口错误状态处理，也就是说无响应时的处理
  error => {
    handleError(error.response)
    return error.response.data
  }
)

export default _axios
