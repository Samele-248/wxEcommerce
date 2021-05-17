import { request } from '../../request/request.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false
  },
  // 商品大图
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length-1];
    let options =currentPage.options
    this.getGoodsDetail(options.goods_id)
  },

// 获取商品详细数据
async getGoodsDetail(goods_id){
  const goodsObj = await request({url:"/goods/detail", data:{goods_id}});
  this.GoodsInfo = goodsObj;
   // 获取缓存中的商品收藏
   let collect = wx.getStorageSync('collect')||[]
  //  判断当前商品是否被收藏
    let isCollect = collect.some(v=>v.goods_id === this.GoodsInfo.goods_is)

  this.setData({
    goodsObj:{
      goods_name:goodsObj.goods_name,
      goods_price:goodsObj.goods_price,
      goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
      pics:goodsObj.pics
    },
    isCollect
  })
},
// 点击，大图预览
handlePrevewImage(e){
  const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
  const current =e.currentTarget.dataset.url;
  wx.previewImage({
    urls,
    current
  })
},
// 点击加入购物车
handleCartAdd(){
  // 获取本地购物车数据 -- 第一次坑定没有
  let cart = wx.getStorageSync('cart')||[];
  // 判断是否已经存在
  let index = cart.findIndex(v => v.goods_id===this.GoodsInfo.goods_id)
  if(index === -1){
    // 第一次添加
    this.GoodsInfo.num = 1;
    this.GoodsInfo.checked = true;
    cart.push(this.GoodsInfo)
  }else{
    // 已存在
    cart[index].num++
  }
  // 存入本地
  wx.setStorageSync('cart', cart);
  wx.showToast({
    title: '加入成功',
    icon:'success',
    mask:true,
  })

},
// 点击商品收藏
handleCollect(){
  let isCollect = false;
  // 获取商品收藏数组
  let collect = wx.getStorageSync('collect')||[]
  // 判断商品是否被收藏
  let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
  if(index !== -1){
    // 已经收藏
    collect.splice(index,1)
    isCollect = false
    wx.showToast({
      title: '取消成功',
      icon:'success',
      MASK:true
    })
  }else{
    // 没有收藏
    collect.push(this.GoodsInfo)
    isCollect = true
    wx.showToast({
      title: '收藏成功',
      icon:'success',
      MASK:true
    })
  }
  // 将数据存入缓存
  wx.setStorageSync('collect', collect)
  // 修改本地收藏状态
  this.setData({
    isCollect
  })
}
})