//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baobiaotitle: "生产日报表",
    baobiaoInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var ribaoid = wx.getStorageSync("ribaoid")
    this.selectshengchanribao(ribaoid)
  },
  selectshengchanribao: function(ribaoid) {
    var that = this;
    //wx.setStorageSync("username", 'username=1')
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectshengchanribao.do', //仅为示例，并非真实的接口地址
      data: {
        pageSize: 10000,
        pageNum: 1,
        id: ribaoid
      },
      header: header,
      success: function(res) {
        that.setData({
          baobiaoInfo: res.data.data[0].list[0],
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})