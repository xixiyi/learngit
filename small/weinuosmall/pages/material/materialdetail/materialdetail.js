const app = getApp()
Page({
  data: {
    "materialInfo": [],
    "seniorscre": "hidden",
    "nextpage": "1",
    "nextboo": "true",
    xinghao:"",
    materialname:"",
    danweiname:"",
    materialtype:"",
    materialdaima:"",
    kcdizhi:"",
    seniorscrebutton:"高级搜索"

  },
  seniorscrebutton: function() {
    if (this.data.seniorscre == 'hidden') {
      this.setData({
        seniorscre: 'show',
        materialtype:"",
        materialdaima:"",
        kcdizhi:"",
        danweiname:"",
        nextpage: "1",
        seniorscrebutton:"收起搜索"
      })
    } else {
      this.setData({
        seniorscre: 'hidden',
        materialtype: "",
        materialdaima: "",
        kcdizhi: "",
        danweiname: "",
        nextpage: "1",
        seniorscrebutton:"高级搜索"
      })
    }
    this.selectmaterial()
  },
  xinghao: function (e) {
    this.setData({
      xinghao: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterial()
  },
  materialname: function (e) {
    this.setData({
      materialname: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterial()
  },
  materialtype: function (e) {
    this.setData({
      materialtype: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterial()
  },
  materialdaima: function (e) {
    this.setData({
      materialdaima: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterial()
  },
  kcdizhi: function (e) {
    this.setData({
      kcdizhi: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterial()
  },
  danweiname: function (e) {
    this.setData({
      danweiname: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterial()
  },

  onLoad: function(e) {
    this.selectmaterial()
  },

  selectmaterial: function() {
    var that = this;
    //wx.setStorageSync("username", 'username=1')
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectmaterial.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: that.data.nextpage,
        pageSize: '11',
        xinghao:that.data.xinghao,
        materialname:that.data.materialname,
        materialtype:that.data.materialtype,
        materialdaima:that.data.materialdaima,
        kcdizhi:that.data.kcdizhi,
        danweiname:that.data.danweiname

      },
      header: header,
      success: function(res) {
        that.setData({
          materialInfo: res.data.data[0].list,
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
        url: 'https://' + app.globalData.requestaddress + '/selectmaterial.do', //仅为示例，并非真实的接口地址
        data: {
          pageNum: that.data.nextpage,
          pageSize: '11',
          xinghao: that.data.xinghao,
          materialname: that.data.materialname,
          materialtype: that.data.materialtype,
          materialdaima: that.data.materialdaima,
          kcdizhi: that.data.kcdizhi,
          danweiname: that.data.danweiname
        },
        header: header,
        success: function(res) {
          var arr_new = []
          arr_new.push(that.data.materialInfo)
          console.log(arr_new)
          arr_new.push(res.data.data[0].list)
          that.data.materialInfo.push(res.data.data[0].list[0])
          for (var i = 0; i < res.data.data[0].list.length; i++) {
            that.data.materialInfo.push(res.data.data[0].list[i])
          }
          that.setData({
            materialInfo: that.data.materialInfo,
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