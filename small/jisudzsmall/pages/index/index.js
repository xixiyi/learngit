//index.js
//获取应用实例
const app = getApp()

function initSubMenuDisplay() {
  return ['hidden', 'hidden', 'hidden','hidden','hidden','hidden','hidden','hidden'];
}
//声明初始化高亮状态数组
function initSubMenuHighLight() {    
  return [
    ['',''],
    ['', ''],
    ['', '', '', '',''],
    ['', ''],
    ['', '', '',''],
    ['','',''],
    ['','','']
  ];
}
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    subMenuDisplay: initSubMenuDisplay(),
    shouquanbutton:"",
    huanjieList: [{ "huanjiename": "基材" }, { "huanjiename": "底料" }, { "huanjiename": "划料" }]
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      this.setData({
        userInfo:e.detail.userInfo,
        hasUserInfo:true,
        shouquanbutton:"hidden"
      })
    } else {
      //用户按了拒绝按钮
    }
  },
  tapMainMenu: function (e) {//                                获取当前显示的一级菜单标识
    var index = parseInt(e.currentTarget.dataset.index);    // 生成数组，全为hidden的，只对当前的进行显示
    var newSubMenuDisplay = initSubMenuDisplay();//            如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
    if (this.data.subMenuDisplay[index] == 'hidden') {
      newSubMenuDisplay[index] = 'show';
    } else {
      newSubMenuDisplay[index] = 'hidden';
    }        // 设置为新的数组
    this.setData({
      subMenuDisplay: newSubMenuDisplay
    });
  },
  //设置页面跳转
  inven: function(e){
    wx.navigateTo({
      url: '../inven/inven'
    })
  },
  insertdayreport:function(e){
    wx.setStorageSync("ribaoobj", "")
    wx.navigateTo({
      url: '../produce/insertproduce/insertproduce'
    })
  },
  selectdayreport: function (e) {
    wx.navigateTo({
      url: '../produce/selectproduce/selectproduce'
    })
  },
  selectallorder: function () {
    wx.navigateTo({
      url: '../schedule/all/all'
    })
  },
  selectneworder:function(){
    wx.navigateTo({
      url: '../schedule/new/new'
    })
  },
  selectreceivedorder: function () {
    wx.navigateTo({
      url: '../schedule/received/received'
    })
  },
  selectcompleteorder: function () {
    wx.navigateTo({
      url: '../schedule/complete/complete'
    })
  },
  selectcancleorder: function () {
    wx.navigateTo({
      url: '../schedule/cancle/cancle'
    })
  },
  insertshengchanyeji: function (e) {
    wx.navigateTo({
      url: '../achievement/insertachievement/insertachievement'
    })
  },
  selectshengchanyeji: function (e) {
    wx.navigateTo({
      url: '../achievement/selectachievement/selectachievement'
    })
  },
  dayreport:function(e){
    wx.navigateTo({
      url: '../report/dayreport/dayreport'
    })
  },
  selectreport:function(e){
    wx.navigateTo({
      url: '../report/selectreport/selectreport',
    })
  },
  weekreport: function (e) {
    wx.navigateTo({
      url: '../report/weekreport/weekreport'
    })
  },
  monthreport: function (e) {
    wx.navigateTo({
      url: '../report/monthreport/monthreport'
    })
  },
  materialdetail:function(e){
    wx.navigateTo({
      url: '../material/materialdetail/materialdetail'
    })
  },
  getmaterial: function (e) {
    wx.navigateTo({
      url: '../material/getmaterial/getmaterial'
    })
  },
  getmaterialselect: function (e) {
    wx.navigateTo({
      url: '../material/getmaterialselect/getmaterialselect'
    })
  },
  huanjietongji: function (e) {
    var huanjiename = e.currentTarget.dataset.huanjiename
    console.log(huanjiename)
    console.log(e)
    wx.setStorageSync("tongjihuanjiename", huanjiename)
    wx.navigateTo({
      url: '../tongjiproduce/tongjiproduce'
    })
  },
  selectshengchanhuanjie: function () {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectdishuanjie.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100,
        xcxu:1
      },
      header: header,
      success: function (res) {
        var arr = []
        for(var i=0;i<res.data.data[0].list.length;i++){
          arr[i] = ""
        }
        var newSubMenuHighLight = initSubMenuHighLight();// 与一级菜单不同，这里不需要判断当前状态，只需要点击就给class赋予highlight即可
        newSubMenuHighLight[6] = arr ;
        that.setData({
          huanjieList: res.data.data[0].list,
          subMenuHighLight: newSubMenuHighLight
        })
      }
    })
  },

  //获取当前显示的一级菜单标识
 
  tapSubMenu: function (e) {        // 隐藏所有一级菜单
  
    // 处理二级菜单，首先获取当前显示的二级菜单标识
    var indexArray = e.currentTarget.dataset.index.split('-'); console.log("indexArray : " + indexArray);
    var newSubMenuHighLight = initSubMenuHighLight();// 与一级菜单不同，这里不需要判断当前状态，只需要点击就给class赋予highlight即可
    newSubMenuHighLight[indexArray[0]][indexArray[1]] = 'highlight';
    console.log(newSubMenuHighLight);// 设置为新的数组
    this.setData({
      subMenuHighLight: newSubMenuHighLight
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.showModal({
      title: '确定退出么？',
      content: '客官大人，请不要走哇',
      cancelText:'不忍留下',
      cancelColor:'#3CC51F',
      confirmText:'狠心离开',
      confirmColor: "#000000",
      success: function (res) {
        if (res.confirm) {
          wx.clearStorage()
          wx.reLaunch({
            url: '../login/login'
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  onLoad: function () {
    this.selectshengchanhuanjie()
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        shouquanbutton:"hidden"
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          shouquanbutton: "hidden"
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            shouquanbutton: "hidden"
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})