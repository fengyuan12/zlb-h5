import { _get } from '@/axios/function'

const getData = 'safetyStarRating/list'
const getDetail = 'safetyStarRating/detail'

export default {
  async getData({ keyword }) {
    return _get({
      url: getData,
      params: {
        keyword
      }
    })
  },
  async getDetail({ id, type }) {
    return _get({
      url: getDetail,
      params: {
        id,
        type
      }
    })
  }
}
