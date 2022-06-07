/**
 * 用于表单校验email
 * @param rule
 * @param value
 * @param callback
 */
export const checkEmail = (rule, value, callback) => {
  const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  if (value) {
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    }, 100)
  } else {
    callback()
  }
}

/**
 * 用于表单校验手机号
 * @param rule
 * @param value
 * @param callback
 */
export const checkPhone = (rule, value, callback) => {
  const phoneReg = /^(\+\d+)?1[345789]\d{9}$/
  const testFixedPhone1 = /^(\d{7,8})(-(\d{3,}))?$/
  const testFixedPhone2 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
  if (value) {
    setTimeout(() => {
      // if (!Number.isInteger(+value)) {
      //     callback(new Error('请输入数字值'))
      // } else {
      if (phoneReg.test(value) || testFixedPhone1.test(value) || testFixedPhone2.test(value)) {
        callback()
      } else {
        callback(new Error('电话号码格式不正确'))
      }
      // }
    }, 100)
  } else if (!rule.required) {
    callback()
  } else {
    callback(new Error('请输入电话号码'))
  }
}

/**
 * 用于表单校验座机号码
 * @param rule
 * @param value
 * @param callback
 */
export const checkFixedPhone = (rule, value, callback) => {
  // const phoneReg = /^1[3|4|5|7|8|9][0-9]{9}$/
  const testFixedPhone1 = /^(\d{7,8})(-(\d{3,}))?$/
  const testFixedPhone2 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
  if (value) {
    setTimeout(() => {
      if (testFixedPhone1.test(value) || testFixedPhone2.test(value)) {
        callback()
      } else {
        callback(new Error('座机号码格式不正确'))
      }
    }, 100)
  } else {
    callback()
  }
}
/**
 * 用于表单校验整数
 * @param rule
 * @param value
 * @param callback
 */
export const checkNumber = (rule, value, callback) => {
  const mailReg = /^[1-9]([0-9])*$/
  // console.log(value)
  if (value) {
    // console.log(mailReg.test(value))
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正整数！'))
      }
    }, 100)
  } else {
    callback(new Error('请输入延期时间'))
  }
}

/**
 * 用于表单校验整数
 * @param rule
 * @param value
 * @param callback
 */
export const checkNumbers = (rule, value, callback) => {
  const mailReg = /^[1-9]([0-9])*$/
  // console.log(value)
  if (value) {
    // console.log(mailReg.test(value))
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正整数！'))
      }
    }, 100)
  } else {
    callback(new Error('请输入解决时限'))
  }
}

/**
 * 用于表单校验用户名
 * @param rule
 * @param value
 * @param callback
 */
export const checkUserName = (rule, value, callback) => {
  const mailReg = /[\u4E00-\u9FA5]/g
  if (value) {
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback(new Error('不能输入汉字！'))
      } else if (value.length < 6) {
        callback(new Error('请输入6位以上'))
      } else {
        callback()
      }
    }, 100)
  } else {
    callback()
  }
}

/**
 * 用于表单校验手机号
 * @param rule
 * @param value
 * @param callback
 */
export const checkMobilePhone = (rule, value, callback) => {
  const phoneReg = /^(\+\d+)?1[345789]\d{9}$/
  const testFixedPhone1 = /^(\d{7,8})(-(\d{3,}))?$/
  const testFixedPhone2 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
  if (value) {
    setTimeout(() => {
      if (phoneReg.test(value) || testFixedPhone1.test(value) || testFixedPhone2.test(value)) {
        callback()
      } else {
        callback(new Error('电话号码格式不正确'))
      }
    }, 100)
  } else {
    callback()
  }
}

/**
 * 校验输入不为空
 * @param {String} str
 */

export const checkEmpty = (str) => {
  if (str === '') return true
  const reg = /^[ ]+$/g
  if (reg.test(str)) {
    return true
  } else {
    return false
  }
}
