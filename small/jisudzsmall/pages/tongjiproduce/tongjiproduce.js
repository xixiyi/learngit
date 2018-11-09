const app = getApp()
var formattime = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    produceInfo: {},
    "seniorscre": "hidden",
    kehuphone: "",
    xinghao: "",
    banci: "",
    baiye:"",
    yawen: "",
    guige: "",
    nextpage: "1",
    nextboo: "true",
    seniorscrebutton: "高级搜索",
    begintime: formattime.zuoritime(new Date()),
    endtime: formattime.zuoritime(new Date())

  },
  seniorscrebutton: function() {
    if (this.data.seniorscre == 'hidden') {
      this.setData({
        seniorscre: 'show',
        seniorscrebutton: "收起搜索",
        nextpage: "1"
      })
    } else {
      this.setData({
        seniorscre: 'hidden',
        banci: "",
        seniorscrebutton: "高级搜索",
        nextpage: "1"
      })
      this.selectproduce()
    }
  },
  onLoad: function(options) {
    this.setData({
      huanjie: wx.getStorageSync("tongjihuanjiename")
    })
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
  yawen: function (e) {
    var that = this;
    that.setData({
      yawen: e.detail.value,
      nextpage: "1"
    })
    this.selectproduce()
  },
  guige: function (e) {
    var that = this;
    that.setData({
      guige: e.detail.value,
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
  baiye: function(e) {
    var that = this;
    that.setData({
      baiye:  e.detail.value,
      nextpage: "1"
    })
    this.selectproduce()
  },
  bindbeginDateChange: function(e) {
    var that = this;
    that.setData({
      begin: e.detail.value,
      begintime: e.detail.value,
      nextpage: "1"
    })
    this.selectproduce()
  },
  bindendDateChange: function(e) {
    var that = this;
    that.setData({
      end: e.detail.value,
      endtime: e.detail.value,
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
    var baiye = that.data.baiye==""?"":"("+that.data.baiye
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectshengchanribao.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: that.data.nextpage,
        pageSize: '10',
        kehuphone: that.data.kehuphone,
        xinghao: that.data.xinghao,
        banci: that.data.banci+baiye,
        huanjie: wx.getStorageSync("tongjihuanjiename"),
        yawen: that.data.yawen,
        baobiaoguige: that.data.guige,
        shengchanbegin: that.data.begintime,
        shengchanend: that.data.endtime
      },
      header: header,
      success: function(res) {
        var chengpinnum = 0
        var cipinnum = 0
        var cipinyuanyin = ""
        var qitagongxu = ""
        var xingguangongxu = ""
        var name = ""
        for (var j = 0; j < res.data.data[0].list.length; j++) {
          var obj = res.data.data[0].list[j];
          obj.chengpinnum = obj.chengpinnum==''?0:obj.chengpinnum
          obj.chengpinnum = obj.chengpinnum == 'undefined' ?0: obj.chengpinnum
          chengpinnum = chengpinnum + Number(obj.chengpinnum);
          cipinnum = cipinnum + Number(obj.cipinnum)

          var gx = obj.qitagongxuheji.split(",")
          var qitagongxu = "";
          for (var i = 0; i < gx.length; i++) {
            if (i == gx.length - 1) {
              qitagongxu += gx[i]
            } else {
              qitagongxu += gx[i] + "|"
            }
          }
          var cy = obj.cipinyuanyinheji.split(",")
          var cipinyuanyin = "";
          for (var i = 0; i < cy.length; i++) {
            if (i == cy.length - 1) {
              cipinyuanyin += cy[i]
            } else {
              cipinyuanyin += cy[i] + "|"
            }
          }
          var xggx = obj.xingguangongxuheji.split(",")
          var xingguangongxu = "";
          for (var i = 0; i < xggx.length; i++) {
            if (i == xggx.length - 1) {
              xingguangongxu += xggx[i]
            } else {
              xingguangongxu += xggx[i] + "|"
            }
          }
          var xm = obj.nameheji.split("岗")
          var name = "";
          for (var i = 0; i < xm.length; i++) {
            xm[i] = xm[i].substr(0, xm[i].length - 1)
            if (i == 0) {
              name +=  xm[i]
            } else if (i == xm.length - 1) {
              name += '岗'+xm[i]
            } else {
              name += '岗' + xm[i] + "|"
            }
          }
        }
        that.data.produceInfo = res.data.data[0].list,
        that.setData({
          chengpinnum: chengpinnum,
          cipinnum: cipinnum,
          cipinyuanyin: cipinyuanyin,
          qitagongxu: qitagongxu,
          xingguangongxu: xingguangongxu,
          name: name
        })
        console.log(res.data.data[0].list)
      }
    })
  },
  viewbutton: function(e) {
    wx.setStorageSync("produceInfo", this.data.produceInfo);
    wx.navigateTo({
      url: 'tongjiproducetwo/tongjiproducetwo'
    })
  }

})