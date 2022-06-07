import { _get, _post, _put } from '@/axios/function'

const getData = 'ecotopeStarRating/list'
const getDetail = 'ecotopeStarRating/detail'
const postData = 'ecotopeStarScore/save'
const putData = 'ecotopeStarScore/update'

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
  },
  async putData(data) {
    return _put({
      url: putData,
      data
    })
  }
}
