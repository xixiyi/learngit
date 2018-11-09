const app = getApp()
var formattime = require("../../../utils/util.js");
Page({
  data: {
    materialorderInfo: [],
    "seniorscre": "hidden",
    "nextpage": "1",
    "nextboo": "true",
    xinghao: "",
    materialname: "",
    begintime: formattime.zuoritime(new Date()),
    endtime: formattime.zuoritime(new Date()),
    seniorscrebutton:"高级搜索"
  },
  seniorscrebutton: function() {
    if (this.data.seniorscre == 'hidden') {
      this.setData({
        seniorscre: 'show',
        nextpage: 1,
        seniorscrebutton:"收起搜索"
      })
    } else {
      this.setData({
        seniorscre: 'hidden',
        nextpage: 1,
        seniorscrebutton: "高级搜索"
      })
    }
    this.selectmaterialchukuleijibydanwei()
  },
  onLoad: function(e) {
    this.selectmaterialchukuleijibydanwei()
  },
  xinghao: function(e) {
    var that = this;
    that.setData({
      xinghao: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterialchukuleijibydanwei()
  },
  materialname: function(e) {
    var that = this;
    that.setData({
      materialname: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterialchukuleijibydanwei()
  },

  bindbeginDateChange: function(e) {
    var that = this;
    that.setData({
      begintime: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterialchukuleijibydanwei()
  },
  bindendDateChange: function(e) {
    var that = this;
    that.setData({
      endtime: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterialchukuleijibydanwei()
  },

  selectmaterialchukuleijibydanwei: function(page) {
    var that = this;
    //wx.setStorageSync("username", 'username=1')
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectmaterialchukuleijibymaterialdaima.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: that.data.nextpage,
        pageSize: '11',
        begin: that.data.begintime,
        end: that.data.endtime,
        materialname: that.data.materialname,
        xinghao: that.data.xinghao
      },
      header: header,
      success: function(res) {
        for(var i=0;i<res.data.data[0].list.length;i++){
          res.data.data[0].list[i].squarenum = Number(res.data.data[0].list[i].squarenum).toFixed(2)
        }
        that.setData({
          materialorderInfo: res.data.data[0].list,
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
        url: 'https://' + app.globalData.requestaddress + '/selectmaterialchukuleijibymaterialdaima.do', //仅为示例，并非真实的接口地址
        data: {
          pageNum: that.data.nextpage,
          pageSize: '11',
          begin: that.data.begintime,
          end: that.data.endtime,
          materialname: that.data.materialname,
          xinghao: that.data.xinghao
        },
        header: header,
        success: function(res) {
          for (var i = 0; i < res.data.data[0].list.length; i++) {
            res.data.data[0].list[i].squarenum = Number(res.data.data[0].list[i].squarenum).toFixed(2)
          }
          var arr_new = []
          arr_new.push(that.data.materialorderInfo)
          console.log(arr_new)
          arr_new.push(res.data.data[0].list)
         // that.data.materialorderInfo.push(res.data.data[0].list[0])
          for (var i = 0; i < res.data.data[0].list.length; i++) {
            that.data.materialorderInfo.push(res.data.data[0].list[i])
          }
          that.setData({
            materialorderInfo: that.data.materialorderInfo,
            nextpage: res.data.data[0].nextPage,
            nextboo: res.data.data[0].hasNextPage
          })
        }
      })
    } else {
      app.alertInfo('没有更多了', 'loading', 2000)
    }
  },
    viewbutton: function (e) {
      console.log(e)
      wx.setStorageSync("materialname", e.currentTarget.dataset.materialname);
      wx.setStorageSync("xinghao", e.currentTarget.dataset.xinghao);
      wx.setStorageSync("chukubegin", this.data.begintime)
      wx.setStorageSync("chukuend", this.data.endtime)
      wx.navigateTo({
        url: '../getmaterialselect/getmaterialselect'
      })
    }

  

})