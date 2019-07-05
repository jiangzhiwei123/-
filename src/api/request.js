// var Promise = require('./es6-promise.min.js')
import generalStore from '../store/general'
const base = 'http://101.200.63.32:8082/'


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

