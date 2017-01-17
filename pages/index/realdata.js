//realdata.js
//获取应用实例
var util = require('../../utils/util.js')

var app = getApp()
var fanId = 1
var timer
var timer1
var tempTurbineData

var getTurbineData = function(ip, port, fanId){
    var requestURL = 'http://'+ip+':'+port+'/AppInterface/appashx/FjAllInfo.ashx?type=RunData&fanid='+fanId
    console.log(requestURL)
    wx.request({
        url: requestURL,
        data: {},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          console.log(res.data)
          tempTurbineData = res.data;//turbine array
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
    selectedIndex: 0,
    
  },

  //事件处理函数
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    fanId = e.detail.value
    this.setData({
        selectedIndex: e.detail.value
      })
    
  },
  
  onLoad: function () {
    console.log('realdata onLoading')
    var that = this
    //get basicFacts
    wx.request({
      url: 'http://'+app.globalData.ip+':'+app.globalData.port+'/AppInterface/appashx/BasicFacts.ashx?type=BasicFacts',
      data: {},
      method: 'POST', 
      success: function(res){
        // success
        console.log(res.data)
        that.setData({     
            basicFacts: res.data
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    
    //get turbineIndexs
    var temp = util.getTurbineNumber(that)
    
    //get and set realdata
    timer = setInterval(
      function(){
      getTurbineData(app.globalData.ip, app.globalData.port, fanId)
    },2000)
    timer1 = setInterval(
        function(){
          that.setData({
            realData: tempTurbineData
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
