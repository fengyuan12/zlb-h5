import Cookies from 'js-cookie'
import { TOKEN } from '@/utils/constant'

export function getToken(key = TOKEN) {
  const result = Cookies.get(key)
  return result ? JSON.parse(result) : null
}

/**
 * js-cookie 未设置过期时间，默认情况下cookie有效期截止至用户退出浏览器。
 * @param token 设置的token
 * @returns {*}
 */
export function setToken(key, value) {
  return Cookies.set(key, value ? JSON.stringify(value) : '')
}

export function removeToken(key = TOKEN) {
  return Cookies.remove(key)
}

/**
 * 截取jwttoken中段信息，转换为json数据
 * @param token
 * @return {*}
 */
export function getDataFromJwtToken(key) {
  const token = Cookies.get(key)
  if (!token) {
    return null
  }
  var data = token.split('.')[1]
  if (!data) {
    return null
  }
  const Base64 = require('js-base64').Base64
  return JSON.parse(Base64.decode(data))
}

/**
 * 判断过期时间
 * @returns {boolean}
 */
export function isTokenExpired() {
  const tokenObj = getDataFromJwtToken()
  const currentTime = new Date().getTime() / 1000
  return tokenObj && currentTime > tokenObj.exp
}

// 续期
export function isRenewalToken() {
  const tokenObj = getDataFromJwtToken()
  let currentTime = new Date().getTime() / 1000
  if (currentTime < tokenObj.exp) {
    currentTime += 10 * 60
    return tokenObj && currentTime > tokenObj.exp
  } else {
    return false
  }
}
