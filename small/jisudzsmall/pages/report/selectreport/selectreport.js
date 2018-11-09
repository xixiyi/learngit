const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reporttype:['日报表','周报表','月报表'],
    reporttypevalue:[9,91,92],
    hidden:"hidden",
    hiddenorshow:"hidden",
    sechbutton:2,
    reportInfo:{},
    pageSize:15,
    pageNum:1,
    rizhitype:9,
    rizhiuser:"",
    begin:"",
    end:"",
    productnum: "", 
    minheight:"85px",
    value:"",
    nextboo:"true",
    nextpage:"1",
    seniorscrebutton:"高级搜索"
  },
  reportinput:function(e){
    if(this.data.sechbutton%2==0){
      if (this.data.hidden=='hidden'){
        this.setData({
          hidden: "show",
          minheight:"230px"
        })
      }else{
        this.setData({
          hidden: "hidden",
          minheight:"85px"
        })
      }
    }else{
      if (this.data.hidden=='hidden'){
        this.setData({
          hidden: "show",
          minheight:"230px",
          hiddenorshow:"hidden",
        })
      }else{
        this.setData({
          hidden:"hidden",
          hiddenorshow:"show",
          minheight:"85px"
        })
      }
    }
  },
  seniorscrebutton:function(e){
    this.setData({
      sechbutton: (this.data.sechbutton)+1
    })
    console.log(this.data.sechbutton)
    if(this.data.sechbutton%2==0){
      this.setData({
        hiddenorshow:"hidden",
        nextpage: 1,
        seniorscrebutton:"高级搜索"

      })
      this.selectreport()
    }else{
      if(this.data.hidden=='hidden'){

        this.setData({
          hiddenorshow:"show",
          nextpage:1,
          seniorscrebutton:"收起搜索"
        })
        this.selectreport()
      }
    }
  },
  changereporttype:function(e){
    console.log(e)
    this.data.rizhitype = this.data.reporttypevalue[e.detail.value[1]]
    this.setData({
      value: this.data.reporttype[e.detail.value[1]],
      nextpage:"1"
    })
    console.log(this.data.rizhitype)
    this.selectreport()
  },
  bindbeginDateChange: function (e) {
    var that = this;
    that.setData({
      begin: e.detail.value,
      nextpage: "1"
    })
    this.selectreport()
  },
  bindendDateChange: function (e) {
    var that = this;
    that.setData({
      end: e.detail.value,
      nextpage: "1"
    })
    this.selectreport()
  },
  rizhiuser:function(e){
    this.setData({
      rizhiuser: e.detail.value,
      nextpage: "1"
    })
    this.selectreport()
  },
  productnum: function (e) {
    this.setData({
      productnum: e.detail.value,
      nextpage: "1"
    })
    this.selectreport()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.selectreport()
  },
  selectreport: function () {
    var that = this;
    //wx.setStorageSync("username", 'username=1')
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username")//读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress +'/selectrizhi.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: that.data.nextpage,
        pageSize: that.data.pageSize,
        rizhitype: that.data.rizhitype,
        begin: that.data.begin,
        end: that.data.end,
        productnum: that.data.productnum,
        rizhiuser: that.data.rizhiuser
      },
      header: header,
      success: function (res) {
        that.setData({
          reportInfo: res.data.data[0].list,
          nextpage: res.data.data[0].nextPage,
          nextboo: res.data.data[0].hasNextPage
        })
        console.log(res.data.data[0].list)
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
        'Cookie': wx.getStorageSync("username")//读取cookie
      };
      wx.request({
        url: 'https://' + app.globalData.requestaddress + '/selectrizhi.do', //仅为示例，并非真实的接口地址
        data: {
          pageNum: that.data.nextpage,
          pageSize: that.data.pageSize,
          rizhitype: that.data.rizhitype,
          begin: that.data.begin,
          end: that.data.end,
          productnum: that.data.productnum,
          rizhiuser: that.data.rizhiuser
        },
        header: header,
        success: function (res) {
          for (var i = 0; i < res.data.data[0].list.length; i++) {
            that.data.reportInfo.push(res.data.data[0].list[i])
          }
          that.setData({
            reportInfo: that.data.reportInfo,
            nextpage: res.data.data[0].nextPage,
            nextboo: res.data.data[0].hasNextPage
          })
        }
      })
    } else {
      app.alertInfo('没有更多了', 'loading', 2000)
    }
  },
  rizhicontent:function(e){
    console.log(e.currentTarget.dataset.index)
    console.log(this.data.reportInfo[e.currentTarget.dataset.index])
    var reg = new RegExp('<br>', "g")
    var regs = new RegExp('&nbsp;', "g")
    console.log(this.data.reportInfo[e.currentTarget.dataset.index].rizhicontext.replace(reg,"\n"))
    wx.setStorageSync("baobiaocontent", this.data.reportInfo[e.currentTarget.dataset.index].rizhicontext.replace(reg, "\n").replace(regs,""));
    wx.navigateTo({
      url: 'dayinreport/dayinreport'
    })
  }
})



