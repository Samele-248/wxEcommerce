import { request } from '../../request/request.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    // orders:[
    //   {
    //     order_number:"ASLKDFJAOISF4894564654",
    //     order_price:"25565",
    //     create_time:"1565347865"
    //   },
    //   {
    //     order_number:"ASLKDFJAOISF4894564654",
    //     order_price:"25565",
    //     create_time:"1565347865"
    //   },
    //   {
    //     order_number:"ASLKDFJAOISF4894564654",
    //     order_price:"25565",
    //     create_time:"1565347865",
    //   },
    //   {
    //     order_number:"ASLKDFJAOISF4894564654",
    //     order_price:"25565",
    //     create_time:"1565347865"
    //   }
    // ],// 空数组,接收订单数据
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待发货",
        isActive:false
      },
      {
        id:2,
        value:"退货/退款",
        isActive:false
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 导航栏
  tabsItemChange(a){
    const {index} = a.detail;
    this.changeTitleByIndex(index)
    this.getOrders(index+1)
  },
  // 根据标题索引,激活选择标题数组
  changeTitleByIndex(index){
    let {tabs} = this.data;
    tabs.forEach((v,i)=>{index===i?v.isActive=true:v.isActive=false})
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (aa) {
  // 判断是否有token
  const token = wx.getStorageSync('token')
  // if(!token){ // 本地没有token,无企业账号,无法授权先注掉
    if(token){
    wx.navigateTo({
      url: '/pages/auth/index',
    })
    return;
  }
    // 通过页面栈,获取传来的参数
    let pages = getCurrentPages()
    // 数组中,索引最大的是当前页码
    let currentPages = pages[pages.length-1];
    // 获取url上面的type值
    const {type} = currentPages.options
    // 通过上个页面传来的值,激活对应标题
    this.changeTitleByIndex(type-1)
    this.getOrders(type)
  },
  // 获取订单列表
  async getOrders(type){
    const res = await request({url:"/my/orders/all",data:{type}})
    // this.setData({ // 获取不到数据,所以注掉
    //   orders:res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    // })

    // 通过本地数据,做数据格式处理
    // const rres = this.data.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    // this.setData({
    //   orders:rres
    // })
  }

})