import mpx from '@mpxjs/core'
import mpxFetch from '@mpxjs/fetch'
// import

mpx.use(mpxFetch)

const safeRedirect = (url = '/pages/login') => {
  const stack = getCurrentPages() // eslint-disable-line
  if (stack[stack.length - 1] === url) return
  wx.redirectTo({ url })
}
// const baseUrl  发起请求
mpx.xfetch.interceptors.request.use(function (config) {
  // 如果传入的请求是不带域名的话则加上域名以防万一
  let base = 'https://jxsk.juhi8.com/api/jxt'
  // let base = 'http://47.101.56.46:8080'
  if (config.url[0] === '/') {
    config.url = base + config.url
  }
  // Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
  // config.header = Object.assign({
  //   'Authorization': generalStore.state.token,
  //   'Content-Type': 'application/json; charset=utf-8'
  // }, config.header)
  //   也可以返回 pr om is e
  // console.log(config)
  return config
})
// 请求响应结束
// mpx.xfetch.interceptors.response.use(function (res) {
//   // console.group(res.requestConfig.method, res.requestConfig.url)
//   // console.log(res)
//   // console.groupEnd()
//   // 拦截测试
//   // if (res.requestConfig.search('loadAllLabel') >= 0) {
//   //   // 更新游客状态
//   //   generalStore.commit('updateUser', '游客')
//   //   return
//   // }
//   if (res.data.status === 1005) {
//     wx.showToast({ title: '未知错误', icon: 'none' })
//     return
//   }
//   // 用户未注册
//   // if (res.data.status === 10006) {
//   //   wx.reLaunch({ url: '../pages/regist' })
//   //   return res
//   // }
//   // 用户未注册
//   if (res.data.status === 10006) {
//     wx.reLaunch({ url: '/pages/login' })
//     return res
//   }
//   // 转发未完成
//   /**
//    * todo
//    * 后端解决后自测
//    */
//   // 未获取手机号
//   if (res.data.status === 10007) {
//     wx.reLaunch({ url: '/pages/getPhone' })
//     return res
//   }
//   // 未选择角色
//   if (res.data.status === 10008) {
//     wx.reLaunch({ url: '/pages/publish' })
//     return res
//   }
//   // 没有权限
//   // res.data.status === 10008
//   // if (res.data.status === 10008) {
//   //   generalStore.commit('updateUser', '游客')
//   //   wx.showModal({
//   //     title: '提示',
//   //     showCancel: false,
//   //     content: '必须先完善个人信息',
//   //     success(res) {
//   //       //  var _this=this
//   //       if (res.confirm) {
//   //         wx.switchTab({ url: '/pages/publish' })
//   //       }
//   //     }
//   //   })
//   //   return res
//   // }
//   // console.log('我打印的code' + res.data.data)

//   res.data.status = res.data.status || 0
//   return res.data
// })

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

    if (loginRequired.indexOf(res.status) >= 0) {
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
    console.log(978658970, res)
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
