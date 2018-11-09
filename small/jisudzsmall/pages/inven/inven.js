const app = getApp()
Page({
  data: {
    "invenInfo": [],
    "productnum": "",
    "pici": "",
    "seriesname": "",
    "seriesnum": "",
    "productname": "",
    "guige": "",
    "productlocation": "",
    "kuwei": "",
    "kehuname": "",
    "begin": "",
    "end": "",
    "begintime": "",
    "endtime": "",
    "seniorscre": "hidden",
    "nextpage": "1",
    "nextboo": "true",
    seniorscrebutton:"高级搜索"
  },
  seniorscrebutton: function() {
    if (this.data.seniorscre == 'hidden') {
      this.setData({
        seniorscre: 'show',
        seriesname: "",
        seriesnum: "",
        productname: "",
        guige: "",
        productlocation: "",
        kuwei: "",
        kehuname: "",
        begin: "",
        end: "",
        begintime: "",
        endtime: "",
        seniorscrebutton:"收起搜索",
        nextpage:"1"
      })
    } else {
      this.setData({
        seniorscre: 'hidden',
        seriesname: "",
        seriesnum: "",
        productname: "",
        guige: "",
        productlocation: "",
        kuwei: "",
        kehuname: "",
        begin: "",
        end: "",
        begintime: "",
        endtime: "",
        seniorscrebutton: "高级搜索",
        nextpage: "1"
      })
    }
    this.selectinven()
  },
  onLoad: function(e) {
    this.selectinven()
  },
  xinghao: function(e) {
    var that = this;
    that.setData({
      productnum: e.detail.value,
      nextpage: "1"
    })
    this.selectinven()
  },
  pici: function(e) {
    var that = this;
    that.setData({
      pici: e.detail.value,
      nextpage: "1"
    })
    this.selectinven()
  },
  seriesname: function(e) {
    var that = this;
    that.setData({
      seriesname: e.detail.value,
      nextpage: "1"
    })
    this.selectinven()
  },
  seriesnum: function(e) {
    var that = this;
    that.setData({
      seriesnum: e.detail.value,
      nextpage: "1"
    })
    this.selectinven()
  },
  productname: function(e) {
    var that = this;
    that.setData({
      productname: e.detail.value,
      nextpage: "1"
    })
    this.selectinven()
  },
  guige: function(e) {
    var that = this;
    that.setData({
      guige: e.detail.value,
      nextpage: "1"
    })
    this.selectinven()
  },
  productlocation: function(e) {
    var that = this;
    that.setData({
      productlocation: e.detail.value,
      nextpage: "1"
    })
    this.selectinven()
  },
  kuwei: function(e) {
    var that = this;
    that.setData({
      kuwei: e.detail.value,
      nextpage: "1"
    })
    this.selectinven()
  },
  kehuname: function(e) {
    var that = this;
    that.setData({
      kehuname: e.detail.value,
      nextpage: "1"
    })
    this.selectinven()
  },
  bindbeginDateChange: function(e) {
    var that = this;
    that.setData({
      begin: e.detail.value,
      begintime: e.detail.value,
      nextpage: "1"
    })
    this.selectinven()
  },
  bindendDateChange: function(e) {
    var that = this;
    that.setData({
      end: e.detail.value,
      endtime: e.detail.value,
      nextpage: "1"
    })
    this.selectinven()
  },
  begin: function(e) {
    var that = this;
    that.setData({
      begin: e.detail.value,
      nextpage: "1"
    })
    this.selectinven()
  },
  end: function(e) {
    var that = this;
    that.setData({
      end: e.detail.value,
      nextpage: "1"
    })
    this.selectinven()
  },
  selectinven: function() {
    var that = this;
    //wx.setStorageSync("username", 'username=1')
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectallproductinven.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: that.data.nextpage,
        pageSize: '11',
        productnum: that.data.productnum,
        pici: that.data.pici,
        seriesname: that.data.seriesname,
        seriesnum: that.data.seriesnum,
        productname: that.data.productname,
        guige: that.data.guige,
        productlocation: that.data.productlocation,
        kuwei: that.data.kuwei,
        kehuname: that.data.kehuname,
        begin: that.data.begin,
        end: that.data.end,
        count: '1'
      },
      header: header,
      success: function(res) {
        that.setData({
          invenInfo: res.data.data[0].list,
          nextpage: res.data.data[0].nextPage,
          nextboo: res.data.data[0].hasNextPage
        })
        console.log(res.data.data[0])
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
        url: 'https://' + app.globalData.requestaddress + '/selectallproductinven.do', //仅为示例，并非真实的接口地址
        data: {
          pageNum: that.data.nextpage,
          pageSize: '11',
          productnum: that.data.productnum,
          pici: that.data.pici,
          seriesname: that.data.seriesname,
          seriesnum: that.data.seriesnum,
          productname: that.data.productname,
          guige: that.data.guige,
          productlocation: that.data.productlocation,
          kuwei: that.data.kuwei,
          kehuname: that.data.kehuname,
          begin: that.data.begin,
          end: that.data.end,
          count: '1'
        },
        header: header,
        success: function(res) {
          var arr_new = []
          arr_new.push(that.data.invenInfo)
          console.log(arr_new)
          arr_new.push(res.data.data[0].list)
          that.data.invenInfo.push(res.data.data[0].list[0])
          for (var i = 0; i < res.data.data[0].list.length; i++) {
            that.data.invenInfo.push(res.data.data[0].list[i])
          }
          
          that.setData({
            invenInfo: that.data.invenInfo,
            nextpage: res.data.data[0].nextPage,
            nextboo: res.data.data[0].hasNextPage
          })
        }
      })
    } else {
      app.alertInfo('没有更多了', 'loading', 2000)
    }
  },
})