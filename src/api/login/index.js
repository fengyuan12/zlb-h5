import { _post } from '@/axios/function'

const postMobile = 'enterprise/zlbLogin'

export default {
  async postMobile({ ticket }) {
    return _post({
      url: postMobile,
      params: {
        ticket
      }
    })
  }
}
