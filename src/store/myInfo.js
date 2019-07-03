import mpx, { createStore } from '@mpxjs/core'
import Http from "../api/http"
import user from "./user"


  const state={
    ...user.state,
    // 提现列表
    cashList:[],
    // 分销佣金数据
    fenXiao:[],
    // 我的佣金
    myMoneyData:[],
    // 提现明细数据
    txData:[]
  }
  const mutations= {
    // 更新cashList
    updatePerson(state,t){
      state.cashList=t
    },
    // 分销佣金数据
    updateCash(state,t){
      state.fenXiao=t
    },
    // 我的佣金数据
    updateMyMoney(state,t){
      state.myMoneyData=t
    },
    // 用户提现明细的数据
    updateTiXian(state,t){
      state.txData=t
    }

  }
  const getters = {}
  const actions = {
    // 查看红娘用户信息
    async getInformation(context){
      const res = await Http.get({
        url:`/matchmaker/getMatchGai/${wx.getStorageSync('matchId')}`,
      })
      context.commit('updatePerson',res.data.rows)
      // console.log(66666666,res)
      console.log(66666666,res.data.rows)
    },
    // 查询分销佣金明细
    async getFenxiao(context){
      const res = await Http.get({
        url:`/matchmaker/myDistributionBrokerages/${wx.getStorageSync('matchId')}`,
      })
      context.commit('updateCash',res.data)
      console.log(5555555555555555555,res.data)
      // console.log(66666666,res.data.rows)
    },
    // 查询我的佣金明细
    // http://101.200.63.32:8082/matchmaker/myBrokerages/{matchId} GET
    // url: headPath + "/matchmaker/myBrokerages/" + matchId,
    async getInfo(context){
      const res = await Http.get({
        url:`/matchmaker/myBrokerages/${wx.getStorageSync('matchId')}`,
      })
      context.commit('updateMyMoney',res.data.rows)
      console.log(99999999999999,res)
      console.log(999999999999,res.data.rows)
    },
    // 查询我的提现明细
    async getCashDetail(context){
      const res = await Http.get({
        url:`/matchmaker/putDetail/${wx.getStorageSync('matchId')}`,
      })
      context.commit('updateTiXian',res.data)
      console.log(321321321,res.data)
    },
    // 查询我的客户的信息
    // async getCustom(context){
    //   const res = await Http.get({
    //     url:`/matchmaker/putDetail/${wx.getStorageSync('matchId')}`,
    //   })
    //   console.log(55555555,res)
    // },

    // 支付接口
    async takeMoney(context){
      const res = await Http.get({
        url:`/matchmaker/payment/pay/putforward`
      })
      console.log(3333333,res)
    },
    // async getCodeStore(context,tel){
    //   const res = await Http.get({
    //     url : `/sms/send/${tel}/0`,
    //   })
    //   context.commit('upCode',res)
    // }
  }
export default {
  actions,
  mutations,
  state
}
