import axios from 'axios'

var instance = axios.create()

// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5d255246e345cc799822ae97/championnet_front'
  instance.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'debug') {
  instance.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  instance.defaults.baseURL = ''
}

// 设置超时时间
instance.defaults.timeout = 60000
// post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 允许携带cookie
instance.defaults.withCredentials = true

// 对外接口
export function request ({method, url, params}) {
  if (method === 'GET') {
    return get(url, params)
  } else if (method === 'POST') {
    return post(url, params)
  }
}

// 封装get方法
function get (url, params) {
  return new Promise((resolve, reject) => {
    instance.get(url, JSON.stringify(params)).then(res => {
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      reject(err.data)
    })
  })
}

// 封装post方法
function post (url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, JSON.stringify(params)).then(res => {
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      reject(err.data)
    })
  })
}
