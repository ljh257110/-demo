// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc:"",
    videosrc:"",
    imgbool:false,
    videobool:false,
    file:"",
    filebool:false,
    isConnected:false,
    networkType:"none",
    netbool:false
  },
  findpic(){
    var self = this;
    console.log(self)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths[0])
        self.setData({
          imgsrc: tempFilePaths[0],
          imgbool:true
        })
      }
    })
  },
  cancel(){
    this.setData({
      imgbool: false
    })
  },
  videoshow() {
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        console.log(res.tempFilePath)
        that.setData({
          videosrc: res.tempFilePath,
          videobool:true
        })
      },
      fail:function(err){
          console.log(err)
      }
    })
  },
  fileshow(){
    var self = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function (res) {
            var savedFilePath = res.savedFilePath
            console.log(savedFilePath)
            self.setData({
              file: savedFilePath,
              filebool:true
            })
          }
        })
      }
    })
  },
  filecancel() {
    this.setData({
      filebool: false
    })
  },
  locationInfo(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },
  netInfo(){
    var self= this;
    wx.onNetworkStatusChange(function (res) {
      console.log(res.isConnected)
      console.log(res.networkType)
      self.setData({
        isConnected: res.isConnected,
        networkType: res.networkType,
        netbool:true
      })
    })
  },
  netcancel(){
    this.setData({
      netbool: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})