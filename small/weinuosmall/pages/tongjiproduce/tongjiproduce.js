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
      nextpage: "1",
      jindu:0
    })
    this.selectproduce()
  },
  xinghao: function(e) {
    var that = this;
    that.setData({
      xinghao: e.detail.value,
      nextpage: "1",
      jindu: 0
    })
    this.selectproduce()
  },
  yawen: function (e) {
    var that = this;
    that.setData({
      yawen: e.detail.value,
      nextpage: "1",
      jindu: 0
    })
    this.selectproduce()
  },
  guige: function (e) {
    var that = this;
    that.setData({
      guige: e.detail.value,
      nextpage: "1",
      jindu: 0
    })
    this.selectproduce()
  },
  banci: function(e) {
    var that = this;
    that.setData({
      banci: e.detail.value,
      nextpage: "1",
      jindu: 0
    })
    this.selectproduce()
  },
  baiye: function(e) {
    var that = this;
    that.setData({
      baiye:  e.detail.value,
      nextpage: "1",
      jindu: 0
    })
    this.selectproduce()
  },
  bindbeginDateChange: function(e) {
    var that = this;
    that.setData({
      begin: e.detail.value,
      begintime: e.detail.value,
      end:e.detail.value,
      endtime:e.detail.value,
      nextpage: "1",
      jindu: 0
    })
    this.selectproduce()
  },
  bindendDateChange: function(e) {
    var that = this;
    that.setData({
      end: e.detail.value,
      endtime: e.detail.value,
      nextpage: "1",
      jindu: 0
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
        pageSize: '10000',
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
        var count = 0
        for (var j = 0; j < res.data.data[0].list.length; j++) {
          console.log(count++)
          var jindu =Number((count/res.data.data[0].list.length)*100).toFixed(2)
          that.setData({
            jindu:jindu
          })
          var obj = res.data.data[0].list[j];
          obj.chengpinnum = obj.chengpinnum==''?0:obj.chengpinnum
          obj.chengpinnum = obj.chengpinnum == 'undefined' ?0: obj.chengpinnum
          chengpinnum = chengpinnum + Number(obj.chengpinnum);
          cipinnum = cipinnum + Number(obj.cipinnum)

          obj.cipinyuanyincontent = changedata(obj.cipinyuanyincontent)
          obj.xingguangongxucontent = changedata(obj.xingguangongxucontent)
         
          obj.qitagongxucontent = changeqitagogxudata(obj.qitagongxucontent)

          function changeqitagogxudata(data){
            if(data==''){
              return data;
            }
            var changedata = ""
            var dataarr = data.split(",")
            for (var i = 0; i < dataarr.length; i++) {
              if(dataarr[i]==''){
                continue
              }
              console.log(dataarr)
             
              var datatwoarr = dataarr[i].split("--");
              console.log(datatwoarr)
              changedata += datatwoarr[0]+datatwoarr[2]+"<"+datatwoarr[1]+">|"
            }
            changedata = changedata.substring(0,changedata.length-1)
            return changedata
          }
          res.data.data[0].list[j] = obj
          function changedata(data){
            var changedata = ""
            var dataarr = data.split(",")
            for(var i=0;i<dataarr.length;i++){
              if(dataarr[i]==''){
                continue
              }
              dataarr[i] = dataarr[i].replace("--","<")

              changedata +=dataarr[i]+">,"
            }
            console.log(changedata)
            changedata = changedata.substring(0, changedata.length - 1)
            return changedata
          }





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
            cy[i] = cy[i].replace("=","<")
            if (i == cy.length - 1) {
              cipinyuanyin += cy[i]+">"
            } else {
              cipinyuanyin += cy[i] + ">|"
            }
          }
          var xggx = obj.xingguangongxuheji.split(",")
          var xingguangongxu = "";
          for (var i = 0; i < xggx.length; i++) {
            xggx[i]=xggx[i].replace("=","<")
            if (i == xggx.length - 1) {
              xingguangongxu += xggx[i]+">"
            } else {
              xingguangongxu += xggx[i] + ">|"
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
        if(chengpinnum!=0){
          chengpinnum = chengpinnum.toFixed(2)
        }
        if (name =="岗位:() {}"){
          name = ""
        }
        if (xingguangongxu == ">") {
          xingguangongxu = ""
        }
        if (cipinyuanyin == ">") {
          cipinyuanyin = ""
        }
        if(res.data.data[0].list==0){
          that.setData({
            jindu:100
          })
        }
        that.setData({
          chengpinnum: chengpinnum,
          cipinnum: cipinnum,
          cipinyuanyin: cipinyuanyin,
          qitagongxu: qitagongxu,
          xingguangongxu: xingguangongxu,
          name: name,
          produceInfo : res.data.data[0].list
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