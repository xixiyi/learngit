const app = getApp()
Page({
  data: {
    phone: '',
    password: ''
  }, 
  onLoad:function(){
    var NowTime = datetimestr();
    var oldTime = wx.getStorageSync("logintime");
    if (NowTime==oldTime){
      wx.redirectTo({
        url: '../index/index'
      })
    }
    //wx.clearStorage()
    //console.log(wx.getStorageSync("username"))
    //console.log(datetimestr())
  },
  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: app.makeSign(e.detail.value)
    })
  },

  // 登录 
  login: function () {
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      app.alertInfo('都不能为空', 'loading', 2000)
    } else {
      wx.request({
        url: 'https://' + app.globalData.requestaddress+'/login.do', //仅为示例，并非真实的接口地址
        data: {
          phone: this.data.phone,
          password: this.data.password
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data.status)
          if (res.data.status==0){
             // 这里修改成跳转的页面 
            app.alertInfo('登录成功','success',2000)
            var uid = res.data.data.uid;
            wx.setStorageSync("username", 'username='+uid);
            wx.setStorageSync("logintime", datetimestr());
            wx.setStorageSync("bumenname", res.data.data.bumenname);
            wx.redirectTo({
              url: '../index/index'
            })
          } else if (res.data.status == 1) {
            app.alertInfo('账号没有注册', 'loading', 2000)
          } else if (res.data.status == 2) {
            app.alertInfo('您的密码错误', 'loading', 2000)
          } else if (res.data.status == 3) {
            app.alertInfo('请用电脑登录', 'loading', 2000)
          } else if (res.data.status == 4) {
            app.alertInfo('请用公司电脑', 'loading', 2000)
          }
        }
      })
    }
  }
})

function datetimestr(){
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  //获取当前时间
  var n = timestamp * 1000;
  var date = new Date(n);
  //年
  var Y = date.getFullYear();
  //月
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return Y+"-"+M+"-"+D
}