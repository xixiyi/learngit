//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    insertyejiInfo: [],
    nextpage: 1,
    nextboo: true,
    begintime: "",
    endtime: "",
    name: "",
    huanjie: "",
    hideorshow: "show",
    showorhide: "hidden",
    time: "",
    insertname: "",
    yeji: "",
    yuanyin: "",
    namelistInfo: [],
    namelistInfoHide: "show",
    buttoncontent:"添加"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  name: function(e) {
    var name = e.detail.value
    this.setData({
      name: name,
      nextpage: "1"
    })
    this.selectshengchanyejiininsert()
  },
  bumen: function(e) {
    var bumen = e.detail.value
    this.setData({
      bumen: bumen,
      nextpage: "1"
    })
    this.selectshengchanyejiininsert()
  },
  bindbeginDateChange: function(e) {
    var that = this;
    that.setData({
      begin: e.detail.value,
      begintime: e.detail.value,
      nextpage: "1"
    })
    this.selectshengchanyejiininsert()
  },
  bindendDateChange: function(e) {
    var that = this;
    that.setData({
      end: e.detail.value,
      endtime: e.detail.value,
      nextpage: "1"
    })
    this.selectshengchanyejiininsert()
  },
  onLoad: function(options) {
    this.selectshengchanyejiininsert()
  },
  selectshengchanyejiininsert: function() {
    var that = this;
    //wx.setStorageSync("username", 'username=1')
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectshengchanyejiininsert.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: that.data.nextpage,
        pageSize: '11',
        count: 2,
        name: that.data.name || "",
        begin: that.data.begintime || "",
        end: that.data.endtime || "",
        huanjie: that.data.huanjie || "",
      },
      header: header,
      success: function(res) {
        that.setData({
          insertyejiInfo: res.data.data[0].list,
          nextpage: res.data.data[0].nextPage == 0 ? 1 : res.data.data[0].nextPage,
          nextboo: res.data.data[0].hasNextPage
        })
      }
    })
  },
  onReachBottom: function() {
    if (this.data.nextboo == true) {
      var that = this;
      //wx.setStorageSync("username", 'username=1')
      var header;
      header = {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync("username") //读取cookie
      };
      wx.request({
        url: 'https://' + app.globalData.requestaddress + '/selectshengchanyejiininsert.do', //仅为示例，并非真实的接口地址
        data: {
          pageNum: that.data.nextpage,
          pageSize: '11',
          count: 2,
          name: that.data.name || "",
          begin: that.data.begintime || "",
          end: that.data.endtime || "",
          huanjie: that.data.huanjie || "",
        },
        header: header,
        success: function(res) {
          var arr_new = []
          arr_new.push(that.data.insertyejiInfo)
          console.log(arr_new)
          arr_new.push(res.data.data[0].list)
          that.data.insertyejiInfo.push(res.data.data[0].list[0])
          for (var i = 0; i < res.data.data[0].list.length; i++) {
            that.data.insertyejiInfo.push(res.data.data[0].list[i])
          }
          that.setData({
            insertyejiInfo: that.data.insertyejiInfo,
            nextpage: res.data.data[0].nextPage == 0 ? 1 : res.data.data[0].nextPage,
            nextboo: res.data.data[0].hasNextPage
          })
        }
      })
    } else {
      app.alertInfo('没有更多了', 'loading', 2000)
    }
  },
  insertbutton: function() {
    if (this.data.showorhide == 'hidden') {
      this.setData({
        showorhide: "show",
        hideorshow: "hidden",
        buttoncontent:"查看"
      })
    } else {
      this.setData({
        showorhide: "hidden",
        hideorshow: "show",
        nextpage:1,
        buttoncontent: "添加"
      })
      this.selectshengchanyejiininsert()
    }
  },
  bindDateChange: function(e) {
    var that = this;
    that.setData({
      time: e.detail.value
    })
  },
  insertname: function(e) {
    this.setData({
      insertname: e.detail.value
    })
    this.selectribaobiaoname(e.detail.value)
  },
  selectribaobiaoname: function(name) {
    var that = this;
    //wx.setStorageSync("username", 'username=1')
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectribaobiaoname.do', //仅为示例，并非真实的接口地址
      data: {
        name: name,
        count: 1,
        pageNum: 1,
        pageSize: 100
      },
      header: header,
      success: function(res) {
        that.setData({
          namelistInfo: res.data.data[0].list
        })
      }
    })
  },
  clickname: function(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      insertname: name,
      namelistInfoHide: "hidden"
    })
  },
  yeji: function(e) {
    this.setData({
      yeji: e.detail.value
    })
  },
  yuanyin: function(e) {
    this.setData({
      yuanyin: e.detail.value
    })
  },
  submit: function() {
    if (this.data.namelistInfoHide == "show") {
      app.alertInfo("点击检索出的姓名","loading",1000)
    } else {
      var that = this;
      //wx.setStorageSync("username", 'username=1')
      var header;
      header = {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync("username") //读取cookie
      };
      wx.request({
        url: 'https://' + app.globalData.requestaddress + '/insertshengchanyejiininsert.do', //仅为示例，并非真实的接口地址
        data: {
          name: that.data.insertname,
          yeji: that.data.yeji,
          time: that.data.time,
          yuanyin: that.data.yuanyin,
          count: 2
        },
        header: header,
        success: function(res) {
          app.alertInfo("成功", "loading", 1000)
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})