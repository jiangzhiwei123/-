// var Promise = require('./es6-promise.min.js')
import generalStore from '../store/general'
const base = 'https://www.lailaihongniang.com/'


const http = function (url,data){
  var promise = new Promise((resolve, reject) => {
    wx.request({
      url: base + url,
      header: {
        "Content-Type": "application/json",
        "xaccesstokensession": generalStore.state.token
      },
      method: 'POST',
      data: data,
      success: function (res) {
        resolve(res);
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
export default http

