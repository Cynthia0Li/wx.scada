var app = getApp()

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getTurbineNumber(pageInstance){
  wx.request({
    url: 'http://' + app.globalData.ip + ':'+ app.globalData.port + '/AppInterface/Appashx/selectFanid.ashx?type=selectFanid',
    data: {},
    method: 'GET', 
    success: function(res){
      // success
      var turbineArray = res.data.data//array
      var turbineIndex = []
      for(var i=0; i<turbineArray.length; i++){
        turbineIndex.push(turbineArray[i].XuHao)
      }
      //console.log(turbineIndex)
      pageInstance.setData({
        turbineIndexs: turbineIndex
      })
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
}

module.exports = {
  formatTime: formatTime,
  getTurbineNumber: getTurbineNumber
}
