import Vue from 'vue'
/*
* @desc     去除空格
* @param    str 字符串
* @return   {Boolean}
*/
export function cutSpace(str) {
  const tag = str.replace(/(^\s*)|(\s*$)/g, '')
  return tag
}

/*
* 用来截取区域最后一级
* */
export function lastAreaName(areaName) {
  if (areaName.indexOf('-') !== -1) {
    const str = areaName.split('-')
    return str[str.length - 1]
  } else {
    return areaName
  }
}

// 随机获取sm4加密秘钥
export function rstr(name) {
  const sm3 = require('sm-crypto').sm3
  const $chars = sm3(Date.parse(new Date()) + name) // 杂凑
  const maxPos = $chars.length
  let str = ''
  for (let i = 0; i < 16; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str
}

// sm4加密
export function sm4_encryption(params) {
  if (!new Vue().$configApiUrl.VUE_APP_IS_ENCRYPT) {
    return params
  }

  const SM4 = require('gm-crypt').sm4
  const sm4Config = {
    // 配置sm4参数
    key: localStorage.getItem('sec'), // 这里这个key值是跟后端要的
    mode: 'ecb', // 加密的方式有两种，ecb和cbc两种，也是看后端如何定义的，不过要是cbc的话下面还要加一个iv的参数，ecb不用
    cipherType: 'base64' //
  }

  const sm4 = new SM4(sm4Config)// 这里new一个函数，将上面的sm4Config作为参数传递进去。然后就可以开心的加密了
  const Account = sm4.encrypt(JSON.stringify(params)) // 账号加密
  const data = {
    data: Account
  }
  return data
}

// 判断PC还是手机端
export function os() {
  var ua = navigator.userAgent
  var isWindowsPhone = /(?:Windows Phone)/.test(ua)
  var isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  var isAndroid = /(?:Android)/.test(ua)
  var isFireFox = /(?:Firefox)/.test(ua)
  // var isChrome = /(?:Chrome|CriOS)/.test(ua)
  var isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
  var isPhone = /(?:iPhone)/.test(ua) && !isTablet
  var isPc = !isPhone && !isAndroid && !isSymbian
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  }
}
// 获取子应用dom节点
// export function getSubDom() {
//   if (window.__POWERED_BY_QIANKUN__) {
//     const appDocument = window.document.querySelector('#subapp-viewport')
//     return appDocument.children[0].shadowRoot
//   } else {
//     return window.document
//   }
// }
// if(os.isAndroid || os.isPhone) {
//   alert("手机")
// } else if(os.isTablet) {
//   alert("平板")
// } else if(os.isPc) {
//   alert("电脑")
// }
