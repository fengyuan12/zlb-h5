import _axios from './index'
// import { getToken } from '@/utils/token'

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export const _post = ({ url, params = {}, data }) => {
  return new Promise((resolve, reject) => {
    _axios
      .post(url, data, {
        params
      })
      .then(response => {
        return resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const _put = ({ url, params = {}, data }) => {
  return new Promise((resolve, reject) => {
    _axios
      .put(url, data)
      .then(response => {
        return resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const _postJson = ({ url, params = {}, data }) => {
  return new Promise((resolve, reject) => {
    _axios({
      method: 'post',
      url: url,
      data: JSON.String(data)
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const _get = ({ url, params = {}}) => {
  return new Promise((resolve, reject) => {
    _axios
      .get(url, {
        params
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const _delete = ({ url, params }) => {
  return new Promise((resolve, reject) => {
    _axios
      .delete(url, params)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * 二进制后台下载文件方法
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} fileName [下载文件名]
 */
export const _download = (url, params, fileName = {}) => {
  return new Promise((resolve, reject) => {
    _axios
      .post(url, params, {
        responseType: 'blob' // 表明返回服务器返回的数据类型
      })
      .then(response => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'
        })
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName)
        } else {
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          // 释放内存
          window.URL.revokeObjectURL(link.href)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const _upload = ({ url, data }) => {
  const formData = new FormData()
  formData.append('files', data)
  return new Promise((resolve, reject) => {
    _axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      resolve(response)
    })
      .catch(error => {
        reject(error)
      })
  })
}

