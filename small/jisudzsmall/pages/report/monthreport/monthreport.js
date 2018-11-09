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
    monthreportInfo: [{
      time: "",
      quyu: "",
      laokehu: "",
      xinkehu: "",
      showOrhide:"hidden"
    }],
    month: "",
    zhiwu: "",
    xiaoshouzonge: "",
    hiddenorshow: "show",
    hidden: "hidden",
    years: years,
    months: months,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  imageAdd: function () {
    var arr_new = []
    var obj = {};
    obj.time = "";
    obj.quyu = "";
    obj.laokehu = "";
    obj.xinkehu = "";
    obj.showOrhide="show"
    this.data.monthreportInfo.push(obj)
    arr_new = this.data.monthreportInfo
    this.setData({
      monthreportInfo: arr_new
    })
  },
  delDom: function (e) {
    var arr_new = []
    var delindex = e.currentTarget.dataset.index;
    for (var i = 0; i < this.data.monthreportInfo.length; i++) {
      if (i == delindex) {
        continue;
      } else {
        arr_new.push(this.data.monthreportInfo[i])
      }
    }
    this.setData({
      monthreportInfo: arr_new
    })
  },
  zhiwu: function (e) {
    this.data.zhiwu = e.detail.value;
  },
  month: function () {
    if (this.data.hidden == 'hidden') {
      console.log(123)
      this.setData({
        hidden: 'show',
        hiddenorshow: 'hidden'
      })
    } else {
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
    if (month < 10) {
      month = "0" + month;
    }
    this.setData({
      month: this.data.years[val[1]] + "-" + month
    })
  },
  xiaoshouzonge: function (e) {
    this.data.xiaoshouzonge = e.detail.value;
  },
  time: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.monthreportInfo[index].time = e.detail.value;
    var arr_new = []
    arr_new = this.data.monthreportInfo
    this.setData({
      monthreportInfo: arr_new
    })
  },
  quyu: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.monthreportInfo[index].quyu = e.detail.value;
  },
  laokehu: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.monthreportInfo[index].laokehu = e.detail.value;
  },
  xinkehu: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.monthreportInfo[index].xinkehu = e.detail.value;
  },
  submit: function (e) {
    var times = "";
    var quyus = "";
    var laokehus = "";
    var xinkehus = "";
    var fengefu = "|";
    for (var i = 0; i < this.data.monthreportInfo.length; i++) {
      if (i == this.data.monthreportInfo.length - 1) {
        fengefu = "";
      }
      times = times + this.data.monthreportInfo[i].time + fengefu;
      quyus = quyus + this.data.monthreportInfo[i].quyu + fengefu;
      laokehus = laokehus + this.data.monthreportInfo[i].laokehu + fengefu;
      xinkehus = xinkehus + this.data.monthreportInfo[i].xinkehu + fengefu;
    }
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username")//读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress +'/insertshangyoumonthbaobiao.do', //仅为示例，并非真实的接口地址
      data: {
        time: times,
        quyu: quyus,
        laokehu: laokehus,
        xinkehu: xinkehus,
        xiaoshouzonge: this.data.xiaoshouzonge,
        zhiwu: this.data.zhiwu,
        month: this.data.month
      },
      header: header,
      success: function (res) {
        console.log(res.data)
        app.alertInfo('上传成功', 'success', 2000)
      }
    })
  }
})