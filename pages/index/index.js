import { request } from '../../request/request.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    catesList:[],
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getCatesList()
    this.getFloorList()
  },
  // 轮播图
  getSwiperList(){
    // 会出现回调地狱的的请求
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success:(result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // })
    request({ url: '/home/swiperdata'})
      .then(res => {
        this.setData({
          // swiperList:res.data.message // 接口接收数据有处理
          swiperList:res
        })
      })
  },
  // 导航块
  getCatesList(){
    request({ url: '/home/catitems'})
      .then(res => {
        this.setData({
          // catesList: res.data.message  // 接口接收数据有处理
          catesList: res
        })
      })
  },
  // 楼层
  getFloorList(){
    request({ url: '/home/floordata'})
      .then(res => {
        this.setData({
          // floorList: res.data.message // 接收数据有处理
          floorList: res
        })
      })
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