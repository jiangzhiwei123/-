import mpx, { createStore } from '@mpxjs/core'
import Http from "../api/http"
import store from './general'

const state={
  code:'',
  token:wx.getStorageSync('token'),
  matchId:wx.getStorageSync('matchId')
}
const mutations= {
  upCode(state,t){
    state.code = t
  },
  // 更新token// 更新token
  updateToken(state, t) {
    state.token = t
    wx.setStorageSync('token', t)
  },
  // 更新matchid
  updateMatchId(state, t) {
    state.matchId = t
    wx.setStorageSync('matchId', t)
  },
}
const actions = {
  // 获取验证码
  async getCodeStore(context,tel){
    const res = await Http.get({
      url : `/sms/send/${tel}/0`,
    })
    context.commit('upCode',res)
  },
  // 用户登录
  async loginEvent({commit} ,{ username, password,code}){
    console.log(77777888,username)
    console.log(77777888,password)
    // const code = (await wx.login()).code
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId 
    //   }
    // })
    console.log(565656565,code)
    const res = await Http.post({
      url : `/matchmaker/login`,
      data:{
        username,
        password,
        code
      }
    })
    if(res.data.code=='02'){
        wx.showModal({
          title: '提示',
          content: '密码或用户名错误',
          showCancel:false
        })
    }else{
      commit('updateToken',res.data.rows.accessTokenSession)
      commit('updateMatchId',res.data.rows.id)
      console.log(77777888,res)
      wx.redirectTo({
        url: '../pages/index'
      })
    } 
  },
  // 保存用户信息
  async getCodeStore(context,tel){
    const res = await Http.get({
      url : `/sms/send/${tel}/0`,
    })
    context.commit('upCode',res)
  },
  async changeInforma(context, { name, sex, birthday , idNumber , phone  , wehcart ,qqNumber , monthlyIncomde , height , educational }) {
    const res = await Http.post({
      // url: `/saveunderlinember/${name}&${sex}&${birthday}&${idNumber}&${phone}&${qqNumber}&${wehcart}&${monthlyIncomde}&${height}&${educational}`
      url: `/matchmaker/saveunderlinember`,
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded'
      // },
      data: {
        name,
        sex,
        birthday,
        idNumber,
        phone,
        qqNumber,
        wehcart,
        monthlyIncomde,
        height,
        educational
      }
    })
    console.log(11111111111111111, res)
  }
  // const res = await Http.get({ url: '/notice/loadNewNotice' })
  // async changeCollect(context) {
  //     await Http.get({
  //       url: `/notice/loadNewNotice`,
  //       success:res=>{
  //         console.log(5678,res)
  //       }
  //     })
  //     console.log(2222222222222222)
  // }
}
// store.state.token = wx.getStorageSync('token')
export default {
  actions,
  mutations,
  state
}
