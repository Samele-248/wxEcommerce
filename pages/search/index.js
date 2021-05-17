import { request } from '../../request/request.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false,// 按钮是否隐藏
    inputValue:""
  },
  TimeId:-1,
  handleInput(ee){
    // 获取输入框的值
    const {value} = ee.detail;
    if(!value.trim()){
      this.setData({ 
        goods:[],
        isFocus:false
      })
      return;
    }
    // 显示取消按钮
    this.setData({
      isFocus:true
    })
    // 发送请求数据
    // --防抖
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(()=>{
      this.qsearch(value)//松手一秒后，发送请求
    },1000)
    
  },
  async qsearch(query){
    const res = await request({url:"/goods/qsearch",data:{query}})
    this.setData({
      goods:res
    })
  },
  // 点击取消
  handleCancel(){
    this.setData({ 
      goods:[],
      isFocus:false,
      inputValue:""
    })
  }
})