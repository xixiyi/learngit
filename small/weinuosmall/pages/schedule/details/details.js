const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xqInfo:{},
    kehuxinghao:"",
    mishu:"",
    jindu1: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.selectshengchanribaobyxq()

  },
  selectshengchanribaobyxq:function(){
    var that = this;
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectshengchanribaobyxq.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100,
        kehuphone:wx.getStorageSync("kehuphone")||"",
        kehuxinghao: wx.getStorageSync("xinghao") || "",
        xinghao: wx.getStorageSync("caimoxinghao")
      },
      header: header,
      success: function (res) {
        console.log(res.data.data)
        var xinghao = "";
        for(var i =0;i<res.data.data.length;i++){
          var obj = res.data.data[i]
          if(obj.xinghao!=xinghao){
            xinghao = obj.xinghao;
            obj.class="show"
          }else{
            obj.class = "hidden"
          }
          var chengpinnum = obj.chengpinnum
          var cipinnum = obj.cipinnum
          obj.getmaterialnum = Number(chengpinnum) + Number(cipinnum)
          res.data.data[i] = obj
        }
        that.setData({
          xqInfo:res.data.data,
          kehuxinghao: wx.getStorageSync("xinghao"),
          mishu: wx.getStorageSync("mishu"),
          jindu1:100
        })
      }
    })
  }

  
})