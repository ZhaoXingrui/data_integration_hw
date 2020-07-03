import {request} from '../utils/request'

// 根据ts_code获取股票信息
export function getShareInfoByCode(ts_code) {
  return request({
    method: 'GET',
    url: '/api/search/stock/code/' + ts_code
  })
}

// 根据ts_code获取公司信息
export function getCompanyInfoByCode(ts_code) {
  return request({
    method: 'GET',
    url: '/api/search/company/code/' + ts_code
  })
}

// 根据ts_code获取最近一天的股市信息
export function getLatestShareInfoByCode(code, day) {
  return request({
    method: 'GET',
    url: '/api/search/daily/code/day?code=' + code + '&day=' + day
  })
}

// 根据ts_code、startDay和endDay获取股票的日线信息
export function getDailyByCodeBetweenDate(code, startDay, endDay) {
  return request({
    method: 'GET',
    url: '/api/search/daily/between3?code=' + code + '&startDay=' + startDay + '&endDay=' + endDay
  })
}

// 根据ts_code，startDate和endDate获取某一指数的日收尾价
export function getDailyCloseBetweenDate(code, startDate, endDate)  {
  return request({
    method:'GET',
    url: '/api/search/indexDaily/between3?code=' + code + '&startDay=' + startDate + '&endDay=' + endDate
  })
}    

// 根据ts_code获取股票的周线信息
export function getWeeklyByCode(code) {
  return request({
    method: 'GET',
    url: '/api/search/weekly/' + code
  })
}

// 根据ts_code获取股票的月线信息
export function getMonthlyByCode(code) {
  return request({
    method: 'GET',
    url: '/api/search/monthly/' + code
  })
}

// 根据ts_code获取股票的半年内的数据分析信息
export function getRecommendByCode(code) {
  return request({
    method: 'GET',
    url: '/api/search/recommend/' + code
  })
}
