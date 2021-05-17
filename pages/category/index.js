// 分类
import { request } from '../../request/request.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],// 左侧菜单数据
    rightContent:[],// 右侧商品数据
    currentIndex:0,// 被点击的菜单
    scrollTop:0
  },
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates')// 判断有没有本地的缓存
    if(!Cates){
      this.getCates()
    }else{
      this.Cates = Cates.data
      let leftMenuList = this.Cates.map(v=>v.cat_name)
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    }
    
  },
  // 数据本地存储

  // 页面请求数据
  async getCates(){
    // 没使用async
    // request({
    //   url:"/categories"
    // }).then(res=>{
    //   this.Cates = res.data.message;
    //   // 本地缓存
    //   wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
    //   let leftMenuList = this.Cates.map(v=>v.cat_name)
    //   let rightContent = this.Cates[0].children
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    const res = await request({url:"/categories"})
    this.Cates = res;
      // 本地缓存
      wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
      let leftMenuList = this.Cates.map(v=>v.cat_name)
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  // 左侧菜单的点击事件
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
  }
})