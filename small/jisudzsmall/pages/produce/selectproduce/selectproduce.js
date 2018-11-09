const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    produceInfo: {},
    "seniorscre": "hidden",
    kehuphone: "",
    xinghao: "",
    baobiaopici: "",
    banci: "",
    type: "",
    huanjie: "",
    nextpage: "1",
    nextboo: "true",
    seniorscrebutton:"高级搜索",
    name:""
  },
  seniorscrebutton: function() {
    if (this.data.seniorscre == 'hidden') {
      this.setData({
        seniorscre: 'show',
        seniorscrebutton:"收起搜索",
        nextpage:"1"
      })
    } else {
      this.setData({
        seniorscre: 'hidden',
        baobiaopici: "",
        banci: "",
        type: "",
        huanjie: "",
        seniorscrebutton:"高级搜索",
        nextpage: "1"
      })
      this.selectproduce()
    }
  },
  onLoad: function(options) {
    this.selectproduce()
  },
  kehuphone: function(e) {
    var that = this;
    that.setData({
      kehuphone: e.detail.value,
      nextpage: "1"
    })
    this.selectproduce()
  },
  xinghao: function(e) {
    var that = this;
    that.setData({
      xinghao: e.detail.value,
      nextpage: "1"
    })
    this.selectproduce()
  },
  name: function (e) {
    var that = this;
    that.setData({
      name: e.detail.value,
      nextpage: "1"
    })
    this.selectproduce()
  },
  bindbeginDateChange: function(e) {
    var that = this;
    that.setData({
      baobiaopici: e.detail.value,
      nextpage: "1"
    })
    this.selectproduce()
  },
  banci: function(e) {
    var that = this;
    that.setData({
      banci: e.detail.value,
      nextpage: "1"
    })
    this.selectproduce()
  },
  type: function(e) {
    var that = this;
    that.setData({
      type: e.detail.value,
      nextpage: "1"
    })
    this.selectproduce()
  },
  huanjie: function(e) {
    var that = this;
    that.setData({
      huanjie: e.detail.value,
      nextpage: "1"
    })
    this.selectproduce()
  },
  selectproduce: function() {
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
        pageNum: that.data.nextpage,
        pageSize: '11',
        kehuphone: that.data.kehuphone,
        xinghao: that.data.xinghao,
        baobiaopici: that.data.baobiaopici,
        banci: that.data.banci,
        type: that.data.type,
        huanjie: that.data.huanjie,
        name:that.data.name
      },
      header: header,
      success: function(res) {
        that.setData({
          produceInfo: res.data.data[0].list,
          nextpage: res.data.data[0].nextPage,
          nextboo: res.data.data[0].hasNextPage
        })
        console.log(res.data.data[0].list)
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
        url: 'https://' + app.globalData.requestaddress + '/selectshengchanribao.do', //仅为示例，并非真实的接口地址
        data: {
          pageNum: that.data.nextpage,
          pageSize: '11',
          kehuphone: that.data.kehuphone,
          xinghao: that.data.xinghao,
          baobiaopici: that.data.baobiaopici,
          banci: that.data.banci,
          type: that.data.type,
          huanjie: that.data.huanjie,
          name: that.data.name
        },
        header: header,
        success: function(res) {
          for (var i = 0; i < res.data.data[0].list.length; i++) {
            that.data.produceInfo.push(res.data.data[0].list[i])
          }
          that.setData({
            produceInfo: that.data.produceInfo,
            nextpage: res.data.data[0].nextPage,
            nextboo: res.data.data[0].hasNextPage
          })
        }
      })
    } else {
      app.alertInfo('没有更多了', 'loading', 2000)
    }
  },
  viewbutton: function(e) {
    wx.setStorageSync("ribaoobj", this.data.produceInfo[e.currentTarget.dataset.index]);
    wx.navigateTo({
      url: 'selectproducetwo/selectproducetwo'
    })
  },
  selectjindu: function (e) {
    var obj = this.data.produceInfo[e.currentTarget.dataset.index]
    console.log(obj)
    wx.setStorageSync("kehuphone", obj.kehuphone);
    wx.setStorageSync("xinghao", obj.kehuxinghao);
    wx.setStorageSync("caimoxinghao", obj.xinghao);
    wx.setStorageSync("mishu", obj.mishu);
    wx.navigateTo({
      url: '../../schedule/details/details'
    })
  },
  updateproduce: function (e) {
    wx.setStorageSync("ribaoobj", this.data.produceInfo[e.currentTarget.dataset.index]);
    wx.redirectTo({
      url: '../insertproduce/insertproduce'
    })
  },
  deletebutton: function(e) {
    var that = this;
    var boo = false
    wx.showModal({
      title: '确定删除么？',
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: "#3CC51F",
      success: function(res) {
        if (res.confirm) {
          var ribaoid = e.currentTarget.dataset.id
          var header;
          header = {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': wx.getStorageSync("username") //读取cookie
          };
          wx.request({
            url: 'https://' + app.globalData.requestaddress + '/deleteshengchanribao.do', //仅为示例，并非真实的接口地址
            data: {
              id: ribaoid
            },
            header: header,
            success: function(res) {
              that.setData({
                nextpage: "1"
              })
              that.selectproduce()
              console.log(res)
            }
          })
        } else if (res.cancel) {}
      }
    })
  }
})