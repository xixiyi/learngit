const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shengchanorderziInfo: {},
    seniorscre: "hidden",
    nextpage: "1",
    kehuphone: "",
    kehuname: "",
    kehuxinghao: "",
    yawen: "",
    guige: "",
    xinghao: "",
    dapianguige: "",
    shengchantypename: "",
    jindu: "",
    seniorscrebutton: "高级搜索",
    jindu1: 0
  },
  seniorscrebutton: function() {
    if (this.data.seniorscre == 'hidden') {
      this.setData({
        seniorscre: 'show',
        nextpage: "1",
        seniorscrebutton: "收起搜索",
      })
    } else {
      this.setData({
        seniorscre: 'hidden',
        nextpage: "1",
        seniorscrebutton: "高级搜索",
      })
    }
  },
  kehuphone: function(e) {
    this.setData({
      kehuphone: e.detail.value,
      nextpage: "1"
    })
    this.selectshengchanjindu()
  },
  kehuname: function(e) {
    this.setData({
      kehuname: e.detail.value,
      nextpage: "1"
    })
    this.selectshengchanjindu()
  },
  kehuxinghao: function(e) {
    this.setData({
      kehuxinghao: e.detail.value,
      nextpage: "1"
    })
    this.selectshengchanjindu()
  },
  yawen: function(e) {
    this.setData({
      yawen: e.detail.value,
      nextpage: "1"
    })
    this.selectshengchanjindu()
  },
  guige: function(e) {
    this.setData({
      guige: e.detail.value,
      nextpage: "1"
    })
    this.selectshengchanjindu()
  },
  xinghao: function(e) {
    this.setData({
      xinghao: e.detail.value,
      nextpage: "1"
    })
    this.selectshengchanjindu()
  },
  dapianguige: function(e) {
    this.setData({
      dapianguige: e.detail.value,
      nextpage: "1"
    })
    this.selectshengchanjindu()
  },
  jindu: function(e) {
    this.setData({
      jindu: e.detail.value,
      nextpage: "1"
    })
    this.selectshengchanjindu()
  },
  selectshengchanjindu: function() {
    var that = this;
    //wx.setStorageSync("username", 'username=1')
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectshengchanorderzi.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: that.data.nextpage,
        pageSize: '30',
        status:3,
        yawen: that.data.yawen,
        ckhou: that.data.guige,
        jicaiguigename: that.data.dapianguige,
        bianhao: that.data.xinghao,
        kehuname: that.data.kehuname,
        kehuphone: that.data.kehuphone,
        kehuxinghao: that.data.kehuxinghao,
        nowstatus: that.data.jindu
      },
      header: header,
      success: function(res) {
        that.setData({
          shengchanorderziInfo: res.data.data[0].list,
          nextpage: res.data.data[0].nextPage,
          nextboo: res.data.data[0].hasNextPage,
          jindu1:100
        })
        console.log(res.data.data[0])
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
        url: 'https://' + app.globalData.requestaddress + '/selectshengchanorderzi.do', //仅为示例，并非真实的接口地址
        data: {
          pageNum: that.data.nextpage,
          pageSize: '30',
          status:3,
          yawen: that.data.yawen,
          ckhou: that.data.guige,
          jicaiguigename: that.data.dapianguige,
          bianhao: that.data.xinghao,
          kehuname: that.data.kehuname,
          kehuphone: that.data.kehuphone,
          kehuxinghao: that.data.kehuxinghao,
          nowstatus: that.data.jindu
        },
        header: header,
        success: function (res) {
          for (var i = 0; i < res.data.data[0].list.length; i++) {
            that.data.shengchanorderziInfo.push(res.data.data[0].list[i])
          }
          that.setData({
            shengchanorderziInfo: that.data.shengchanorderziInfo,
            nextpage: res.data.data[0].nextPage,
            nextboo: res.data.data[0].hasNextPage
          })
        }
      })
    } else {
      app.alertInfo('没有更多了', 'loading', 2000)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.selectshengchanjindu()
  },
  viewbutton: function (e) {
    var obj = this.data.shengchanorderziInfo[e.currentTarget.dataset.index]
    console.log(obj)
    wx.setStorageSync("kehuphone", obj.kehuphone);
    wx.setStorageSync("xinghao", obj.kehuxinghao);
    wx.setStorageSync("caimoxinghao", obj.bianhao);
    wx.setStorageSync("mishu", obj.mishu);
    wx.navigateTo({
      url: '../details/details'
    })
  }


})