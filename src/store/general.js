import mpx, { createStore } from '@mpxjs/core'
import Http from "../api/http"

const store = createStore({
  state: {
  },
  mutations: {
  },
  getters: {},
  actions: {
    // const res = await Http.get({ url: '/notice/loadNewNotice' })
    async changeCollect(context) {
        await Http.get({
          url: `/notice/loadNewNotice`,
          success:res=>{
            console.log(5678,res)
          }
        })
        console.log(2222222222222222)
    }
  }
})
// store.state.token = wx.getStorageSync('token')
export default store
