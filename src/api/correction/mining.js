import { _get, _post } from '@/axios/function'

const getData = 'industrialEnterpriseCheck/list'
const getDetail = 'industrialEnterpriseCheck/detail'
const postData = 'industrialEnterpriseCheck/createData'

export default {
  async getData({ keyword }) {
    return _get({
      url: getData,
      params: {
        keyword
      }
    })
  },
  async getDetail({ id }) {
    return _get({
      url: getDetail,
      params: {
        id
      }
    })
  },
  async postData(data) {
    return _post({
      url: postData,
      data
    })
  }
}
