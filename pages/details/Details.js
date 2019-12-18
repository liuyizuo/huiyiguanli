// pages/details/Details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iptnamu: "",
    iptphone: "",
    iptSex: "",
    iptunit: "",
    iptPosition: "",
    model: "",
    selectShow: false,
  },
  iptnamu: function (e) {
    this.data.iptnamu = e.detail.value
  },
  iptphone: function (e) {
    this.data.iptphone = e.detail.value
  },
  iptSex: function (e) {
    this.data.iptSex = e.detail.value
  },
  iptunit: function (e) {
    this.data.iptunit = e.detail.value
  },
  iptPosition: function (e) {
    this.data.iptPosition = e.detail.value
  },
  click_set: function () {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },
  click_man: function () {
    this.setData({
      iptSex: "男",
      selectShow: !this.data.selectShow
    });
  },
  click_wumne: function () {
    this.setData({
      iptSex: "女",
      selectShow: !this.data.selectShow
    });
  },
  click_baocun: function () {

    var _this = this
    if (this.data.iptPosition != "" && this.data.iptSex != "" && this.data.iptnamu != "" && this.data.iptphone != "" && this.data.iptunit != "") {
      if (_this.data.model == 1) {
        var theway = "PUT"
      } else {
        var theway = "POST"
      }
      wx.request({
        //获取openid接口  
        url: app.globalData.appGet + '/meeting/person',
        data: {
          Duty: this.data.iptPosition,//职务
          Gender: this.data.iptSex,//性别
          Name: this.data.iptnamu,//姓名
          OpenID: app.globalData.openid,//微信OPENID
          Phone: this.data.iptphone,//电话
          Unit: this.data.iptunit//单位
        },
        method: theway,
        success: function (res) {
          console.log(res)
          if (res.data.code == 1) {
            if (_this.data.model == 1) {
              wx.showToast({
                title: '修改成功',
                icon: 'succes',
                duration: 1000,
                mask: true
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '../mide/mede'
                })
              }, 800)

            } else {
              wx.showToast({
                title: '绑定成功',
                icon: 'succes',
                duration: 1000,
                mask: true
              })
              setTimeout(function () {
                wx.navigateTo({
                  url: '../index/index?model=' + app.globalData.meetingid,
                })
              }, 800)
            }
          } else if (res.data.code == 2) {
            wx.showToast({
              title: '已绑定',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
          } else {
            wx.showToast({
              title: '绑定失败',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '个人信息不全',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.model = options.model;
    var _this = this
    wx.request({
      //获取openid接口  
      url: app.globalData.appGet + '/meeting/persons?openid=' + app.globalData.openid,
      method: 'GET',
      success: function (res) {
        console.log(res)
        _this.setData({
          iptnamu: res.data[0].Name,
          iptphone: res.data[0].Phone,
          iptSex: res.data[0].Gender,
          iptunit: res.data[0].Unit,
          iptPosition: res.data[0].Duty,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})