
import {chooseAddress, getSetting, openSetting, showModal ,showToast} from "../../utils/asyncSH.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  // 收货地址
  async handleChooseAddress(){

    // 优化前
    // 获取权限状态
    // wx.getSetting({  // 默认一直是有权限，不问我是不是给予授权
    //   success:(resu)=>{
    //     console.log(resu);
    //     const scopeAddress = resu.authSetting["scope.address"];
    //     if(scopeAddress === true || scopeAddress === undefined){ 
    //       // 已经授权或者还没打开是不是授权
    //       wx.chooseAddress({
    //         success: (result) => {
    //           console.log(result)
    //         },
    //       });
    //     }else{
    //       // 未授权
    //       wx.openSetting({
    //         success:(resu)=>{
    //           wx.chooseAddress({
    //             success: (result2) => {
    //               console.log(result2)
    //             },
    //           })
    //         }
    //       })
    //     }
    //   }
    // })

    // 获取权限状态
    try{
      const resu = await getSetting()
      const scopeAddress = resu.authSetting["scope.address"];
      if(scopeAddress === false){
        await openSetting()
      }
      const address = await chooseAddress()
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
      wx.setStorageSync('address', address)
    }catch(error){
      console.log(error);
    }
    
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
   * 生命周期函数--监听页面显示  address.provinceName+address.cityName+address.countyName+address.detailInfo
   */
  onShow(){
    // 获取收货地址
    const address = wx.getStorageSync('address')
    // 获取购物车
    const cart = wx.getStorageSync('cart')||[]
    // const allChecked =cart.length?cart.every(v=>v.checked):false;// 耗性能
    // let allChecked  = true // 考虑空数组
    // 计算总价格
    // let totalPrice = 0;
    // let totalNum = 0;
    // cart.forEach(v=>{
    //   if(v.checked){
    //     totalPrice = v.num*v.goods_price
    //     totalNum = v.num
    //   }else{
    //     allChecked = false;
    //   }
    // })
    // allChecked = cart.length!=0?allChecked:false // 针对空数组--全选的把控
    // this.setData({
    //   address,
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum
    // })
    this.setData({
      address
    })
    this.setCart(cart)
  },
  // 设置购物车底部工具栏数据--全选、总价格 -- 封装优化
  setCart(cart){
    let allChecked  = true // 考虑空数组
    // 计算总价格
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){ // += 用意为，多个商品数据求总
        totalPrice += v.num*v.goods_price
        totalNum += v.num
      }else{
        allChecked = false;
      }
    })
    allChecked = cart.length!=0?allChecked:false // 针对空数组--全选的把控
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart)
  },
  // 点击复选框，选择或取消物品时触发
  handeItemChange(e){
    // 获取被修改的商品id
    const goods_id = e.currentTarget.dataset.id
    // 获取购物车数组
    let{cart} = this.data;
    // 找到被修改的商品
    let index = cart.findIndex(v=>v.goods_id === goods_id)
    // 选中状态取反  -- 置位
    cart[index].checked = !cart[index].checked
    this.setCart(cart)

  },
  // 商品全选
  handleItemAllCheck(){
    let {cart,allChecked} = this.data
    allChecked = !allChecked
    cart.forEach(v=>v.checked = allChecked);
    this.setCart(cart)
  },
  // 加减商品数量
  async handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset;
    // 获取数据
    let{cart} = this.data;
    // 找到被修改的商品
    let index = cart.findIndex(v=>v.goods_id === id)
    // 当见到零时，提示删除
    if(cart[index].num===1 && operation ===-1){
      const res = await showModal({content:"您是否要删除？"})
      if(res.confirm){
        cart.splice(index,1)
        this.setCart(cart)
      }
    }else{
      cart[index].num += operation;
      this.setCart(cart)
    }
  },
  // 点击结算
  async handlePay(){
    // 判断收货地址
    const {address, totalNum} = this.data
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"})
      return ;
    }
    if(totalNum===0){
      await showToast({title:"您还没有选择商品"})
      return ;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
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