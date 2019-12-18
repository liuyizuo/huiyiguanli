//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {
      avatarUrl: "../../img/44445.png"
    },
    Name: "",
    Unit: "",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (e) {

    var _this = this
    wx.request({
      //获取openid接口  
      url: app.globalData.appGet + '/meeting/persons?openid=' + app.globalData.openid,
      method: 'GET',
      success: function (res) {
        console.log(res.data[0])
        _this.setData({
          Name: res.data[0].Name,
          Unit: res.data[0].Unit,
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  edit: function () {
    let resuit = 1
    wx.navigateTo({
      url: '../details/Details?model=' + resuit,
    })
  },
  tiaozhuan: function () {
    wx.navigateTo({
      url: '../huiyi/huiyi',
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow: function () {
    var _this = this
    wx.request({
      //获取openid接口  
      url: app.globalData.appGet + '/meeting/persons?openid=' + app.globalData.openid,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        _this.setData({
          Name: res.data[0].Name,
          Unit: res.data[0].Unit,
        })
      }
    })
  }
})
