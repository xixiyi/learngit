//index.js
//获取应用实例
const app = getApp()
var formattime = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yejiInfo: [],
    nextpage: 1,
    nextboo: true,
    begintime: "",
    endtime: "",
    name: "",
    huanjie: "",
    banci: "",
    baiye: "",
    hideorshow: "hidden",
    buttontent: "检索",
    buttontitle: "昨日业绩",
    buttonyeji: "zuoriyeji",
    sousuotitle: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  selectbutton: function () {
    if (this.data.hideorshow == 'hidden') {
      this.setData({
        hideorshow: "show",
        buttontent: "收起检索"
      })
    } else {
      this.setData({
        hideorshow: "hidden",
        begintime: "",
        endtime: "",
        name: "",
        huanjie: "",
        banci: "",
        baiye: "",
        nextpage: 1,
        buttontent: "检索",
        sousuotitle: ""
      })
      this.selectshengchanyeji()
    }
  },
  zuoriyeji: function () {
    this.setData({
      nextpage: "1",
      begintime: formattime.zuoritime(new Date()),
      endtime: formattime.zuoritime(new Date()),
      buttonyeji: "todateyeji",
      buttontitle: "今日业绩",
      sousuotitle: "昨日业绩"
    })
    console.log()
    this.selectshengchanyeji()
  },
  todateyeji: function () {
    this.setData({
      nextpage: "1",
      begintime: formattime.formatTime(new Date()),
      endtime: formattime.formatTime(new Date()),
      buttonyeji: "monthyeji",
      buttontitle: "本月业绩",
      sousuotitle: "今日业绩"
    })
    this.selectshengchanyeji()
  },
  monthyeji: function () {
    var begin = formattime.formatTime(new Date())
    begin = begin.split("-")[0] + "-" + begin.split("-")[1] + "-01"
    var end = begin.split("-")[0] + "-" + begin.split("-")[1] + "-31"
    this.setData({
      nextpage: "1",
      begintime: begin,
      endtime: end,
      buttonyeji: "zuoriyeji",
      buttontitle: "昨日业绩",
      sousuotitle: "本月业绩"
    })
    this.selectshengchanyeji()
  },
  name: function (e) {
    var name = e.detail.value
    this.setData({
      name: name,
      nextpage: "1"
    })
    this.selectshengchanyeji()
  },
  huanjie: function (e) {
    var huanjie = e.detail.value
    this.setData({
      huanjie: huanjie,
      nextpage: "1"
    })
    this.selectshengchanyeji()
  },
  bindbeginDateChange: function (e) {
    var that = this;
    that.setData({
      begintime: e.detail.value,
      nextpage: "1",
      sousuotitle: ""
    })
    this.selectshengchanyeji()
  },
  bindendDateChange: function (e) {
    var that = this;
    that.setData({
      endtime: e.detail.value,
      nextpage: "1",
      sousuotitle: ""
    })
    this.selectshengchanyeji()
  },
  banci: function (e) {
    this.setData({
      banci: e.detail.value
    })
    this.selectshengchanyeji()
  },
  baiye: function (e) {
    this.setData({
      baiye: e.detail.value
    })
    this.selectshengchanyeji()
  },
  onLoad: function (options) {
    this.selectshengchanyeji()
  },
  selectshengchanyeji: function () {
    var that = this;
    var banci = that.data.banci
    if (that.data.baiye != '') {
      banci = banci + "(" + that.data.baiye + ")"
    }
    //wx.setStorageSync("username", 'username=1')
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectshengchanyeji.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: that.data.nextpage,
        pageSize: '11',
        name: that.data.name || "",
        begin: that.data.begintime || "",
        end: that.data.endtime || "",
        huanjie: that.data.huanjie || "",
        banci: banci || "",
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
      var banci = that.data.banci
      if (that.data.baiye != '') {
        banci = banci + "(" + that.data.baiye + ")"
      }
      //wx.setStorageSync("username", 'username=1')
      var header;
      header = {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync("username") //读取cookie
      };
      wx.request({
        url: 'https://' + app.globalData.requestaddress + '/selectshengchanyeji.do', //仅为示例，并非真实的接口地址
        data: {
          pageNum: that.data.nextpage,
          pageSize: '11',
          name: that.data.name || "",
          begin: that.data.begintime || "",
          end: that.data.endtime || "",
          huanjie: that.data.huanjie || "",
          banci: banci || "",
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
  viewbutton: function (e) {
    var that = this;
    var banci = that.data.banci
    console.log(banci)
    if (that.data.baiye != '') {
      banci = banci + "(" + that.data.baiye + ")"
    }
    console.log(banci)
    console.log(that.data.baiye)
    var name = e.currentTarget.dataset.name
    wx.setStorageSync("name", name)
    wx.setStorageSync("begin", this.data.begintime)
    wx.setStorageSync("end", this.data.endtime)
    wx.setStorageSync("huanjie", this.data.huanjie)
    wx.setStorageSync("banci", banci)
    wx.navigateTo({
      url: 'selectachievementtwo/selectachievementtwo'
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