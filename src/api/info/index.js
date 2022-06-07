import { _get, _put } from '@/axios/function'

const getData = 'remind/list'
const getDetail = 'remind/getDetail' // 查看详细
const putDetail = 'remind/update' // 一键清除
const getUnreadMessage = 'remind/getUnreadMessage' // 获取消息是否有未读消息

export default {
  async getData({ remind }) {
    return _get({
      url: getData,
      params: {
        remind
      }
    })
  },
  async getDetail({ id, relevanceId, type }) {
    return _get({
      url: getDetail,
      params: {
        id,
        relevanceId,
        type
      }
    })
  },
  async putDetail(data) {
    return _put({
      url: putDetail,
      data
    })
  },
  async getUnreadMessage() {
    return _get({
      url: getUnreadMessage
    })
  }
}
