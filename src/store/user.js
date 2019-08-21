import mpx, { createStore } from '@mpxjs/core'
import Http from "../api/http"
import store from './general'

const state={
  code:'',
  token:wx.getStorageSync('token'),
  matchId:wx.getStorageSync('matchId'),
  // 红娘名字
  hnName:'',
  // 红娘电话
  hnTel:'',
  // 红娘微信
  hnWx:'',
  BDCode:'',
  // 是否绑定成功的状态
  isBind:'',
  // 更新unionid
  unionData:'',
  OpenData:''
}
const mutations= {
  updateUn(state,t){
    state.OpenData=t
    wx.setStorageSync("oId",t)
  },
  updateOpen(state,t){
    state.unionData=t
    wx.setStorageSync("uId",t)
  },
  updateBind(state,t){
    state.isBind=t
  },
  updatecode(state,t){
    state.BDCode=t
  },
  // 更新红娘姓名
  upName(state,t){
    state.hnName = t
  },
  // 更新dianhua
  upTel(state,t){
    state.hnTel = t
  },
  // 更新weixin 
  upWx(state,t){
    state.hnWx = t
  },
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
  // http://localhost:8082/xcx/matcher//bindMember
  // 绑定手机号"openId": "xxx",
  async bindNumber({commit} ,{openId,code,userName,unionId,wechatLogo,nickName}){
    const res = await Http.post({
      url : `/xcx/matcher/bindMember`,
      data:{
        openId,
        code,
        userName,
        unionId,
        wechatLogo,
        nickName
      }
    })
    if(res.data.rows.authorize){
      console.log("你爸爸的")
      commit('updateBind',res.data.rows.authorize)
    }
      console.log(88866666,res)
  },
  // 用户根据openid登录
  async loginEventSec({commit} ,openId){
    const res = await Http.post({
      // http://localhost:8082
      url : `/xcx/matcher/loginByOpendId`,
      data:{
          "openId":openId
      }
    })
      console.log(51515151,res)
  },
  // 获取unionid
  async getUnionid({commit,state} ,{code,encryptedData,iv}){
    const res = await Http.post({
      // http://localhost:8082
      url : `/xcx/matcher/getXcxOpenId`,
      data:{
          code,
          encryptedData,
          iv
      }
    })
    await commit('updateUn',res.data.rows.unionId)
    await commit('updateOpen',res.data.rows.openId)
    console.log(777744444777,res)
    console.log(777744444777,state.unionData)
    console.log(777744444777,state.OpenData)
    console.log(777744444777,res.data.rows.openId)
  },
  // 保存用户信息
  async getCodeStore(context,tel){
    const res = await Http.get({
      url : `/sms/send/${tel}/0`,
    })
    context.commit('upCode',res)
  },
  // 提交线下信息
  async changeInforma(context, { name, sex, birthday , idNumber , phone  , wehcart ,qqNumber , monthlyIncomde , height , educational }) {
    const res = await Http.post({
      // url: `/saveunderlinember/${name}&${sex}&${birthday}&${idNumber}&${phone}&${qqNumber}&${wehcart}&${monthlyIncomde}&${height}&${educational}`
      url: `/matchmaker/saveunderlinember`,
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
    if(res.data.code=="01"){
      wx.showModal({
        title: '提示',
        content: '保存成功',
        showCancel:false,
        success (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          }else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    console.log(11111111111111111, res)
  },
  // 完善红娘信息
  async updateHn({commit},{nickName,matchmakerTel,wechartAccount,province,city}){
    const res = await Http.post({
      url : `/matchmaker/upMatchBasic`,
      data:{
        nickName,
        matchmakerTel,
        wechartAccount,
        province,
        city
      }
    })
    // context.commit('upCode',res)
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
