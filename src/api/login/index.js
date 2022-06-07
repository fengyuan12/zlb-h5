import { _get, _post } from '@/axios/function'

const login = 'enterprise/openid?code={code}'
const postMobile = 'enterprise/mobile'

export default {
  async login({ code }) {
    return _get({
      url: login,
      params: {
        code
      }
    })
  },
  async postMobile(data) {
    return _post({
      url: postMobile,
      data
    })
  },
  async testLogin({ username, password }) {
    return _get({
      url: 'login/login',
      params: {
        username,
        password
      }
    })
  }
}
