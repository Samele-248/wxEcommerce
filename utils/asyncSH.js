// 收货地址的async写法

export const getSetting = () =>{
  return new Promise((res,rej) =>{
    wx.getSetting({
      success: (result) => {
        res(result)
      },
      fail: (err) =>{
        rej(err)
      }
    })
  })
}

export const chooseAddress = () =>{
  return new Promise((res,rej) =>{
    wx.chooseAddress({
      success: (result) => {
        res(result)
      },
      fail: (err) =>{
        rej(err)
      }
    })
  })
}

export const openSetting = () =>{
  return new Promise((res,rej) =>{
    wx.openSetting({
      success: (result) => {
        res(result)
      },
      fail: (err) =>{
        rej(err)
      }
    })
  })
}

// 封装控值提示  -- 可以选择确定和取消
export const showModal = ({content}) =>{
  return new Promise((res,rej) =>{
    wx.showModal({
      title: '提示',
      content,
      success: (result) => {
        res(result)
      },
      fail: (err) =>{
        rej(err)
      }
    })
  })
}
// 封装提示
export const showToast = ({title}) =>{
  return new Promise((res,rej) =>{
    wx.showToast({
      title,
      icon: 'none',
      success: (result) => {
        res(result)
      },
      fail: (err) =>{
        rej(err)
      }
    })
  })
}

// 获取token
export const login = () =>{
  return new Promise((res,rej) =>{
    wx.login({
      timeout: 1000,
      success: (result) => {
        res(result)
      },
      fail: (err) =>{
        rej(err)
      }
    })
  })
}

// 微信支付
export const requestPayment = pay =>{
  return new Promise((res,rej) =>{
    wx.requestPayment({
      ...pay,
      success: (result) => {
        res(result)
      },
      fail: (err) =>{
        rej(err)
      }
    })
  })
}


