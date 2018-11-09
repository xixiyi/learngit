const app = getApp()
const date = new Date()
const years = []
const months = []
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekreportInfo: [{
      titlelable:"周一客户",
      kehuname: "",
      mudiandtime: "",
      qingkong: "",
      beizhu: ""
    }, {
      titlelable: "周二客户",
      kehuname: "",
      mudiandtime: "",
      qingkong: "",
      beizhu: ""
      }, {
        titlelable: "周三客户",
        kehuname: "",
        mudiandtime: "",
        qingkong: "",
        beizhu: ""
    }, {
      titlelable: "周四客户",
      kehuname: "",
      mudiandtime: "",
      qingkong: "",
      beizhu: ""
      }, {
        titlelable: "周五客户",
        kehuname: "",
        mudiandtime: "",
        qingkong: "",
        beizhu: ""
    }, {
      titlelable: "周六客户",
      kehuname: "",
      mudiandtime: "",
      qingkong: "",
      beizhu: ""
      }, {
        titlelable: "周日客户",
        kehuname: "",
        mudiandtime: "",
        qingkong: "",
        beizhu: ""
      }],
    weekxiaoshouzonge:"",
    week:"",
    time:"",
    zhiwu:"",
    xiaoshouzonge:"",
    hiddenorshow:"show",
    hidden:"hidden",
    years: years,
    months: months
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  zhiwu: function (e) {
    this.data.zhiwu = e.detail.value;
  },
  time:function(){
    if(this.data.hidden=='hidden'){
      console.log(123)
      this.setData({
        hidden: 'show',
        hiddenorshow:'hidden'
      })
    }else{
      this.setData({
        hidden: 'hidden',
        hiddenorshow: 'show'
      })
    }
  },
  changetime: function (e) {
    const val = e.detail.value
    console.log(this.data.years[val[1]])
    console.log()
    var month = this.data.months[val[2]]
    if(month<10){
      month = "0"+month;
    }
    this.setData({
      time: this.data.years[val[1]] + "-" + month
    })
  },
  week:function(e){
    this.data.week = e.detail.value;
  },
  xiaoshouzonge: function (e) {
    this.data.xiaoshouzonge = e.detail.value;
  },
  weekxiaoshouzonge: function (e) {
    this.data.weekxiaoshouzonge = e.detail.value;
  },
  kehuname: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.weekreportInfo[index].kehuname = e.detail.value;
    console.log(this.data.weekreportInfo)
  },
  mudiandtime: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.weekreportInfo[index].mudiandtime = e.detail.value;
    console.log(this.data.weekreportInfo)
  },
  qingkong: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.weekreportInfo[index].qingkong = e.detail.value;
    console.log(this.data.weekreportInfo)
  },
  beizhu: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.weekreportInfo[index].beizhu = e.detail.value;
    console.log(this.data.weekreportInfo)
  }, 
  submit: function (e) {
    var kehunames = "";
    var mudiandtimes = "";
    var qingkongs = "";
    var beizhus = "";
    var fengefu = "|";

    for (var i = 0; i < this.data.weekreportInfo.length; i++) {
      if (i == this.data.weekreportInfo.length - 1) {
        fengefu = "";
      }
      kehunames = kehunames + this.data.weekreportInfo[i].kehuname + fengefu;
      mudiandtimes = mudiandtimes + this.data.weekreportInfo[i].mudiandtime + fengefu;
      qingkongs = qingkongs + this.data.weekreportInfo[i].qingkong + fengefu;
      beizhus = beizhus + this.data.weekreportInfo[i].beizhu + fengefu;
    }
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username")//读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress +'/insertshangyouweekbaobiao.do', //
      data: {
        kehuname: kehunames,
        mudiandtime: mudiandtimes,
        qingkong: qingkongs,
        beizhu: beizhus,
        xiaoshouzonge: this.data.xiaoshouzonge,
        weekxiaoshouzonge: this.data.weekxiaoshouzonge,
        zhiwu: this.data.zhiwu,
        time: this.data.time,
        week:this.data.week
      },
      header: header,
      success: function (res) {
        app.alertInfo('上传成功', 'success', 2000)
      }
    })
  }

})