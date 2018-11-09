const app = getApp()
Page({
  data: {
    xinghao:"",
    materialname:"",
    num:"",
    bumen:"",
    shuoming:"",
    beizhu:"",
    materialInfo:[],
    materialInfoHide:"show",
    bumennameInfo:[],
    bumennameInfoHide:"show",
    guige:""
  },
  seniorscrebutton:function(){
    wx.redirectTo({
      url: '../getmaterialselect/getmaterialselect'
    })
  },
  onLoad:function(){
    var bumenname = wx.getStorageSync("bumenname")
    var bumennamearr = bumenname.split(",")
    for(var i=0;i<bumennamearr.length;i++){
      var obj = {}
      obj.bumenname = bumennamearr[i]
      this.data.bumennameInfo.push(obj)
    }
    this.setData({
      bumennameInfo: this.data.bumennameInfo
    })
    console.log(bumenname)
    console.log(this.data.bumennameInfo)
  },
  clickbumen:function(e){
    this.setData({
      bumen: e.currentTarget.dataset.bumenname,
      bumennameInfoHide: "hidden"
    })
  },
  xinghao:function(e){
    this.setData({
      xinghao:e.detail.value,
      materialInfoHide:"show"
    })
    this.selectmaterial(e.detail.value)
  },
  clickxinghao:function(e){
    console.log(e)
    var xinghao = e.currentTarget.dataset.xinghao
    var materialname = e.currentTarget.dataset.materialname
    var guige = e.currentTarget.dataset.guige
    this.setData({
      xinghao:xinghao,
      materialname:materialname,
      materialInfoHide:"hidden",
      guige:guige
    })
  },
  materialname: function (e) {
    this.setData({
      materialname: e.detail.value
    })
  },
  num: function (e) {
    this.setData({
      num: e.detail.value
    })
  },
  bumen: function (e) {
    if (this.data.bumennameInfoHide=='hidden'){
      this.setData({
        bumennameInfoHide: "show"
      })
    }else{
      this.setData({
        bumennameInfoHide: "hidden"
      })
    }
    
  },
  shuoming: function (e) {
    this.setData({
      shuoming: e.detail.value
    })
  },
  
  beizhu: function (e) {
    this.setData({
      beizhu: e.detail.value
    })
  },
  selectmaterial:function(xinghao){
    var that = this
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username")//读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress + '/selectmaterial.do', //仅为示例，并非真实的接口地址
      data: {
        xinghao: this.data.xinghao,
        pageNum:1,
        pageSize:100
      },
      header: header,
      success: function (res) {
        that.setData({
          materialInfo:res.data.data[0].list
        })
      }
    })
  },
  submit:function(e){
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync("username")//读取cookie
    };
    wx.request({
      url: 'https://' + app.globalData.requestaddress +'/insertmaterialorder.do', //仅为示例，并非真实的接口地址
      data: {
        xinghao: this.data.xinghao,
        squarenum: this.data.num,
        shuoming: this.data.shuoming,
        materialname: this.data.materialname,
        bumen: this.data.bumen,
        materialorderbeizhu: this.data.beizhu,
      },
      header: header,
      success: function (res) {
        if (res.data.data[0] =='该原材料的采购单价为空，请先去设置采购单价'){
          app.alertInfo('请设置采购单价', 'loading', 2000)
        }else{
          app.alertInfo('成功', 'success', 2000)
        }
      }
    })
  }
})