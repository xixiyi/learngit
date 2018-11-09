const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baifangkehuInfo:[],
    shichangfenxi:"",
    kehudingwei:"",
    baobiaotitle:"日报表",
    ribao: "hidden",
    zhoubao: "hidden",
    yuebao: "hidden",
    zhiwu:"",
    riqi:"",
    zonge:"",
    weekzonge:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync("baobiaocontent"))
    var baobiaocontent = wx.getStorageSync("baobiaocontent")
    var aindex = baobiaocontent.indexOf("市场分析")
    if (aindex != -1) {

      /*$(".report_type").html("日报表")*/
      var a = baobiaocontent.slice(aindex)
      var b = baobiaocontent.slice(0, aindex)

      var htmlarr = b.split("拜访客户:")
      for (var i = 0; i < htmlarr.length; i++) {
        if (htmlarr[i] == '') {
          continue;
        } else {
          var kehunameindex = htmlarr[i].indexOf("客户姓名：")
          var kehuphoneindex = htmlarr[i].indexOf("联系电话：")
          var danweinameindex = htmlarr[i].indexOf("单位名称：")
          var addressindex = htmlarr[i].indexOf("详细地址：")
          var kehuqkindex = htmlarr[i].indexOf("客户情况：")
          var kehuyjindex = htmlarr[i].indexOf("客户意见：")
          var beizhuindex = htmlarr[i].indexOf("备注：")

          var kehuname = htmlarr[i].slice(kehunameindex + 5, kehuphoneindex)
          var kehuphone = htmlarr[i].slice(kehuphoneindex + 5, danweinameindex)
          var danweiname = htmlarr[i].slice(danweinameindex + 5, addressindex)
          var address = htmlarr[i].slice(addressindex + 5, kehuqkindex)
          var kehuqk = htmlarr[i].slice(kehuqkindex + 5, kehuyjindex)
          var kehuyj = htmlarr[i].slice(kehuyjindex + 5, beizhuindex)
          var beizhu = htmlarr[i].slice(beizhuindex + 3)

          var newobj = {}
          newobj.kehuname = kehuname;
          newobj.kehuphone = kehuphone;
          newobj.danweiname = danweiname;
          newobj.address = address;
          newobj.kehuqk = kehuqk;
          newobj.kehuyj = kehuyj;
          newobj.beizhu = beizhu;
          this.data.baifangkehuInfo.push(newobj)

          var shichangfenxiindex = a.indexOf("市场分析：")
          var kehudingweiindex = a.indexOf("客户定位（星级）：")

          var shichangfenxi = a.slice(shichangfenxiindex + 5, kehudingweiindex)
          var kehudingwei = a.slice(kehudingweiindex + 9)
          this.data.shichangfenxi = shichangfenxi
          this.data.kehudingwei = kehudingwei
        }
        this.setData({
          baifangkehuInfo: this.data.baifangkehuInfo,
          shichangfenxi: this.data.shichangfenxi,
          kehudingwei: this.data.kehudingwei,
          ribao:"show"
        })
      }
    } else if (baobiaocontent.indexOf("星期一") != -1) {

      var contextval = baobiaocontent
      var contextvalarr = baobiaocontent.split("目标客户：")

      var biaotoucontent = contextvalarr[0]
      var zhiwuindex = biaotoucontent.indexOf("职务：");
      var riqiindex = biaotoucontent.indexOf("日期：");
      var zongeindex = biaotoucontent.indexOf("销售总额目标：");
      var weekzongeindex = biaotoucontent.indexOf("本周销售总额目标：");
      var xqindex = biaotoucontent.indexOf("星期");

      var zhiwu = biaotoucontent.slice(zhiwuindex + 3, riqiindex)
      var riqi = biaotoucontent.slice(riqiindex + 3, zongeindex)
      var zonge = biaotoucontent.slice(zongeindex + 7, weekzongeindex)
      var weekzonge = biaotoucontent.slice(weekzongeindex + 9, xqindex)
      console.log(zonge)
      console.log(weekzonge)


      var riqiindex1 = riqi.indexOf("周")

      riqi = riqi.slice(0, riqiindex1 - 1) + "第" + riqi.slice(riqiindex1 - 1, riqiindex1) + "周"

      this.data.zhiwu = zhiwu
      this.data.riqi = riqi
      this.data.zonge = zonge
      this.data.weekzonge = weekzonge

      for (var i = 1; i < contextvalarr.length; i++) {
        var middlecontentval = contextvalarr[i];

        var jihuamudetimeindex = middlecontentval.indexOf("计划拜访目的及时间：");
        var qingkongindex = middlecontentval.indexOf("计划实施完成情况：");
        var beizhuindex = middlecontentval.indexOf("备注：");
        var xingqiindex = middlecontentval.indexOf("星期");


        var kehuname = middlecontentval.slice(0, jihuamudetimeindex)
        var mudiandtime = middlecontentval.slice(jihuamudetimeindex + 10, qingkongindex)
        var qingkong = middlecontentval.slice(qingkongindex + 9, beizhuindex)
        var beizhu = middlecontentval.slice(beizhuindex + 3, xingqiindex)

        var newobj = {}
        newobj.kehuname = kehuname;
        newobj.mudiandtime = mudiandtime;
        newobj.qingkong = qingkong;
        newobj.beizhu = beizhu;
        this.data.baifangkehuInfo.push(newobj)
      }
      this.setData({
        baifangkehuInfo: this.data.baifangkehuInfo,
        baobiaotitle :"周报表",
        riqi:this.data.riqi,
        zhiwu:this.data.zhiwu,
        zonge: this.data.zonge,
        weekzonge: this.data.weekzonge,
        zhoubao:"show"
      })
    } else {

      var htmlcontentarr = baobiaocontent.split("时间：")

      var biaotoucontent = htmlcontentarr[0];

      var zhiwuindex = biaotoucontent.indexOf("职务：");
      var riqiindex = biaotoucontent.indexOf("日期：");
      var zongeindex = biaotoucontent.indexOf("销售总额目标：");

      var zhiwu = biaotoucontent.slice(zhiwuindex + 3, riqiindex)
      var riqi = biaotoucontent.slice(riqiindex + 3, zongeindex)
      var zonge = biaotoucontent.slice(zongeindex + 7)

      this.data.zhiwu = zhiwu
      this.data.riqi = riqi
      this.data.zonge = zonge

      for (var i = 1; i < htmlcontentarr.length; i++) {

        var quyuindex = htmlcontentarr[i].indexOf("区域：")
        var laokehuindex = htmlcontentarr[i].indexOf("老客户：")
        var xinkehuindex = htmlcontentarr[i].indexOf("新客户：")



        var shijian = htmlcontentarr[i].slice(0, quyuindex)
        var quyu = htmlcontentarr[i].slice(quyuindex + 3, laokehuindex)
        var laokehu = htmlcontentarr[i].slice(laokehuindex + 4, xinkehuindex)
        var xinkehu = htmlcontentarr[i].slice(xinkehuindex + 4)

        var newobj = {}
        newobj.shijian = shijian;
        newobj.quyu = quyu;
        newobj.laokehu = laokehu;
        newobj.xinkehu = xinkehu;
        this.data.baifangkehuInfo.push(newobj)

      }
      this.setData({
        baifangkehuInfo: this.data.baifangkehuInfo,
        baobiaotitle: "月报表",
        riqi: this.data.riqi,
        zhiwu: this.data.zhiwu,
        zonge: this.data.zonge,
        yuebao: "show"
      })

      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})