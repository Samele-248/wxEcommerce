// pages/collect/index.js
Page({

  
  data: {
    tabs:[
      {
        id:0,
        value:"商品收藏",
        isActive:true
      },
      {
        id:1,
        value:"品牌收藏",
        isActive:false
      },
      {
        id:2,
        value:"店铺收藏",
        isActive:false
      },
      {
        id:3,
        value:"浏览足迹",
        isActive:false
      }
    ],
    collect:[]
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
  onShow(){
    const collect = wx.getStorageSync("collect")||[];
    this.setData({
      collect
    })
  }
 
})