//overview.js
//获取应用实例
var app = getApp()
var timer
var timer1
var urlSate = 1
var tempTurbineData //中转数据

//多次调用函数
var getTurbineData = function(ip, port, sate){
    var requestURL = 'http://'+ip+':'+port+'/AppInterface/appashx/Browse.ashx?type=Browse&sate='+sate
    //console.log(requestURL)
    wx.request({
        url: requestURL,
        data: {},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          //console.log(res.data.data)
          tempTurbineData = res.data.data;//turbine array
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete 
        }
        })
  }

Page({
  data: {
    userInfo: {},
    selectedIndex: 0,
    turbineArray: [
      "正常机组",
      "故障机组",
      "未连接机组"]
  },

  
  //事件处理函数
  
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    switch(e.detail.value){
      case '0'://normal
        urlSate = 1
        //console.log(urlSate)
        break;
      case '1'://
        urlSate = 3
        //console.log(urlSate)
        break;
      case '2':
        urlSate = 2
        //console.log(urlSate)
        break;
      default:
        //console.log('default====',e.detail.value)
        urlSate = 1
    }
   this.setData({
      selectedIndex: e.detail.value
    })
    
  },

  stopRefresh: function(){
    clearInterval(timer)
    clearInterval(timer1)
  },

  onLoad: function () {
    console.log('event onLoading')
    var that = this
    timer = setInterval(function(){
      getTurbineData(app.globalData.ip, app.globalData.port, urlSate)
    },2000)
    timer1 = setInterval(
        function(){
          that.setData({
          turbineData: tempTurbineData
        })
        //console.log(that.data.turbineData)
      },2000)
    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
