// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //collectNums:0,//被收藏的商品数量--不用
    userinfo:{},
    // 订单
    orderForm:[
      {
        id:1,
        name:"全部订单",
        icon:""
      },
      {
        id:2,
        name:"待付款",
        icon:""
      },
      {
        id:3,
        name:"待收货",
        icon:""
      },
      {
        id:4,
        name:"退款/退货",
        icon:""
      }
    ],
    // 历史足迹
    historicalFootprints:[
      {
        id:0,
        name:"收藏的店铺",
        num:0,
        isUrl:""
      },
      {
        id:1,
        name:"收藏的商品",
        num:0,
        isUrl:"/pages/collect/index"
      },
      {
        id:2,
        name:"关注的商品",
        num:0,
        isUrl:""
      },
      {
        id:3,
        name:"我的足迹",
        num:0,
        isUrl:""
      }
    ]
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userinfo = wx.getStorageSync('userinfo') // 获取个人信息
    const collect = wx.getStorageSync('collect')||[]
    // 个人修改
    let numm = "historicalFootprints["+1+"].num"
    this.setData({
      userinfo,
      [numm]:collect.length
    })

  },

})