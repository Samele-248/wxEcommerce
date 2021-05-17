import { request } from '../../request/request.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },
  // 导航栏
  tabsItemChange(a){
    const {index} = a.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>{index===i?v.isActive=true:v.isActive=false})
    this.setData({
      tabs
    })
  },
  // 请求发生的预备数据
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid||""
    this.QueryParams.query = options.query||""
    this.getGoodsList()
  },
  // 发生数据
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams})
    // 获取数据总条数
    const total = res.total
    // 计算页码
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods] // 数据叠加，第一次数据是空的，之后就有数据了
    })
    // 关闭下拉
    wx.stopPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    // 重置页码
    this.setData({
      goodsList:[],// 清空数组
    })
    this.QueryParams.pagenum=1;
    this.getGoodsList()
  },

  /** 
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParams.pagenum >= this.totalPages){
      wx.showToast({
        title:"见底了",
        icon: 'none'
      })
    }else{
      this.QueryParams.pagenum++; // 更改请求页码
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})