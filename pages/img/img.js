// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 20,
    longitude: '',
    latitude: '',
    markers: [{
      id: 0,
      iconPath: "",
      latitude: "",
      longitude: "",
      width: 50,
      height: 50
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log(options)
    var list = JSON.parse(options.model)
    console.log(list)
    _this.setData({
      latitude: list[0].latitude,//纬度 
      longitude: list[0].longitude,//经度 
      markers: [{
        latitude: list[0].latitude,
        longitude: list[0].longitude,
      }]
    })
    wx.openLocation({
      longitude: Number(list[0].longitude),
      latitude: Number(list[0].latitude),
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