const app = getApp()
var addhtml = ''
Page({
  data: {
    invenInfo: [{
      kehuname: "",
      kehuphone: "",
      address: "",
      kehuqk: "",
      danweiname: "",
      kehuyj: "",
      beizhu: "",
      showOrhide: "hidden"
    }],
    luxian: "",
    pingjia: ""
  },
  imageAdd: function() {
    var arr_new = []
    var obj = {};
    obj.kehuname = "";
    obj.kehuphone = "";
    obj.address = "";
    obj.kehuqk = "";
    obj.danweiname = "";
    obj.kehuyj = "";
    obj.beizhu = "";
    this.data.invenInfo.push(obj)
    arr_new = this.data.invenInfo
    console.log(arr_new)
    this.setData({
      invenInfo: arr_new
    })
  },
  delDom: function(e) {
    console.log(e)
    var arr_new = []
    var delindex = e.currentTarget.dataset.index;
    for (var i = 0; i < this.data.invenInfo.length; i++) {
      if (i == delindex) {
        continue;
      } else {
        arr_new.push(this.data.invenInfo[i])
      }
    }
    this.setData({
      invenInfo: arr_new
    })
  },
  kehuname: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.invenInfo[index].kehuname = e.detail.value;
    console.log(this.data.invenInfo)
  },
  kehuphone: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.invenInfo[index].kehuphone = e.detail.value;
    console.log(this.data.invenInfo)
  },
  danweiname: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.invenInfo[index].danweiname = e.detail.value;
    console.log(this.data.invenInfo)
  },
  address: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.invenInfo[index].address = e.detail.value;
    console.log(this.data.invenInfo)
  },
  kehuqk: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.invenInfo[index].kehuqk = e.detail.value;
    console.log(this.data.invenInfo)
  },
  kehuyj: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.invenInfo[index].kehuyj = e.detail.value;
    console.log(this.data.invenInfo)
  },
  beizhu: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.invenInfo[index].beizhu = this.filteremoji(e.detail.value);
    this.setData({
      invenInfo:this.data.invenInfo
    })
    console.log(this.data.invenInfo)
    console.log(this.data.luxian)
    console.log(this.data.pingjia)
  },
  luxian: function(e) {
    this.data.luxian = this.filteremoji(e.detail.value);
    console.log(this.data.luxian)
    this.setData({
      luxian: this.data.luxian
    })
  },
  pingjia: function(e) {
    this.data.pingjia = this.filteremoji(e.detail.value);
    this.setData({
      pingjia: this.data.pingjia
    })
    console.log(this.data.pingjia)
  },
  submit: function(e) {
    console.log(this.data.invenInfo)
    console.log(this.data.luxian)
    console.log(this.data.pingjia)

    var kehunames = "";
    var kehuphones = "";
    var danweinames = "";
    var addresss = "";
    var kehuqks = "";
    var kehuyjs = "";
    var beizhus = "";
    var douhao = ",";
    for (var i = 0; i < this.data.invenInfo.length; i++) {
      if (i == this.data.invenInfo.length - 1) {
        douhao = "";
      }
      kehunames = kehunames + this.data.invenInfo[i].kehuname + douhao;
      kehuphones = kehuphones + this.data.invenInfo[i].kehuphone + douhao;
      danweinames = danweinames + this.data.invenInfo[i].danweiname + douhao;
      addresss = addresss + this.data.invenInfo[i].address + douhao;
      kehuqks = kehuqks + this.data.invenInfo[i].kehuqk + douhao;
      kehuyjs = kehuyjs + this.data.invenInfo[i].kehuyj + douhao;
      beizhus = beizhus + this.data.invenInfo[i].beizhu + douhao;
    }
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/insertshangyouribaobiao.do', //仅为示例，并非真实的接口地址
      data: {
        kehuname: kehunames,
        kehuphone: kehuphones,
        danweiname: danweinames,
        address: addresss,
        kehuqk: kehuqks,
        kehuyj: kehuyjs,
        beizhu: beizhus,
        luxian: this.data.luxian,
        pingjia: this.data.pingjia
      },
      header: header,
      success: function(res) {
        console.log(res.data)
        app.alertInfo('上传成功', 'success', 2000)
      }
    })
  },
  filteremoji: function(e) {
    if (e == '' || e == null || e == 'undefined' || e == ' ') {
      return e;
    }
    var ranges = [
      '\ud83c[\udf00-\udfff]',
      '\ud83d[\udc00-\ude4f]',
      '\ud83d[\ude80-\udeff]'
    ];
    e = e.replace(new RegExp(ranges.join('|'), 'g'), '');
    return e;
  }

})