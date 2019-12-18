//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    iptname: "请输入"
  },
  Jump: function () {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res.result.split("="))
 
        if (res.result.split("=").length>1){
          app.globalData.meetingid = res.result.split("=")[1]
        }else{
          app.globalData.meetingid = res.result.split("=")[0]
        }
      
          wx.navigateTo({
            url: '../index/index?model=' + app.globalData.meetingid,
          })
      }
    })
  },
  onLoad: function () {
    wx.login({
      success: function (res) {
        console.log(res.code)
        wx.request({
          //获取openid接口  
          url: app.globalData.appGet + '/wx/wxqymettinginfo?code=' + res.code,
          method: 'GET',
          success: function (res) {
            console.log(JSON.parse(res.data).openid)
            app.globalData.openid = JSON.parse(res.data).openid
            console.log(app.globalData.openid)
          
          }
        })
      }
    })
  }
})
