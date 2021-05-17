// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品、商家投诉",
        isActive:false
      }
    ],
    // 被选中的图片
    chooseImgs:[],
    textVal:[]
  },
  // 外网图片的路径数组
  UpLoadImgs:[],
  // 文本域输入事件
  handleTextInput(ee){
    this.setData({
      textVal:e.datail.value
    })
  },
  // 提交按钮
  handleFormSubit(){
    // 获取文本域的内容
    const {textVal,chooseImgs} = this.data;
    if(textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon:'none',
        mask:true
        
      });
      return;
    }
    // 上传图片等待
    wx.showLoading({
      title: '正再上传中',
      mask:true
    })
    // 判断有没有上传图片数据
    if(chooseImgs.length != 0){
       // 准备上传图片
    chooseImgs.forEach((v,i)=>{
      wx.uploadFile({
        // 被上传文件的路径
        filePath: v,
        // 上传文件的名称
        name: 'file',
        // 图片要上传到哪里
        url: 'https://images.ac.cn.Home/Index/UploadAction/',
        // 顺带上传的文本
        formData:{},
        success:(res)=>{
          console.log(res);
          let url = JSON.parse(res.data).url
          this.UpLoadImgs.push(url)
          // 所有图片都上传成功后才触发
          if(i===chooseImgs.length-1){
            console.log(11111111);
            wx.hideLoading()
            // 提交成功  清空数据-- 返回上一个页面
            this.setData({
              textVal:"",
              chooseImgs:[]
            })
            wx.navigateBack({
              delta: 1,
            })

          }
        }
      })
    })
    }else{
      console.log("仅上传文本");
    }
   
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
  // 点击加号选择图片
handleChooseImg(){
  wx.chooseImage({
    // 同时选中图片数量
    count: 9,
    // 选择的图片格式，原图-压缩
    sizeType:['original','compressed'],
    // 图片来源
    sourceType:['album','camera'],
    success:(res)=>{
      this.setData({
        chooseImgs:[...this.data.chooseImgs,...res.tempFilePaths]
      })
    }
  })
},
// 被点击图片的索引  -- 待优化---点击小×才删除--现在点击图片就删除了
handleRemoveImg(e){
  // 获取点击足迹的索引
  const {index} = e.currentTarget.dataset
  // 获取data中的图片数组
  let {chooseImgs} = this.data;
  chooseImgs.splice(index,1)
  this.setData({
    chooseImgs
  })

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