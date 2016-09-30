//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'dqqdo.com',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //事件处理函数
  clickTest: function() {

    // try{
    //   console.log("just fine");
    // }catch(e){

    // }
    
    wx.navigateTo({
      url: '../music/music'
    })
  },



  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
