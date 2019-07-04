import mpx, { createStore } from '@mpxjs/core'
import Http from "../api/http"
import store from './general'

const state={
  // 当前页数
  page:1,
  // 顾客列表信息
  gkList:[]
}
const mutations= {
  // 更新页数
  updatePic(state,p){
    state.page += p
  },
  // 更新顾客列表
  updateGkList(state,t){
    state.gkList = t
  },
  // 清空列表
  clearGkList(state){
    state.gkList=[]
  },
  // 页码重置
  clearPage(state){
    state.page=1
  }
}
const actions = {
    // 我的客户列表信息
    async takeGkList({state,commit},{like_customerName,matchId,pageSize ,pageNo}){
      const res = await Http.post({
        url:`/matchmaker/myCustomers`,
        // http://101.200.63.32:8082/matchmaker/pay/putforward 
        data:{
          parameters:{
            like_customerName,
            matchId
          },
          page:{
            pageSize,
            pageNo
          } 
        }
      })
      commit('updateGkList',state.gkList.concat(res.data.rows))
      console.log(147258369,res.data.rows)
    }
  
}
// store.state.token = wx.getStorageSync('token')
export default {
  actions,
  mutations,
  state
}
