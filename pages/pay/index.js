
import {chooseAddress, getSetting, openSetting, login,requestPayment} from "../../utils/asyncSH.js"
import { request } from '../../request/request.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  // 收货地址
  async handleChooseAddress(){
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
   * 生命周期函数--监听页面显示  address.provinceName+address.cityName+address.countyName+address.detailInfo
   */
  onShow(){
    // 获取收货地址
    const address = wx.getStorageSync('address')
    // 获取购物车
    let cart = wx.getStorageSync('cart')||[]
    // 过滤后的购物车数组
    cart = cart.filter(v=>v.checked)
    this.setData({
      address
    })
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
       // += 用意为，多个商品数据求总
        totalPrice += v.num*v.goods_price
        totalNum += v.num
      
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
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
  // 点击支付
  async handleOrderPay(){
    try{
  // 判断缓存里边有没有token
  const token = wx.getStorageSync('token')
  // 判断
  if(!token){
    wx.navigateTo({
      url:"/pages/auth/index"
    })
    return;
  }
  // 准备请求头参数
  // const header = {Authorization : token} // 已经再请求部分做处理
  // 请求体参数
  const order_price = this.data.totalPrice;
  const consignee_addr = this.data.address.all;
  const cart = this.data.cart;
  let goods = [];
  cart.forEach(v=>goods.push({
     goods_id:v.goods_id,
     goods_number:v.num,
     goods_price:v.goods_price
  }))
  // 整理待发生数据
  const orderParams = {order_price,consignee_addr,goods}
  // 发送订单请求
  // const res = await request({url:"/my/orders/create",method:"POST",data:orderParams,header})
  const res = await request({url:"/my/orders/create",method:"POST",data:orderParams})
  // 获取到订单号
  const {order_number} = res
  // 预支付
  // const ress = await request({url:"/my/orders/req_unifiedorder",method:"POST",data:{order_number},header})
  const ress = await request({url:"/my/orders/req_unifiedorder",method:"POST",data:{order_number}})
  const {pay} = ress;
  // 微信支付
  await requestPayment(pay)
  // 查询订单状态
  // const rees = await request({url:"/my//orders/chkOrder",method:"POST",data:{order_number},header})
  const rees = await request({url:"/my//orders/chkOrder",method:"POST",data:{order_number}})
  await showToast({title:"支付成功"})
  // 删除缓存中已支付商品
  let newCart = wx.getStorageSync('cart')
  newCart = newCart.filter(v=>v.checked)
  wx.setStorageSync('cart', newCart)
  // 支付成功，跳转订单页码
  wx.navigateTo({
    url: '/pages/order/index',
  })
}catch(error){
  await showToast({title:"失败"})
}
  },
 
  // 点击授权
  async handleGetUserInfo(ee){  // 没有企业账号，返回null
    const {encryptedData,rawData,iv,signature} = ee.detail;
    const {code} = await login();
    // 整理数据
    const loginParams = {encryptedData,rawData,iv,signature,code}
    const res = await request({url:"/users/wxlogin",data:loginParams,method:"post"})
    // 无企业appid做虚拟处理
    // const {token} = res
    // 将token存入缓存
    // wx.setStorageSync('token', token)
    // 授权后，返回上一层
    // wx.navigateBack({
    //   delta: 1,
    // })
  }
})