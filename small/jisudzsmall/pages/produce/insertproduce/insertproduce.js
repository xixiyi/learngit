const app = getApp()
var prom = require("../../../utils/prom.js");
var formattime = require("../../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: "",
    zhongdiliaoList: {},
    yawenList: {},
    yawenListHide: "hidden",
    yawen: "",
    jicaiguigeList: {},
    yanseList: {},
    gangweiList: {},
    gangweiListHide: "hidden",
    gangwei: "",
    ispingfen: "",
    shengchantypeList: {},
    banciList: {},
    banciListHide: "hidden",
    banci: "",
    butieList: {},
    butie: "0",
    butieListHide: "hidden",
    ribaonameList: {},
    kehuphoneList: {},
    kehuphonelistHide: "hidden",
    bianhaoList: [],
    bianhaoListHide: "hidden",
    kehuphone: "",
    bianhao: "",
    shengchantypeListHide: "hidden",
    huanjienameList: [],
    huanjienameListHide: "hidden",
    huanjiename: "",
    shengchanhuanjieguigetype: "",
    ckhouList: {},
    ckhouListHide: "hidden",
    guige: "",
    huanjiecipinList: {},
    xingguangongxuList: {},
    qitagongxuList: {},
    baiyeList: [{
      baiye: '白班'
    }, {
      baiye: '夜班'
    }],
    baiyeListHide: "hidden",
    baiye: "白班",
    jiabanListInfo: [{
      jiaban: '是'
    }, {
      jiaban: '否'
    }],
    jiabanListHide: "hidden",
    jiaban: "否",
    beizhu: "",
    prePage: "1",
    nextPage: "2",
    hasNextPage: "",
    hasPreviousPage: "",
    gangweiview: "hidden",
    name: "",
    gongshi: "",
    tuochangongshi: "",
    bili: "",
    namecontent: "",
    cipincontentarr: [],
    qitagongxucontentarr: [],
    xingguangongxucontentarr: [],
    renshu: 0,
    index: "",
    nextribaopage: 9,
    kehuxinghao: "",
    zhankaiorhebing: "zhankai",
    buttonzhankaititle: "展开",
    cailiaoListInfo: [],
    cailiaoListHide: "hidden",
    cailiao: "",
    cailiaoHide: "hidden",
    peifangListInfo: [],
    peifangListHide: "hidden",
    peifangHide: "hidden",
    peifang: "",
    num: "",
    shengchantypename: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  seniorscrebutton:function(){
    wx.redirectTo({
      url: '../selectproduce/selectproduce'
    })
  },
  onLoad: function(options) {
    var ribaoobj = wx.getStorageSync("ribaoobj")
    console.log(ribaoobj)
    if (ribaoobj != undefined && ribaoobj != '') {
      var cipinyuanyincontent = ribaoobj.cipinyuanyincontent
      var xingguangongxucontent = ribaoobj.xingguangongxucontent
      var qitagongxucontent = ribaoobj.qitagongxucontent
      var beizhu = ribaoobj.beizhuinfo
      beizhu = beizhu == 'undefined' ? "" : beizhu
      var banci = ribaoobj.banci.split("(")[0]
      var baiye = ribaoobj.banci.split("(")[1].split(")")[0]
      var renshu = ribaoobj.baocunnametext.split("，").length-1
      this.setData({
        kehuphone: ribaoobj.kehuphone,
        jiaban: ribaoobj.isjiaban,
        cailiao: ribaoobj.cailiao,
        peifang: ribaoobj.peifang,
        bianhao: ribaoobj.xinghao,
        shengchantypename: ribaoobj.type,
        huanjiename: ribaoobj.huanjie,
        time: ribaoobj.pici,
        guige: ribaoobj.guige,
        yawen: ribaoobj.yawen,
        num: ribaoobj.chengpinnum,
        beizhu: beizhu,
        banci: banci,
        baiye: baiye,
        butie: 0,
        namecontent: ribaoobj.baocunnametext,
        renshu:renshu
      })
      this.selectqitagongxuname(ribaoobj.huanjie, qitagongxucontent)
      this.selecthuanjiexingguangongxu(ribaoobj.huanjie, xingguangongxucontent)
      this.selecthuanjiecipin(ribaoobj.huanjie, cipinyuanyincontent)
      this.selectpeifang(ribaoobj.huanjie)
      this.selectmaterial(ribaoobj.xinghao)
      this.selectgangwei(ribaoobj.huanjie)
    }else{
      var bumenname = wx.getStorageSync("bumenname");
      var bumennamearr = bumenname.split(",");
      for (var i = 0; i < bumennamearr.length; i++) {
        var obj = {}
        obj.shengchanhuanjiename = bumennamearr[i]
        this.data.huanjienameList.push(obj)
      }
      this.setData({
        time: formattime.formatTime(new Date()),
        huanjienameList: this.data.huanjienameList,
        huanjiename: bumennamearr[0]
      })
      if (bumennamearr[0] == '基材') {
        this.selectguigeguanlian("WPC基材", 2)
      } else if (bumennamearr[0] == '底料') {
        this.selectguigeguanlian("", 3)
      } else {
        this.selectjine(bumennamearr[0])
      }
      this.selectpeifang(bumennamearr[0])

      this.selectribaobiaoname(bumennamearr[0], this.data.banci)
      this.selectgangwei(bumennamearr[0])
      this.selecthuanjiecipin(bumennamearr[0])
      this.selecthuanjiexingguangongxu(bumennamearr[0])
      this.selectqitagongxuname(bumennamearr[0])
      if (bumennamearr[0] == '划料' && this.data.cailiaoListInfo.length > 0) {
        this.setData({
          cailiaoHide: "show",
          cailiaoListHide: "show"
        })
      } else {
        this.setData({
          cailiaoHide: "hidden",
          cailiao: "",
          cailiaoListHide: "hidden"
        })
      }
    }
    this.selectzhongdiliao()
    this.selectyawen()
    this.selectjicaiguige()
    this.selectyanse()
    this.selectshengchantype()
    this.selectbanci()
    this.selectbutie()

  },
  ribaogangweicancle: function() {
    this.setData({
      gangwei: "",
      bili: "",
      gongshi: "",
      tuochangongshi: "",
      gangweiview: "hidden"
    })
  },
  bili: function(e) {
    this.setData({
      bili: e.detail.value
    })
  },
  tuochangongshi: function(e) {
    this.setData({
      tuochangongshi: e.detail.value
    })
  },
  gongshi: function(e) {
    this.setData({
      gongshi: e.detail.value
    })
  },
  /*下拉选项弹出 */
  xinghao: function() {
    this.setData({
      bianhaoListHide: "show"
    })
  },
  shengchantype: function() {
    this.setData({
      shengchantypeListHide: "show"
    })
  },
  shengchanhuanjie: function() {
    this.setData({
      huanjienameListHide: "show"
    })
  },
  guige: function() {
    this.setData({
      ckhouListHide: "show"
    })
  },
  yawen: function() {
    this.setData({
      yawenListHide: "show"
    })
  },
  banci: function() {
    this.setData({
      banciListHide: "show"
    })
  },
  baiye: function() {
    this.setData({
      baiyeListHide: "show"
    })
  },
  butie: function() {
    this.setData({
      butieListHide: "show"
    })
  },
  /*下拉选项弹出 */
  bindbeginDateChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  clickpeifang: function(e) {
    this.setData({
      peifang: e.currentTarget.dataset.peifangname,
      peifangListHide: "hidden"
    })
  },
  peifang: function() {
    this.setData({
      peifangListHide: "show"
    })
  },
  clickjiaban: function(e) {
    this.setData({
      jiaban: e.currentTarget.dataset.jiaban,
      jiabanListHide: "hidden"
    })
  },
  jiaban: function() {
    this.setData({
      jiabanListHide: "show"
    })
  },
  clickcailiao: function(e) {
    this.setData({
      cailiao: e.currentTarget.dataset.cailiao,
      cailiaoListHide: "hidden"
    })
  },
  cailiao: function() {
    this.setData({
      cailiaoListHide: "show"
    })
  },
  clickbutie: function(e) {
    this.setData({
      butie: e.currentTarget.dataset.butiejine,
      butieListHide: "hidden"
    })
  },
  clickckhou: function(e) {
    this.setData({
      guige: e.currentTarget.dataset.guige,
      ckhouListHide: "hidden"
    })
  },
  clickbanciname: function(e) {
    this.setData({
      banci: e.currentTarget.dataset.banciname,
      banciListHide: "hidden",
      zhankaiorhebing: "zhankai",
      buttonzhankaititle: "展开",

    })
    this.selectribaobiaoname(this.data.huanjiename, e.currentTarget.dataset.banciname)
  },
  clickbaiye: function(e) {
    this.setData({
      baiye: e.currentTarget.dataset.baiye,
      baiyeListHide: "hidden"
    })
  },
  clickyawenname: function(e) {
    this.setData({
      yawen: e.currentTarget.dataset.yawenname,
      yawenListHide: "hidden"
    })
  },
  clickshengchantypename: function(e) {
    this.setData({
      shengchantypeListHide: "hidden",
      shengchantypename: e.currentTarget.dataset.shengchantypename,
      huanjienameListHide: "show"
    })
    this.selectshengchanhuanjie()
  },
  selectjine:function(huanjiename){
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectjine.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100,
        huanjiename: huanjiename,
        gangweiid: "",
        gangweiguige: ""
      },
      header: header,
      success: function (res) {
        var data = res.data.data[0].list
        that.data.ckhouList = []
        for(var i=0;i<data.length;i++){
          var obj = {}
          obj.guige = data[i].gangweiguige
          that.data.ckhouList.push(obj)
        }
        that.setData({
          ckhouList: that.data.ckhouList
        })
      }
    })
  },
  function() {
    this.sort();//排序
    var n = [this[0]];
    for (var i = 1; i < this.length; i++) {
      if (this[i] !== n[n.length - 1]) {
        n.push(this[i]);
      }
    }
    return n;
  },
  selectshengchanhuanjie: function() {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectshengchanhuanjie.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100,
        isbumenname: 1,
        shengchantypename: that.data.shengchantypename
      },
      header: header,
      success: function(res) {
        that.setData({
          huanjienameList: res.data.data[0].list
        })
      }
    })
  },
  kehuphone: function(e) {
    var result = this.selectdingdanhao(e.detail.value, "", "", "", 1)
  },
  clickkehuphone: function(e) {
    console.log(e)
    this.selectdingdanhao(e.currentTarget.dataset.kehuphone, "", "", "", 2)
  },
  clickbianhao: function(e) {
    this.selectdingdanhao(this.data.kehuphone, e.currentTarget.dataset.bianhao, "", "", 3)
    this.selectmaterial(e.currentTarget.dataset.bianhao)
  },
  clickhuanjiename: function(e) {
    this.selectdingdanhao(this.data.kehuphone, this.data.bianhao, this.data.shengchantypename, e.currentTarget.dataset.shengchanhuanjiename, 4)
    this.selectribaobiaoname(e.currentTarget.dataset.shengchanhuanjiename, this.data.banci)
    this.selectgangwei(e.currentTarget.dataset.shengchanhuanjiename)
    this.selecthuanjiecipin(e.currentTarget.dataset.shengchanhuanjiename)
    this.selecthuanjiexingguangongxu(e.currentTarget.dataset.shengchanhuanjiename)
    this.selectqitagongxuname(e.currentTarget.dataset.shengchanhuanjiename)
    this.selectpeifang(e.currentTarget.dataset.shengchanhuanjiename)
    if (e.currentTarget.dataset.shengchanhuanjiename == '划料' && this.data.cailiaoListInfo.length > 0) {
      this.setData({
        cailiaoHide: "show",
        cailiaoListHide: "show"
      })
    } else {
      this.setData({
        cailiaoHide: "hidden",
        cailiao: "",
        cailiaoListHide: "hidden"
      })
    }
  },
  selectpeifang: function(huanjiename) {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectpeifang.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100,
        count: 1,
        peifangname: huanjiename+"--"
      },
      header: header,
      success: function(res) {
        that.setData({
          peifangListInfo: res.data.data[0].list
        })
        if (res.data.data[0].list.length > 0) {
          that.setData({
            peifangHide: "show"
          })
        }
      }
    })
  },
  selectmaterial: function(xinghao, cailiao) {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectmaterial.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100,
        xinghao: xinghao
      },
      header: header,
      success: function(res) {
        console.log(res.data.data[0].list)
        that.data.cailiaoListInfo = []
        var dataarr = res.data.data[0].list
        for (var i = 0; i < dataarr.length; i++) {
          if (xinghao == dataarr[i].xinghao) {
            var guanlianxinghao = dataarr[i].guanlianxinghao
            var arr = guanlianxinghao.split(",")
            var weiyi = ""
            for (var j = 0; j < arr.length; j++) {
              var obj = {}
              if (arr[j] != weiyi) {
                obj.cailiao = arr[j]
                weiyi = arr[j];
                that.data.cailiaoListInfo.push(obj)
              }
            }
            var hos = "hidden"
            if(that.data.huanjiename=='划料'&&that.data.cailiaoListInfo.length!=0){
              hos = 'show'
            }
            that.setData({
              cailiaoListInfo: that.data.cailiaoListInfo,
              cailiaoHide:hos,
              cailiao:"",
              cailiaoListHide:hos
            })
          }
        }
      }
    })
  },
  selectdingdanhao: function(kehuphone, bianhao, type, huanjiename, count) {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectdingdanhao.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100,
        kehuphone: kehuphone,
        bianhao: bianhao,
        type: type || "",
        huanjiename: huanjiename
      },
      header: header,
      success: function(res) {
        that.setData({
          selectdingdanhaoResult: res.data.data
        })
        if (count == 1) {
          console.log(res.data.data)
          that.setData({
            kehuphoneList: res.data.data,
            kehuphonelistHide: "show"
          })
        } else if (count == 2) {
          console.log(res)
          that.data.bianhaoList = []
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].kehuphone == kehuphone) {
              var objarr = res.data.data[i].bianhao.split(",")
              for (var j = 0; j < objarr.length; j++) {
                var obj = {}
                obj.bianhao = objarr[j];
                that.data.bianhaoList.push(obj)
              }
            }
          }
          that.setData({
            bianhaoList: that.data.bianhaoList,
            kehuphonelistHide: "hidden",
            bianhaoListHide: "show",
            kehuphone: kehuphone
          })
          console.log(that.data.bianhaoList)
        } else if (count == 3) {
          that.data.shengchantypeList = []
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].kehuphone == kehuphone) {
              var objarr = res.data.data[i].type.split(",")
              for (var j = 0; j < objarr.length; j++) {
                var obj = {}
                obj.shengchantypename = objarr[j];
                that.data.shengchantypeList.push(obj)
              }
            }
          }
          console.log(that.data.shengchantypeList)
          that.setData({
            bianhao: bianhao,
            bianhaoListHide: "hidden",
            shengchantypeListHide: "hidden",
            shengchantypeList: that.data.shengchantypeList,
            shengchantypename: that.data.shengchantypeList[0].shengchantypename,
            huanjienameListHide: "show"
          })
          that.selectshengchanhuanjie()
        } else if (count == 4) {
          that.data.ckhouList = []
          that.data.yawenList = []
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].kehuphone == kehuphone) {
              var objarr = res.data.data[i].ckhou.split(",")
              for (var j = 0; j < objarr.length; j++) {
                var obj = {}
                obj.guige = objarr[j];
                that.data.ckhouList.push(obj)
              }
              var objarr1 = res.data.data[i].yawen.split(",")
              for (var j = 0; j < objarr1.length; j++) {
                var obj = {}
                obj.yawenname = objarr1[j];
                that.data.yawenList.push(obj)
              }
            }
          }
          console.log(that.data.ckhouList)
          console.log(res.data.data[0].kehuxinghao)
          var yawen = ""
          var guige = ""
          if (that.data.yawenList.length != 0) {
            yawen = that.data.yawenList[0].yawenname
          } else {
            yawen = ""
          }
          if (that.data.ckhouList.length != 0) {
            guige = that.data.ckhouList[0].guige
          } else {
            guige = ""
            if (huanjiename == '基材') {
              that.selectguigeguanlian('WPC基材', 2)
            } else if (huanjiename == '底料') {
              that.selectguigeguanlian('', 3)
            }
          }
          that.setData({
            huanjiename: huanjiename,
            shengchanhuanjieguigetype: type || "",
            huanjienameListHide: "hidden",
            ckhouList: that.data.ckhouList,
            yawenList: that.data.yawenList,
            yawenListHide: "hidden",
            yawen: yawen,
            guige: guige,
            butie: "0",
            kehuxinghao: res.data.data[0].kehuxinghao || ""
          })
        }
      }
    })
  },
  prePage: function(e) {
    console.log(13)
    if (!this.data.hasPreviousPage) {
      app.alertInfo("已是首页", 'loading', 1000)
    } else {
      this.selectribaobiaoname(this.data.huanjiename, this.data.banci, "", e.currentTarget.dataset.page)
    }
  },
  zhankai: function(e) {
    this.selectribaobiaoname(this.data.huanjiename, this.data.banci, "", 1, 10000)
    this.setData({
      zhankaiorhebing: "hebing",
      buttonzhankaititle: "收起"
    })
  },
  hebing: function(e) {
    this.selectribaobiaoname(this.data.huanjiename, this.data.banci, "", 1, 8)
    this.setData({
      zhankaiorhebing: "zhankai",
      buttonzhankaititle: "展开"
    })
  },
  nextPage: function(e) {
    console.log(123)
    if (!this.data.hasNextPage) {
      app.alertInfo("已是尾页", 'loading', 1000)
    } else {
      this.selectribaobiaoname(this.data.huanjiename, this.data.banci, "", e.currentTarget.dataset.page)
    }
  },
  ribaonamejiansuo: function(e) {
    this.selectribaobiaoname("", this.data.banci, e.detail.value)
  },
  selectribaobiaoname: function(huanjiename, banci, name, page, size) {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectribaobiaoname.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: page || 1,
        pageSize: size || 8,
        zhiwei: huanjiename || "",
        banci: banci || "",
        name: name || "",
        count: 1
      },
      header: header,
      success: function(res) {
        console.log("查询日报姓名" + res.data.data[0].list)
        var prePage = res.data.data[0].prePage
        if (prePage == 0) {
          prePage = 1;
        }
        var nextPage = res.data.data[0].nextPage
        var nextribaopage = (res.data.data[0].nextPage - 1) * 8 + 1
        if (nextPage == 0) {
          nextPage = 1;
          nextribaopage = 9
        }
        that.setData({
          ribaonameList: res.data.data[0].list,
          prePage: prePage,
          nextPage: nextPage,
          hasNextPage: res.data.data[0].hasNextPage,
          hasPreviousPage: res.data.data[0].hasPreviousPage,
          nextribaopage: nextribaopage
        })
      }
    })
  },
  selectbutie: function() {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectbutie.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100
      },
      header: header,
      success: function(res) {
        console.log(res.data.data[0].list)
        that.setData({
          butieList: res.data.data[0].list
        })
      }
    })
  },
  clickgangwei: function(e) {
    this.setData({
      gangwei: e.currentTarget.dataset.zhiwei,
      ispingfen: e.currentTarget.dataset.ispingfen,
      gangweiListHide: "hidden"
    })
  },
  gangwei: function() {
    this.setData({
      gangweiListHide: "show"
    })
  },
  gangweibutton: function(e) {
    this.setData({
      gangweiview: "show",
      name: e.currentTarget.dataset.name,
      index: e.currentTarget.dataset.index
    })
    wx.pageScrollTo({
      scrollTop: 1185
    })
  },
  selectbanci: function() {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectbanci.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100
      },
      header: header,
      success: function(res) {
        console.log(res.data.data[0].list)
        that.setData({
          banciList: res.data.data[0].list,
          banci: res.data.data[0].list[0].banciname
        })
        that.selectribaobiaoname(that.data.shengchanhuanjiename, that.data.banci)
      }
    })
  },
  selectshengchantype: function() {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectshengchantype.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100
      },
      header: header,
      success: function(res) {
        console.log(res.data.data[0].list)
        that.setData({
          shengchantypeList: res.data.data[0].list
        })
      }
    })
  },
  selectgangwei: function(huanjiename) {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectgangwei.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100,
        huanjie: huanjiename || "",
        shengchantypename: ""
      },
      header: header,
      success: function(res) {
        console.log("查询岗位" + res)
        that.setData({
          gangweiList: res.data.data[0].list
        })
      }
    })
  },
  selectyanse: function() {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectyanse.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100
      },
      header: header,
      success: function(res) {
        console.log(res.data.data[0].list)
        that.setData({
          yanseList: res.data.data[0].list
        })
      }
    })
  },
  selectjicaiguige: function() {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectjicaiguige.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100
      },
      header: header,
      success: function(res) {
        console.log(res.data.data[0].list)
        that.setData({
          jicaiguigeList: res.data.data[0].list
        })
      }
    })
  },
  selectguigeguanlian: function(typename, count) {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectguigeguanlian.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100,
        typename: typename,
        count: count
      },
      header: header,
      success: function(res) {
        if (count == 2) {
          that.data.ckhouList = []
          for (var i = 0; i < res.data.data[0].list.length; i++) {
            var obj = {}
            if (res.data.data[0].list[i].jicaiguige != '') {
              obj.guige = res.data.data[0].list[i].jicaiguige
              that.data.ckhouList.push(obj)
            }
          }
          that.setData({
            ckhouList: that.data.ckhouList
          })
        } else if (count == 3) {
          that.data.ckhouList = []
          for (var i = 0; i < res.data.data[0].list.length; i++) {
            var obj = {}
            if (res.data.data[0].list[i].yuanguige != '') {
              obj.guige = res.data.data[0].list[i].yuanguige
              that.data.ckhouList.push(obj)
            }
          }
          that.setData({
            ckhouList: that.data.ckhouList
          })
        }
      }
    })
  },

  selectyawen: function() {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectyawen.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100
      },
      header: header,
      success: function(res) {
        console.log(res.data.data[0].list)
        that.setData({
          yawenList: res.data.data[0].list
        })
      }
    })
  },
  selectzhongdiliao: function() {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectzhongdiliao.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100
      },
      header: header,
      success: function(res) {
        console.log(res.data.data[0].list)
        that.setData({
          zhongdiliaoList: res.data.data[0].list
        })
      }
    })
  },
  selecthuanjiecipin: function(huanjiename, cipinyuanyincontent) {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selecthuanjiecipin.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100,
        huanjiename: huanjiename || ""
      },
      header: header,
      success: function(res) {
        var cipinyuanyincontentarr1 = []
        if (cipinyuanyincontent != undefined) {
          //气泡--20,
          cipinyuanyincontentarr1 = cipinyuanyincontent.split(",")
        }
        for (var i = 0; i < res.data.data[0].list.length; i++) {
          var obj = {}
          obj.checked = false
          for (var j = 0; j < cipinyuanyincontentarr1.length; j++) {
            var content = cipinyuanyincontentarr1[j]

            var cipinname = content.split("--")[0];
            var cipinnum = content.split("--")[1];

            if (res.data.data[0].list[i].cipinname == cipinname) {
              obj.checked = true;
              obj.cipinnum = cipinnum
              obj.cipinname = cipinname
              obj.cipinsijisuan = res.data.data[0].list[i].cipinsijisuan
            }
          }
          that.data.cipincontentarr.push(obj);
        }
        that.setData({
          huanjiecipinList: res.data.data[0].list,
          cipincontentarr: that.data.cipincontentarr
        })
        console.log(that.data.cipincontentarr.length)
        console.log("查询次品原因" + that.data.huanjiecipinList)
      }
    })
  },
  selecthuanjiexingguangongxu: function(huanjiename, xingguangongxucontent) {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selecthuanjiexingguangongxu.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100,
        huanjiename: huanjiename || ""
      },
      header: header,
      success: function(res) {
        console.log("查询相关工序" + res.data.data[0].list)
        var xingguangongxucontentarr1 = []
        if (xingguangongxucontent != undefined) {
          xingguangongxucontentarr1 = xingguangongxucontent.split(",")
        }
        for (var i = 0; i < res.data.data[0].list.length; i++) {
          var obj = {}
          obj.checked = false

          for (var j = 0; j < xingguangongxucontentarr1.length; j++) {
            //3123--20.0,
            var content = xingguangongxucontentarr1[j]

            var xingguangongxuname = content.split("--")[0]
            var xingguangongxunum = content.split("--")[1]

            if (res.data.data[0].list[i].xingguangongxuname == xingguangongxuname) {
              obj.checked = true
              obj.xingguangongxunum = xingguangongxunum
              obj.xingguangongxuname = xingguangongxuname
              obj.xingguangongxusijisuan = res.data.data[0].list[i].xingguangongxusijisuan
            }
          }
          that.data.xingguangongxucontentarr.push(obj);
        }
        that.setData({
          xingguangongxuList: res.data.data[0].list,
          xingguangongxucontentarr: that.data.xingguangongxucontentarr
        })
      }
    })
  },
  selectqitagongxuname: function(huanjiename, qitagongxucontent) {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectqitagongxuname.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1,
        pageSize: 100,
        huanjiename: huanjiename || ""
      },
      header: header,
      success: function(res) {
        console.log("查询其他工序" + res)
        var qitagongxucontentarr1 = []
        that.data.qitagongxucontentarr = []
        if (qitagongxucontent != undefined) {
          qitagongxucontentarr1 = qitagongxucontent.split(",")
        }
        for (var i = 0; i < res.data.data.length; i++) {
          var obj = {}
          obj.checked = false
          obj.guigearrHide = "hidden"
          obj.lineheight = 46
          if (res.data.data[i].gongxuname.length > 4) {
            obj.lineheight = 26
          }
          for (var k = 0; k < qitagongxucontentarr1.length; k++) {
            //包装--20.0--2.0元/托
            var content = qitagongxucontentarr1[k];

            var qitagongxuname = content.split("--")[0]
            var qitagongxunum = content.split("--")[1]
            var qitagongxuguige = content.split("--")[2]

            if (res.data.data[i].gongxuname == qitagongxuname) {
              obj.checked = true
              obj.qitagongxuguige = qitagongxuguige
              obj.qitagongxunum = qitagongxunum
              obj.qitagongxuname = qitagongxuname
            }
          }
          var guigearr = res.data.data[i].guige.split(",");
          var guigearrobj = []
          for (var j = 0; j < guigearr.length; j++) {
            var guigeobj = {}
            guigeobj.guige = guigearr[j]
            guigearrobj.push(guigeobj)
          }
          obj.guigearr = guigearrobj
          that.data.qitagongxucontentarr.push(obj);
        }
        that.setData({
          qitagongxuList: res.data.data,
          qitagongxucontentarr: that.data.qitagongxucontentarr
        })
        console.log(that.data.qitagongxucontentarr)
      }
    })
  },
  /*日报表工人姓名填入 */
  ribaogangweisubmit: function() {
    var index = this.data.index
    this.data.ribaonameList[index].class = "hidden"
    var namecontent = ""
    if (this.data.ispingfen == '否') {
      var gongshiWXML = "--工时:" + this.data.gongshi;
      var tuochanWXML = "--脱产工 时:" + this.data.tuochangongshi;
      var biliWXML = "--比例:" + this.data.bili;
      namecontent = this.data.gangwei + "--" + this.data.name
      if (this.data.gongshi != '') {
        namecontent = namecontent + gongshiWXML
      }
      if (this.data.tuochangongshi != '') {
        namecontent = namecontent + tuochanWXML
      }
      console.log(biliWXML)
      if (this.data.bili != '') {
        namecontent = namecontent + biliWXML
      }
      namecontent = namecontent + "，"
    } else {
      namecontent = "平分:" + this.data.gangwei + "--" + this.data.name
      namecontent = namecontent + "，"
    }
    console.log(namecontent)
    var renshu = this.data.renshu + 1
    this.setData({
      namecontent: this.data.namecontent + namecontent,
      gangweiview: "hidden",
      gongshi: "",
      tuochangongshi: "",
      bili: "",
      renshu: renshu,
      ribaonameList: this.data.ribaonameList
    })
    this.getnextribaoname()
    console.log(namecontent)
  },
  namecontent: function(e) {
    var renshu = e.detail.value.split("，").length - 1
    var namecontent = e.detail.value
    namecontent = namecontent.replace(",","，")
    this.setData({
      namecontent: namecontent,
      renshu: renshu
    })
    console.log(this.data.namecontent)
  },
  cipincheckboxselect: function(e) {
    console.log(e)
    var dataInfo = e.currentTarget.dataset
    var index = dataInfo.index
    var cipincontent = this.data.cipincontentarr[index]
    var cipinchecked = cipincontent.checked
    console.log(cipincontent)
    console.log(cipinchecked)
    console.log(typeof cipinchecked)
    if (cipinchecked) { //现在点击复选框是为了将其取消选择状态
      cipincontent = {}
      cipincontent.checked = false
      this.data.cipincontentarr[index] = cipincontent
      this.setData({
        cipincontentarr: this.data.cipincontentarr
      })
      console.log(this.data.cipincontentarr)
    } else {
      var cipinname = dataInfo.cipinname
      var cipinsijisuan = dataInfo.cipinsijisuan
      var cipinnum = this.data.cipincontentarr[index].cipinnum
      if (cipinnum == undefined) {
        app.alertInfo("先输入数量", "loading", 1000)
        cipincontent = {}
        cipincontent.checked = false
        this.data.cipincontentarr[index] = cipincontent
        this.setData({
          cipincontentarr: this.data.cipincontentarr
        })
      } else {
        cipincontent.cipinnum = cipinnum
        cipincontent.cipinname = cipinname
        cipincontent.cipinsijisuan = cipinsijisuan
        cipincontent.checked = true
        this.data.cipincontentarr[index] = cipincontent
        this.setData({
          cipincontentarr: this.data.cipincontentarr
        })
      }
    }
    console.log(this.data.cipincontentarr)

  },
  cipinnum: function(e) {
    var index = e.currentTarget.dataset.index
    var cipinnum = e.detail.value
    var cipincontent = this.data.cipincontentarr[index]
    cipincontent.cipinnum = cipinnum
    this.data.cipincontentarr[index] = cipincontent
    this.setData({
      cipincontentarr: this.data.cipincontentarr
    })
  },
  qitagongxuguige: function(e) {
    var index = e.currentTarget.dataset.index
    var obj = this.data.qitagongxucontentarr[index]
    obj.guigearrHide = "show"
    this.setData({
      qitagongxucontentarr: this.data.qitagongxucontentarr
    })
  },
  clickqitagongxuguige: function(e) {
    var index = e.currentTarget.dataset.index
    var obj = this.data.qitagongxucontentarr[index]
    obj.qitagongxuguige = e.currentTarget.dataset.guige
    obj.guigearrHide = "hidden"
    this.setData({
      qitagongxucontentarr: this.data.qitagongxucontentarr
    })
  },
  qitagongxunum: function(e) {
    var num = e.detail.value
    var index = e.currentTarget.dataset.index
    var obj = this.data.qitagongxucontentarr[index]
    obj.qitagongxunum = num
    this.setData({
      qitagongxucontentarr: this.data.qitagongxucontentarr
    })
    console.log(this.data.qitagongxucontentarr)
  },
  qitagongxucheckboxselect: function(e) {
    var index = e.currentTarget.dataset.index
    var gongxuname = e.currentTarget.dataset.gongxuname
    var obj = this.data.qitagongxucontentarr[index]
    var checked = obj.checked
    if (checked) {
      var guigearr = obj.guigearr
      obj = {}
      obj.checked = false
      obj.guigearr = guigearr
      obj.guigearrHide = "hidden"
      obj.lineheight = 46
      if (gongxuname.length > 4) {
        obj.lineheight = 26
      }
      this.data.qitagongxucontentarr[index] = obj
      this.setData({
        qitagongxucontentarr: this.data.qitagongxucontentarr
      })
    } else {
      var qitagongxunum = obj.qitagongxunum
      var qitagongxuguige = obj.qitagongxuguige
      var qitagongxuname = e.currentTarget.dataset.gongxuname
      if (qitagongxuguige != undefined && qitagongxunum != undefined) {
        obj.qitagongxuname = qitagongxuname
        obj.checked = true
        this.setData({
          qitagongxucontentarr: this.data.qitagongxucontentarr
        })
      } else {
        app.alertInfo("先输入规格数量", "loading", 1000)
      }
    }
    this.setData({
      qitagongxucontentarr: this.data.qitagongxucontentarr
    })
  },
  xingguangongxunum: function(e) {
    var index = e.currentTarget.dataset.index
    var obj = this.data.xingguangongxucontentarr[index]
    obj.xingguangongxunum = e.detail.value
    this.data.xingguangongxucontentarr[index] = obj
    this.setData({
      xingguangongxucontentarr: this.data.xingguangongxucontentarr
    })
    console.log(this.data.xingguangongxucontentarr)
  },
  xingguangongxucheckboxselect: function(e) {
    var index = e.currentTarget.dataset.index
    var obj = this.data.xingguangongxucontentarr[index]
    var checked = obj.checked
    if (checked) {
      obj = {}
      obj.checked = false
      this.data.xingguangongxucontentarr[index] = obj
      this.setData({
        xingguangongxucontentarr: this.data.xingguangongxucontentarr
      })
    } else {
      var xingguangongxunum = obj.xingguangongxunum
      if (xingguangongxunum != undefined) {
        var xingguangongxuname = e.currentTarget.dataset.xingguangongxuname
        var xingguangongxusijisuan = e.currentTarget.dataset.xingguangongxusijisuan
        obj.xingguangongxunum = xingguangongxunum
        obj.xingguangongxusijisuan = xingguangongxusijisuan
        obj.xingguangongxuname = xingguangongxuname
        obj.checked = true
        this.data.xingguangongxucontentarr[index] = obj
        this.setData({
          xingguangongxucontentarr: this.data.xingguangongxucontentarr
        })
      } else {
        app.alertInfo("先输入数量", "loading", 1000)
        obj = {}
        obj.checked = false
        this.data.xingguangongxucontentarr[index] = obj
        this.setData({
          xingguangongxucontentarr: this.data.xingguangongxucontentarr
        })
      }

    }
  },
  num: function(e) {
    this.setData({
      num: e.detail.value
    })
  },
  beizhu: function(e) {
    this.setData({
      beizhu: e.detail.value
    })
  },
  submit: function() {
    if (this.data.guige != '' && this.data.num == '') {
      app.alertInfo("请填写数量", "loading", 1000)
      return;
    }
    var namearr = [];
    var length = this.data.namecontent.length
    var arr = this.data.namecontent.slice(0, (length - 1)).replace(/ /g, " ").split("，")
    console.log(arr)
    var namet = ""
    var pingfennamet = ""
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].indexOf("平分:") != -1) {
        pingfennamet = pingfennamet + arr[i] + "，";
      } else {
        namet = namet + arr[i] + "，"
      }
    }
    arr = []
    arr = namet.substr(0, namet.length - 1).replace(/ /g, " ").split("，")
    var baocunnametext = this.data.namecontent
    var zhiweiarr = []
    var timearr = []
    var tuochantimearr = []
    var biliarr = []
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].indexOf("新员工") != -1) {
        if (arr[i].indexOf("工时") == -1) {
          arr[i] = arr[i] + "--工时:0"
        }
      }
      var jisu = i
      var valuearr = arr[i].split("--");
      for (var j = 0; j < valuearr.length; j++) {
        if (j == 0) {
          zhiweiarr[jisu] = valuearr[j]
        } else if (j == 1) {
          namearr[jisu] = valuearr[j]
        } else if (j > 1) {
          if (valuearr[j].indexOf("工时") != -1) {
            console.log(valuearr[j])
            timearr[jisu] = valuearr[j].split(":")[1]
          }
          if (valuearr[j].indexOf("脱产工 时") != -1) {
            tuochantimearr[jisu] = valuearr[j].split(":")[1]
          }
          if (valuearr[j].indexOf("比例") != -1) {
            biliarr[jisu] = valuearr[j].split(":")[1]
          }
        }
      }

    }
    if (timearr.length > 0) {
      for (var i = 0; i < timearr.length; i++) {
        if (timearr[i] == "") {
          timearr[i] = 0;
        }
      }
    }
    if (tuochantimearr.length > 0) {
      for (var i = 0; i < tuochantimearr.length; i++) {
        if (tuochantimearr[i] == "") {
          tuochantimearr[i] = 0;
        }
      }
    }
    if (biliarr.length > 0) {
      for (var i = 0; i < biliarr.length; i++) {
        if (biliarr[i] == "") {
          biliarr[i] = 0;
        }
      }
    }
    console.log(this.data.cipincontentarr)
    console.log(this.data.qitagongxucontentarr)
    console.log(this.data.xingguangongxucontentarr)
    console.log(pingfennamet)

    var xingguangongxu = ""
    var xingguangongxusijisuan = ""
    var xingguangongxunum = ""
    for (var i = 0; i < this.data.xingguangongxucontentarr.length; i++) {
      if (this.data.xingguangongxucontentarr[i].checked) {
        xingguangongxu = xingguangongxu + this.data.xingguangongxucontentarr[i].xingguangongxuname + ","
        xingguangongxusijisuan = xingguangongxusijisuan + this.data.xingguangongxucontentarr[i].xingguangongxusijisuan + ","
        xingguangongxunum = xingguangongxunum + this.data.xingguangongxucontentarr[i].xingguangongxunum + ","
      }

    }
    xingguangongxu = xingguangongxu.substr(0, xingguangongxu.length - 1)
    xingguangongxusijisuan = xingguangongxusijisuan.substr(0, xingguangongxusijisuan.length - 1)
    xingguangongxunum = xingguangongxunum.substr(0, xingguangongxunum.length - 1)


    console.log(this.data.cipincontentarr)
    console.log(this.data.qitagongxucontentarr)
    var cipinyuanyin = ""
    var cipinyuanyinnum = ""
    var cipinsijisuan = ""
    for (var k = 0; k < this.data.cipincontentarr.length; k++) {
      console.log(this.data.cipincontentarr[k].checked)
      if (this.data.cipincontentarr[k].checked) {
        cipinyuanyin = cipinyuanyin + this.data.cipincontentarr[k].cipinname + ","
        cipinyuanyinnum = cipinyuanyinnum + this.data.cipincontentarr[k].cipinnum + ","
        cipinsijisuan = cipinsijisuan + this.data.cipincontentarr[k].cipinsijisuan + ","
      }
    }
    cipinyuanyin = cipinyuanyin.substr(0, cipinyuanyin.length - 1)
    cipinyuanyinnum = cipinyuanyinnum.substr(0, cipinyuanyinnum.length - 1)
    cipinsijisuan = cipinsijisuan.substr(0, cipinsijisuan.length - 1)

    var gongxunum = ""
    var gongxuname = ""
    var gongxuguige = ""
    for (var i = 0; i < this.data.qitagongxucontentarr.length; i++) {
      if (this.data.qitagongxucontentarr[i].checked) {
        gongxunum = gongxunum + this.data.qitagongxucontentarr[i].qitagongxunum + ","
        gongxuname = gongxuname + this.data.qitagongxucontentarr[i].qitagongxuname + ","
        gongxuguige = gongxuguige + this.data.qitagongxucontentarr[i].qitagongxuguige + ","
      }
    }
    gongxunum = gongxunum.substr(0, gongxunum.length - 1)
    gongxuname = gongxuname.substr(0, gongxuname.length - 1)
    gongxuguige = gongxuguige.substr(0, gongxuguige.length - 1)
    if (this.data.huanjiename == '基材' && this.data.shengchantypename==''){
      this.data.shengchantypename = 'WPC基材'
    }
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/insertshengchanribao.do', //仅为示例，并非真实的接口地址
      data: {
        cipinyuanyin: cipinyuanyin,
        cipinyuanyinnum: cipinyuanyinnum,
        cipinsijisuan: cipinsijisuan,
        xingguangongxu: xingguangongxu,
        xingguangongxusijisuan: xingguangongxusijisuan,
        xingguangongxunum: xingguangongxunum,
        gongxunum: gongxunum,
        gongxuname: gongxuname,
        gongxuguige: gongxuguige,
        ispingfen: "否",
        pingfenname: pingfennamet,
        mishu: "",
        kehuxinghao: that.data.kehuxinghao,
        type: that.data.shengchantypename,
        huanjie: that.data.huanjiename,
        xinghao: that.data.bianhao,
        pici: that.data.time,
        guige: that.data.guige,
        chengpinnum: that.data.num,
        banci: that.data.banci,
        beizhu: that.data.beizhu,
        bililength: biliarr.join(","),
        timelength: timearr.join(","),
        tuochantimelength: tuochantimearr.join(","),
        name: namearr.join(","),
        kehuphone: that.data.kehuphone,
        zhiwei: zhiweiarr.join(","),
        yawen: that.data.yawen,
        zhongdiliaoname: "",
        yansename: "",
        jicaiguige: "",
        baiyeban: that.data.baiye,
        butiejine: that.data.butie,
        baocunnametext: that.data.namecontent,
        day_time: "",
        day_id: "",
        guanlianxinghao: that.data.cailiao,
        isjiaban: that.data.jiaban,
        peifangname: that.data.peifang
      },
      header: header,
      success: function(res) {
        if (res.data.data[0] == "添加成功") {
          app.alertInfo("成功", "loading", 1000)
          var ribaoobj = wx.getStorageSync("ribaoobj")
          console.log(ribaoobj)
          if (ribaoobj != undefined && ribaoobj != '') {
            that.deletebutton(ribaoobj.id)
          }
          var cipincontentarr = that.data.cipincontentarr
          for(var i=0;i<cipincontentarr.length;i++){
            var cipincontent = {}
            cipincontent.checked = false
            cipincontentarr[i] = cipincontent
          }
          var qitagongxucontentarr = that.data.qitagongxucontentarr
          for (var i = 0; i < qitagongxucontentarr.length; i++) {
            var guigearr = qitagongxucontentarr[i].guigearr
            var lineheight = qitagongxucontentarr[i].lineheight
            var obj = {}
            obj.checked = false
            obj.guigearr = guigearr
            obj.guigearrHide = "hidden"
            obj.lineheight = lineheight
            qitagongxucontentarr[i] = obj
          }
          that.setData({
            jiaban: "否",
            cipincontentarr: cipincontentarr,
            qitagongxucontentarr: qitagongxucontentarr
          })
        } else {
          var contextInfo = res.data.data[0];
          app.alertInfo("请设置规格金额", "loading", 1000)
        }
      }
    })
  },
  deletebutton: function(id) {
    var that = this;
    var boo = false
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/deleteshengchanribao.do', //仅为示例，并非真实的接口地址
      data: {
        id: id
      },
      header: header,
      success: function(res) {}
    })
  },
  clickkehuphonechahao: function() {
    this.setData({
      kehuphone: "",
      bianhao: "",
      shengchantypename: "",
      guige: "",
      yawen: "",
      num: "",
      beizhu: "",
      butie: "0",
     // namecontent: "",
      cailiao: "",
      peifang: "",
      //renshu: 0,
      cailiaoHide: "hidden",
      cailiaoListInfo:[]
    })
    //this.selectribaobiaoname(this.data.huanjiename, this.data.banci, "", 1)
  },
  clickbianhaochahao: function() {
    this.setData({
      bianhao: ""
    })
  },
  clickcailiaochahao: function() {
    this.setData({
      cailiao: ""
    })
  },
  clickpeifangchahao: function() {
    this.setData({
      peifang: ""
    })
  },
  clicknumchahao: function() {
    this.setData({
      num: ""
    })
  },
  clickbeizhuchahao: function() {
    this.setData({
      beizhu: ""
    })
  },
  clicknamechahao: function() {
    this.setData({
      namecontent: "",
      renshu: 0,
      buttonzhankaititle: "展开",
      zhankaiorhebing: "zhankai"
    })
    this.selectribaobiaoname(this.data.huanjiename, this.data.banci, "", 1)
  },
  getnextribaoname: function() {
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username") //读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectribaobiaoname.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: that.data.nextribaopage,
        pageSize: 1,
        zhiwei: that.data.huanjiename || "",
        banci: that.data.banci || "",
        count: 1
      },
      header: header,
      success: function(res) {
        console.log(res)
        var obj = res.data.data[0].list[0]
        if (obj != undefined) {
          that.data.ribaonameList.push(obj)
        }
        that.data.nextribaopage = that.data.nextribaopage + 1
        console.log(that.data.ribaonameList)
        that.setData({
          nextribaopage: that.data.nextribaopage,
          ribaonameList: that.data.ribaonameList
        })
      }
    })
  }
})