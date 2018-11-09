const app = getApp()
Page({
  data: {
    materialorderInfo: [],
    "seniorscre": "hidden",
    "nextpage": "1",
    "nextboo": "true",
    xinghao: "",
    materialname: "",
    materialtype: "",
    materialdaima: "",
    guige: "",
    danweiname: "",
    begintime: "",
    endtime: "",
    updatenum:"",
    updateview:"hidden",
    id:"",
    materialid:"",
    seniorscrebutton:"高级搜索"
  },
  seniorscrebutton: function() {
    if (this.data.seniorscre == 'hidden') {
      this.setData({
        seniorscre: 'show',
        nextpage: 1,
        materialtype: "",
        materialdaima: "",
        guige: "",
        danweiname: "",
        begintime: "",
        endtime: "",
        seniorscrebutton:"收起搜索"
      })
    } else {
      this.setData({
        seniorscre: 'hidden',
        nextpage: 1,
        materialtype: "",
        materialdaima: "",
        guige: "",
        danweiname: "",
        begintime: "",
        endtime: "",
        seniorscrebutton: "高级搜索"
      })
    }
    this.selectmaterialorder()
  },
  onLoad: function(e) {
    this.selectmaterialorder()
  },
  xinghao: function(e) {
    var that = this;
    that.setData({
      xinghao: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterialorder()
  },
  materialname: function(e) {
    var that = this;
    that.setData({
      materialname: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterialorder()
  },
  materialtype: function(e) {
    var that = this;
    that.setData({
      materialtype: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterialorder()
  },
  materialdaima: function(e) {
    var that = this;
    that.setData({
      materialdaima: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterialorder()
  },
  guige: function(e) {
    var that = this;
    that.setData({
      guige: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterialorder()
  },
  danweiname: function(e) {
    var that = this;
    that.setData({
      danweiname: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterialorder()
  },
  bindbeginDateChange: function(e) {
    var that = this;
    that.setData({
      begintime: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterialorder()
  },
  bindendDateChange: function(e) {
    var that = this;
    that.setData({
      endtime: e.detail.value,
      nextpage: "1"
    })
    this.selectmaterialorder()
  },

  selectmaterialorder: function(page) {
    var that = this;
    //wx.setStorageSync("username", 'username=1')
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectmaterialorder.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: page || that.data.nextpage,
        pageSize: '11',
        begin: that.data.begintime,
        end: that.data.endtime,
        danweiname: that.data.danweiname,
        materialtype: that.data.materialtype,
        materialname: that.data.materialname,
        materialdaima: that.data.materialdaima,
        guige: that.data.guige,
        xinghao: that.data.xinghao
      },
      header: header,
      success: function(res) {
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
        url: 'https://' + app.globalData.requestaddress + '/selectmaterialorder.do', //仅为示例，并非真实的接口地址
        data: {
          pageNum: that.data.nextpage,
          pageSize: '11',
          begin: that.data.begintime,
          end: that.data.endtime,
          danweiname: that.data.danweiname,
          materialtype: that.data.materialtype,
          materialname: that.data.materialname,
          materialdaima: that.data.materialdaima,
          guige: that.data.guige,
          xinghao: that.data.xinghao
        },
        header: header,
        success: function(res) {
          var arr_new = []
          arr_new.push(that.data.materialorderInfo)
          console.log(arr_new)
          arr_new.push(res.data.data[0].list)
          that.data.materialorderInfo.push(res.data.data[0].list[0])
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
  deletematerialorder: function(e) {
    var that = this;
    wx.showModal({
      title: '确定删除么？',
      content: '删除领料单',
      cancelText: '取消',
      cancelColor: '#3CC51F',
      confirmText: '确定',
      confirmColor: "#000000",
      success: function(res) {
        if (res.confirm) {
          var header;
          header = {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': wx.getStorageSync("username") //读取cookie
          };
          wx.request({
            url: 'https://' + app.globalData.requestaddress + '/deletematerialorder.do', //仅为示例，并非真实的接口地址
            data: {
              id: e.currentTarget.dataset.id
            },
            header: header,
            success: function(res) {
              app.alertInfo("成功", "success", 1000)
              that.selectmaterialorder(1)
            }
          })
        } else if (res.cancel) {}
      }
    })
  },
  updateproduce:function(e){
    this.setData({
      updateview:"show",
      id:e.currentTarget.dataset.id,
      materialid: e.currentTarget.dataset.materialid
    })
  },
  updatenum:function(e){
    this.setData({
      updatenum:e.detail.value
    })
  },
  cancle: function () {
    this.setData({
      updateview: "hidden",
      updatenum:"",
      id:"",
      materialid:"",
    })
  },
  submit:function(){
    this.updatematerialorder1()

    this.setData({
      updateview: "hidden",
      updatenum: "",
      id: "",
      materialid: "",
    })
  },
  updatematerialorder1:function(){
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/updatematerialorder1.do', //仅为示例，并非真实的接口地址
      data: {
        materialid: that.data.materialid,
        id: that.data.id,
        squarenum: that.data.updatenum
      },
      header: header,
      success: function (res) {
        app.alertInfo("成功", "success", 1000)
        that.selectmaterialorder(1)
      }
    })
  },

})