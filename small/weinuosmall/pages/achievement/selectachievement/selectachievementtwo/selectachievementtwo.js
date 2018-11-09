//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yejiInfo: [],
    nextpage: 1,
    nextboo: true,
    name:"",
    begin:"",
    end:"",
    huanjie:"",
    banci:""
  },

  onLoad: function (options) {
    this.setData({
      name:wx.getStorageSync("name"),
      begin:wx.getStorageSync("begin"),
      end:wx.getStorageSync("end"),
      huanjie:wx.getStorageSync("huanjie"),
      banci:wx.getStorageSync("banci")
    })
    this.selectshengchanyejiname()
  },
  selectshengchanyejiname: function () {
    var that = this;
    //wx.setStorageSync("username", 'username=1')
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectshengchanyejiname.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: that.data.nextpage,
        pageSize: '11',
        name: wx.getStorageSync("name") || "",
        begin: wx.getStorageSync("begin") || "",
        end: wx.getStorageSync("end") || "",
        huanjie: wx.getStorageSync("huanjie") || "",
        banci: wx.getStorageSync("banci") || "",
      },
      header: header,
      success: function (res) {
        that.setData({
          yejiInfo: res.data.data[0].list,
          nextpage: res.data.data[0].nextPage == 0 ? 1 : res.data.data[0].nextPage,
          nextboo: res.data.data[0].hasNextPage
        })
      }
    })
  },
  onReachBottom: function () {
    if (this.data.nextboo == true) {

      var that = this;
      //wx.setStorageSync("username", 'username=1')
      var header;
      header = {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync("username") //读取cookie
      };
      wx.request({
        url: 'https://' + app.globalData.requestaddress + '/selectshengchanyejiname.do', //仅为示例，并非真实的接口地址
        data: {
          pageNum: that.data.nextpage,
          pageSize: '11',
          name: wx.getStorageSync("name") || "",
          begin: wx.getStorageSync("begin") || "",
          end: wx.getStorageSync("end") || "",
          huanjie: wx.getStorageSync("huanjie") || "",
          banci: wx.getStorageSync("banci") || "",
        },
        header: header,
        success: function (res) {
          var arr_new = []
          arr_new.push(that.data.yejiInfo)
          console.log(arr_new)
          arr_new.push(res.data.data[0].list)
          that.data.yejiInfo.push(res.data.data[0].list[0])
          for (var i = 0; i < res.data.data[0].list.length; i++) {
            that.data.yejiInfo.push(res.data.data[0].list[i])
          }
          that.setData({
            yejiInfo: that.data.yejiInfo,
            nextpage: res.data.data[0].nextPage == 0 ? 1 : res.data.data[0].nextPage,
            nextboo: res.data.data[0].hasNextPage
          })
        }
      })
    } else {
      app.alertInfo('没有更多了', 'loading', 2000)
    }
  },
  viewbutton:function(e){
    var ribaoid = e.currentTarget.dataset.ribaoid
    wx.setStorageSync("ribaoid", ribaoid)
    wx.navigateTo({
      url: 'selectachievementthree/selectachievementthree'
    })
  },





  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})