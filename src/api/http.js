import mpx from '@mpxjs/core'
import mpxFetch from '@mpxjs/fetch'
import generalStore from '../store/general'

mpx.use(mpxFetch)

const safeRedirect = (url = '/pages/login') => {
  const stack = getCurrentPages() // eslint-disable-line
  if (stack[stack.length - 1] === url) return
  wx.redirectTo({ url })
}
// const baseUrl  发起请求
mpx.xfetch.interceptors.request.use(function (config) {
  // 如果传入的请求是不带域名的话则加上域名以防万一
  // let base = 'https://cl.lailaihunlian.com'
  let base = 'http://101.200.63.32:8082'
  if (config.url[0] === '/') {
    config.url = base + config.url
  }
  // Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
  config.header = Object.assign({
    'xaccesstokensession': generalStore.state.token,
    'Content-Type': 'application/json; charset=utf-8'
  }, config.header)
  //   也可以返回 pr om is e
  // console.log(config)
  return config
})
// 请求响应结束
mpx.xfetch.interceptors.response.use(function(res) {
  console.log(res)
  // 也可以返回promise
  if (res.data.code === '0003') {
    // wx.showToast({ title: '未知错误', icon: 'none' })
    wx.reLaunch({ url: '../pages/login' })
    return
  }
  return res
})

export default class Http {
  static async request(method = 'GET', url, header = {}, data = {}) {
    const options = {
      url,
      method,
      data,
      header
    }

    let res = await mpx.xfetch.fetch(options)
    /**
     * @const loginRequired
     * @type {number[]}
     * @description 需要登录的code
     */
    const loginRequired = [1006, 10004, 10005, 10001]

    if (loginRequired.indexOf(res.data.code) >= 0) {
      console.log(789789789789)
      /**
       * 如果在loginRequired找到res.status，说明需要登录
       * 那么就登录后再重新发出请求
       * 因为Object是引用类型
       * 所以要先delete options.header.Authorization 删除header中老的token
       */
      await generalStore.dispatch('fetchToken')
      delete options.header.Authorization
      res = await mpx.xfetch.fetch(options)
    }
    // console.log(978658970, res)
    return res
  }

  static get({ url, header = {}, data = {} }) {
    return this.request('GET', url, header, data)
  }

  static put({ url, header = {}, data = {} }) {
    return this.request('PUT', url, header, data)
  }

  static post({ url, header = {}, data = {} }) {
    return this.request('POST', url, header, data)
  }

  static patch({ url, header = {}, data = {} }) {
    return this.request('PATCH', url, header, data)
  }

  static delete({ url, header = {}, data = {} }) {
    return this.request('DELETE', url, header, data)
  }
}
