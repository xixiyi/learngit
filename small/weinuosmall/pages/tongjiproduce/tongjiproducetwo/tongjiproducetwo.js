const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baobiaotitle:"生产日报表",
    produceInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      produceInfo: wx.getStorageSync("produceInfo"),
      huanjie:wx.getStorageSync("tongjihuanjiename"),
      huanjielength: wx.getStorageSync("huanjielength")
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
    
  },
  viewbutton:function(e){
    var that = this;
    console.log(e)
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    var baiye = that.data.baiye == "" ? "" : "(" + that.data.baiye
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/updateshengchanribaoshenhe.do', //仅为示例，并非真实的接口地址
      data: {
        id: e.currentTarget.dataset.id,
        shenhe:e.currentTarget.dataset.shenhe
      },
      header: header,
      success: function (res) {
        var index = e.currentTarget.dataset.index
        that.data.produceInfo[index].shenhe = e.currentTarget.dataset.shenhe
        that.setData({
          produceInfo : that.data.produceInfo
        })
        app.alertInfo('操作成功', 'success', 2000)
      }
    })
  }
})