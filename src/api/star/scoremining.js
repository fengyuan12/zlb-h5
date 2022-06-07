import { _post, _put } from '@/axios/function'
const postData = 'enterpriseSafetyScore/save'
const putData = 'enterpriseSafetyScore/update'

export default {
  async postData(data) {
    return _post({
      url: postData,
      data
    })
  },
  async putData(data) {
    return _put({
      url: putData,
      data
    })
  }
}
