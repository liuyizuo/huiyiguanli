//index.js
//获取应用实例
// pages/map.js
var app = getApp();
const APP_ID = 'wx0ebb7e663f116338';//输入小程序appid  
const APP_SECRET = '2ee0d7a3c918fc04127384c8c1c146d5';//输入小程序app_secret 
Page({
  data: {
    hang: "2",
    longitude: '',
    latitude: '',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: "",
    meetingid: "",
    meetingNamu: "无信息",
    meetingTime: "无信息",
    endTime: "无信息",
    meetingMap: "无信息",
    meetingDetails: "无信息",
    meetingContact: "无信息",
    meetingphone: "无信息",
    hangtype: true,
    Persons: {},
    latitude: "",//纬度 
    longitude: "",//经度 
    markers: [{
      id: 0,
      iconPath: "",
      latitude: "",
      longitude: "",
      width: 50,
      height: 50
    }]
  },
  //事件处理函数

  onLoad: function (options) {
    console.log(options)
    if (options.q != null) {
      options.model = options.q.split("%")[6].substr(2)
    }
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        _this.setData({
          latitude: latitude,//纬度 
          longitude: longitude,//经度 

        })
        
      }
    })
    console.log(app.globalData.appGet)
    app.globalData.meetingid = options.model
    this.data.meetingid = options.model
    wx.request({
      url: app.globalData.appGet + '/meeting/meeting/' + _this.data.meetingid,
      method: 'GET',
      success: function (res) {
        if (res.data.MeetingName == null) {
          res.data.MeetingName = "无信息"
        }
        if (res.data.CreateTime == null) {
          res.data.CreateTime = "无信息"
        }
        if (res.data.EndTime == null) {
          res.data.EndTime = "无信息"
        }
        if (res.data.Location == null) {
          res.data.Location = "无信息"
        }
        if (res.data.MeetingTheme == null) {
          res.data.MeetingTheme = "无信息"
        }
        if (res.data.Contacter == null) {
          res.data.MeetingName = "无信息"
        }
        if (res.data.Contacter == null) {
          res.data.MeetingName = "无信息"
        }
        if (res.data.Phone == null) {
          res.data.MeetingName = "无信息"
        }

        console.log(res)
        _this.setData({
          meetingNamu: res.data.MeetingName,
          meetingTime: res.data.CreateTime,
          endTime: res.data.EndTime,
          meetingMap: res.data.Location,
          meetingDetails: res.data.MeetingTheme,
          longitude: res.data.X,
          latitude: res.data.Y,
          meetingContact: res.data.Contacter,
          meetingphone: res.data.Phone,
          Img: res.data.QRCode,
          Persons: res.data.Persons,
          markers: [{
            latitude: res.data.Y,
            longitude: res.data.X,
          }]
        })
      }
    })
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
            _this.setData({
              openid: JSON.parse(res.data).openid
            })
          }
        })
      }
    })
  },
  a1: function () {

    var model = JSON.stringify(this.data.markers)
    wx.navigateTo({
      url: '../img/img?model=' + model,
    })
  },
  zhankai: function () {
    if (this.data.hangtype == true) {
      this.setData({
        hang: 99,
      })
      this.data.hangtype = false;
    } else {
      this.setData({
        hang: 2,
      })
      this.data.hangtype = true
    }

  },
  click_Check: function () {
    var n = new Date()
    if (new Date(this.data.endTime) - new Date() < 0) {
      wx.showToast({
        title: '会议已结束',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    } else {
      var _this = this
      wx.request({
        url: app.globalData.appGet + '/meeting/persons?openid=' + app.globalData.openid,
        method: 'GET',
        success: function (res) {
          console.log(res)
          if (res.data.length == 0) {
            wx.navigateTo({
              url: '../details/Details'
            })
          } else {
            wx.request({

              url: app.globalData.appGet + '/meeting/meetingcheck',
              data: {
                MeetingID: _this.data.meetingid,
                OpenID: _this.data.openid,
                PersonID: "",
                X: _this.data.longitude,
                Y: _this.data.latitude,
              },

              method: 'POST',
              success: function (res) {
                console.log(_this.data.longitude)
                console.log(_this.data.latitude)
                console.log(res)
                if (res.data.code == 0) {
                  wx.showToast({
                    title: '请在会议地点进行会议签到!',
                    icon: 'none',
                    duration: 1000,
                    mask: true
                  })
                } else if (res.data.code == 2) {
                  wx.showToast({
                    title: '已签到',
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                  })
                } else {
                  wx.showToast({
                    title: '签到成功',
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                  })
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../logs/logs',
                    })
                  }, 1000)
                }
              }



            })
          }
        }
      })
    }
  },
  chakan: function () {
    var _this = this
    var model = JSON.stringify(_this.data.Persons)
    wx.navigateTo({
      url: '../taiozhuan/tiaozhuan?model=' + model,
    })
  },
  erweima: function (e) {
    var imgArr = [];
    imgArr.push(this.data.Img);
    wx.previewImage({
      current: imgArr[0],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
})
