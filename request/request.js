let ajaxTimes = 0 // 多次请求后，关闭显示计数
export const request = params=>{
  // 根据路径里边是否有/my/来判断要不要带请求头
  let header = {...params.header}
  if(params.url.includes("/my/")){
    header["Authorization"]=wx.getStorageSync('token')
  }

  // 加载中-效果
  ajaxTimes++ // 计算请求次数
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((res,rej)=>{
    wx.request({
      ...params,
      header:header,
      url:baseUrl+params.url,
      success: (result) => {
        res(result.data.message); // 对得到的数据做处理，简便接收数据写法
      },
      fail: (res) => {
        rej(res)
      },
      complete: (res) => {
        ajaxTimes--
        if(ajaxTimes===0){
          // 不管请求成功还是失败都关闭加载中效果
          wx.hideLoading()
        }
      }
    })
  })
}