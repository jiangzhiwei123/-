import mpx, { createStore } from '@mpxjs/core'
import Http from "../api/http"
import user from './user'
import myInfo from './myInfo'
import active from './active'

const store = createStore({
  state: {
    ...user.state,
    ...active.state,
    ...myInfo.state
  },
  mutations: {
    ...user.mutations,
    ...active.mutations,
    ...myInfo.mutations
  },
  getters: {},
  actions: {
    ...user.actions,
    ...active.actions,
    ...myInfo.actions
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
})
// store.state.token = wx.getStorageSync('token')
export default store
