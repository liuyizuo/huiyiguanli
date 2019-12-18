const app = getApp()
var util = require('../../utils/util.js');
const date = new Date()
const nowYear = date.getFullYear()
const nowMonth = date.getMonth() + 1
const nowDay = date.getDate()
let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// 根据年月获取当月的总天数
let getDays = function (year, month) {
  if (month === 2) {
    return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
  } else {
    return daysInMonth[month - 1]
  }
}
// 根据年月日设置当前月有多少天 并更新年月日数组
let setDate = function (year, month, day, _this) {
  let daysNum = year === nowYear && month === nowMonth ? nowDay : getDays(year, month)
  day = day > daysNum ? 1 : day
  let monthsNum = year === nowYear ? nowMonth : 12
  let years = []
  let months = []
  let days = []
  let yearIndex = 9999
  let monthIndex = 0
  let dayIndex = 0
  // 重新设置年份列表
  for (let i = 1990; i <= nowYear; i++) {
    years.push(i)
  }
  years.map((v, idx) => {
    if (v === year) {
      yearIndex = idx
    }
  })
  // 重新设置月份列表
  for (let i = 1; i <= monthsNum; i++) {
    var k = i;
    months.push(k)
  }
  months.map((v, idx) => {
    if (v === month) {
      monthIndex = idx
    }
  })
  // 重新设置日期列表
  for (let i = 1; i <= daysNum; i++) {
    var k = i;
    days.push(k)
  }
  days.map((v, idx) => {
    if (v === day) {
      dayIndex = idx
    }
  })

  _this.setData({
    //时间列表参数
    years: years,
    months: months,
    days: days,
    //选中的日期
    year: year,
    month: month,
    day: day,
    value: [yearIndex, monthIndex, dayIndex],
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    all: [],
    key: "999",
    inpval: "",
    //时间列表参数
    flag: false,
    years: [],
    months: [],
    days: [],
    //选中的日期
    year: nowYear,
    month: nowMonth,
    day: nowDay,
    value: [9999, 1, 1],
    typey: "",
    showModal: false,
    showModals: false
  },
  submit: function () {
    console.log()
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function () {

  },
  gos: function () {
    let _this = this;
    console.log(this.data.typey)
    let typeshi = this.data.year + "/" + this.data.month + "/" + this.data.day;
    console.log(typeshi)
    let a = "2019/9/23"
    console.log(new Date(a) - new Date(typeshi))
    let type = []
    for (let i = 0; i < _this.data.all.length; i++) {
      if (new Date(_this.data.all[i].CreateTime.split(" ")[0]) - new Date(_this.data.typey) >= 0) {
        if (new Date(_this.data.all[i].CreateTime.split(" ")[0]) - new Date(typeshi) <= 0) {
          type.push(_this.data.all[i])
        }
      }
    }
    this.setData({
      arr: type,
      showModals: false
    })
  },
  go: function () {
    this.data.typey = this.data.year + "/" + this.data.month + "/" + this.data.day
    this.setData({
      // arr: type,
      showModal: false,
      showModals: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setDate(this.data.year, this.data.month, this.data.day, this);
    var _this = this
    wx.request({
      //获取openid接口  
      url: app.globalData.appGet + '/meeting/meetings?openid=' + app.globalData.openid,
      method: 'GET',
      success: function (res) {
        var n = new Date()
        var time = util.formatTime(new Date());
        for (let i = 0; i < res.data.content.length; i++) {
          let type = util.formatTime(new Date(res.data.content[i].EndTime));
          if (type > time) {
            res.data.content[i].type = "正在进行",
              res.data.content[i].color = "#386df4"
          } else (
            res.data.content[i].type = "已结束",
            res.data.content[i].color = "#797979"
          )
        }

        console.log(res)
        _this.setData({
          arr: res.data.content,
          all: res.data.content,
        })
      }
    })
  },
  bindChange: function (e) {
    let val = e.detail.value
    setDate(this.data.years[val[0]], this.data.months[val[1]], this.data.days[val[2]], this)
  },
  iptval() {
    let value = this.data.inpval
    console.log(value)
    var mod = []
    for (let i = 0; i < this.data.all.length; i++) {
      if (this.data.all[i].MeetingName.indexOf(value) >= 0) {
        mod.push(this.data.all[i])
      }
    }
    this.setData({
      arr: mod
    })

  },
  iptname(e) {
    this.data.inpval = e.detail.value;
    let value = this.data.inpval
    console.log(value)
    var mod = []
    for (let i = 0; i < this.data.all.length; i++) {
      if (this.data.all[i].MeetingName.indexOf(value) >= 0) {
        mod.push(this.data.all[i])
      }
    }
    this.setData({
      arr: mod
    })

  },
  xiang_qing(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var resuit = this.data.arr[index].ID
    console.log(e.currentTarget.dataset.index)
    this.setData({
      key: e.currentTarget.dataset.index
    })
    wx.navigateTo({
      url: '../index/index?model=' + resuit,
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