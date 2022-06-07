import { _get, _post, _put } from '@/axios/function'

const postCule = 'clue/save'
const getAfterRectificationData = 'problem/searchD'
const getCorrectedData = 'problem/searchY'
const getProBlemDetail = 'problem/detail' // 线索库
const getProBlemRectificaton = 'problemRectification/detail' // 问题整改
const postProBlemRectificaton = 'problemRectification/save' // 问题整改新增
const putProBlemRectificaton = 'problemRectification/update' // 问题整改修改
const getProblemSuperviseFeedback = 'problemSuperviseFeedback/detail' // 问题督查
const getProblemConclude = 'problemConclude/detail' // 问题办结
const getUnitList = 'enterprise/list' // 获取单位列表

export default {
  async postCule(data) {
    return _post({
      url: postCule,
      data
    })
  },
  async getAfterRectificationData(data) {
    return _post({
      url: getAfterRectificationData,
      data
    })
  },
  async getCorrectedData(data) {
    return _post({
      url: getCorrectedData,
      data
    })
  },
  async getProBlemDetail({ id }) {
    return _get({
      url: getProBlemDetail,
      params: {
        id
      }
    })
  },
  async getProBlemRectificaton({ id }) {
    return _get({
      url: getProBlemRectificaton,
      params: {
        id
      }
    })
  },
  async postProBlemRectificaton(data) {
    return _post({
      url: postProBlemRectificaton,
      data
    })
  },
  async putProBlemRectificaton(data) {
    return _put({
      url: putProBlemRectificaton,
      data
    })
  },
  async getProblemSuperviseFeedback({ id }) {
    return _get({
      url: getProblemSuperviseFeedback,
      params: {
        id
      }
    })
  },
  async getProblemConclude({ id }) {
    return _get({
      url: getProblemConclude,
      params: {
        id
      }
    })
  },
  async getUnitList({ keywords }) {
    return _get({
      url: getUnitList,
      params: {
        keywords
      }
    })
  }
}
