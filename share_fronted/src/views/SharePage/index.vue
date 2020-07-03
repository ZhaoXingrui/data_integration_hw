<template>
  <div class="share-page">
    <div class="share-page-bg"></div>
    <div class="share-page-top">
      <el-row>
        <el-col :span="4">
          <img src="@/assets/gupiao.png" class="logo">
          Share Pro
        </el-col>
        <el-col :span="8" :offset="3">
          <el-input
            placeholder="请输入股票代码，比如000001.SZ"
            v-model="input"
            class="share-input"
            suffix-icon="el-icon-search"
            @keyup.enter.native="searchShare()"
            clearable>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <div class="share-page-body">
      <div class="share-page-body-title">股票详情</div>
      <div class="share-page-body-info">
        <!-- 股票代码 -->
        <el-row>
          <el-col :span="6">
            <div class="name">
              {{info.symbol}}({{info.name}})
            </div>
          </el-col>
        </el-row>
        <!-- 股票基本信息 -->
        <el-row>
          <el-col :span="22" :offset="1">
            <el-divider content-position="left">股票信息</el-divider>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="common">
              所在地域：<span class="content">{{info.area}}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="common">
              所属行业：<span class="content">{{info.industry}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="common">
              股票全称：<span class="content">{{info.fullname}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="common">
              英文全称：<span class="content">{{info.enname}}</span>
            </div>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="4">
            <div class="common">
              市场类型：<span class="content">{{info.market}}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="common">
              交易所代码：<span class="content">{{info.exchange}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="common">
              交易货币：<span class="content">{{info.curr_type}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="common">
              上市日期：<span class="content">{{info.list_date}}</span>
            </div>
          </el-col>
        </el-row>
        <!-- 公司信息 -->
        <el-row>
          <el-col :span="22" :offset="1">
            <el-divider content-position="left">公司信息</el-divider>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15" :offset="1">
            <div style="text-align: left;font-size: 30px;font-weight: bold;">{{info.fullname}}</div>
            <br>
            <div class="common left1">
              公司高层：
              董事长：<span class="content">{{company_info.chairman}}</span>
              <el-divider direction="vertical"></el-divider>
              总经理：<span class="content">{{company_info.manager}}</span>
              <el-divider direction="vertical"></el-divider>
              董秘：<span class="content">{{company_info.secretary}}</span>
            </div>
            <br>
            <div class="common left1">
              基本信息：
              注册资金：<span class="content">{{company_info.reg_capital}}</span>
              <el-divider direction="vertical"></el-divider>
              注册日期：<span class="content">{{company_info.setup_date}}</span>
              <el-divider direction="vertical"></el-divider>
              员工数量：<span class="content">{{company_info.employees}}</span>
            </div>
            <br>
            <div class="common left1">
              地址：
              <span class="content">{{company_info.address}}</span>
            </div>
            <br>
            <div class="common left1">
              公司主页：
              <a class="content website" @click="turnto()">{{company_info.website}}</a>
            </div>
            <br>
            <div class="common left1">
              Email：
              <span class="content">{{company_info.email}}</span>
            </div>
          </el-col>
          <el-col :span="7">
            <div style="width: 100%;height: 300px">
              <baidu-map
                v-bind:style="map_info.mapStyle"
                class="bm-view"
                ak="公司位置"
                :center="map_info.center"
                :zoom="map_info.zoom"
                :scroll-wheel-zoom="true"
                @click="getClickInfo"
                @moving="synCenterAndZoom"
                @moveend="synCenterAndZoom"
                @zoomed="synCenterAndZoom">
                <bm-view style="width: 100%;height: 300px"></bm-view>
                <bm-marker :position="{lng: map_info.center.lng, lat: map_info.center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
                <bm-local-search :keyword="map_info.keyword" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
              </baidu-map>
            </div>
          </el-col>
        </el-row>
        <!-- 今日股市信息 -->
        <el-row>
          <el-col :span="22" :offset="1">
            <el-divider content-position="left">今日股市信息</el-divider>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="1">
            <div class="common">
              今日收盘价：<span style="color: lawngreen;font-size: 50px">{{today_info.close}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="common">
              <div>最高：<span class="content">{{today_info.highest}}</span></div>
              <br>
              <div>最低：<span class="content">{{today_info.lowest}}</span></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="common">
              <div>今开：<span class="content">{{today_info.open}}</span></div>
              <br>
              <div>昨收：<span class="content">{{today_info.pre_close}}</span></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="common">
              <div>成交量：<span class="content">{{today_info.vol}}</span></div>
              <br>
              <div>成交额：<span class="content">{{today_info.amount}}</span></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="common">
              <div>涨跌额：<span class="content">{{today_info.change}}</span></div>
              <br>
              <div>涨跌幅：<span class="content">{{today_info.pct_chg}}</span></div>
            </div>
          </el-col>
        </el-row>
        <!-- 近半年来的股票信息分析 -->
        <el-row>
          <el-col :span="22" :offset="1">
            <el-divider content-position="left">近半年股票数据分析</el-divider>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="common" style="text-align: center">
              <el-popover
                placement="top-start"
                title="计算公式"
                width="300"
                trigger="hover"
                content="推荐指数=(总涨跌幅*100+上涨天数*1.0/总天数*100+净资产收益率*100+200)/5">
                <i class="el-icon-question" slot="reference"></i>
              </el-popover>
              推荐指数：<span class="content big" :style="{'color':calculateColor(recommend_info.recommend)}">{{recommend_info.recommend}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="1">
            <div class="common">
              上涨天数：<span class="content big" style="color: #00FF00">{{recommend_info.up}}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="2">
            <div class="common">
              下跌天数：<span class="content big" style="color: #FF0000">{{recommend_info.down}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="1">
            <div class="common">
              半年内总涨跌幅：<span class="content big">{{recommend_info.pctChg}}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="2">
            <div class="common">
              近半年净利润：<span class="content big">{{recommend_info.profit}}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="2">
            <div class="common">
              净资产收益率：<span class="content big">{{recommend_info.profitRate}}</span>
            </div>
          </el-col>
        </el-row>
        <!-- K线图 -->
        <el-row>
          <el-col :span="22" :offset="1">
            <el-divider content-position="left">变化图</el-divider>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22" :offset="1">
            <div id="daily-k-line" class="graph"></div>
            <br>
            <div id="weekly-line" class="graph"></div>
            <br>
            <div id="monthly-line" class="graph"></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {getShareInfoByCode,
        getCompanyInfoByCode,
        getLatestShareInfoByCode,
        getDailyByCodeBetweenDate,
        getWeeklyByCode,
        getMonthlyByCode,
        getRecommendByCode} from "../../api/getData"
import {BaiduMap, BmControl, BmView, BmAutoComplete, BmLocalSearch, BmMarker} from 'vue-baidu-map'
export default {
  name: "index",
  components: {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker
  },
  data () {
    return {
      input: '',
      activeName: 'weekly',
      info: {
        ts_code: '',
        symbol: '',
        name: '',
        area: '',
        industry: '',
        fullname: '',
        enname: '',
        market: '',
        exchange: '',
        curr_type: '',
        list_date: '',
        is_hs: ''
      },
      company_info: {
        chairman: '',
        manager: '',
        secretary: '',
        reg_capital: 0,
        setup_date: '',
        province: '',
        city: '',
        address: '',
        website: '',
        email: '',
        employees: 0
      },
      today_info: {
        highest: 0,
        lowest: 0,
        open: 0,
        close: 0,
        pre_close: 0,
        vol: 0,
        amount: 0,
        change: 0,
        pct_chg: 0
      },
      map_info: {
        keyword: '',
        mapStyle: {
          width: '100%',
          height: '100%'
        },
        center: {lng: 116.404, lat:39.915},
        zoom: 15
      },
      recommend_info: {
        pctChg: 0,
        up: 0,
        down: 0,
        profit: 0,
        profitRate: 0,
        recommend: 0
      },
      daily_share: [],
      split_daily_share: [],
      weekly_share: [],
      split_weekly_share: [],
      monthly_share: [],
      split_monthly_share: []
    }
  },
  methods: {
    // 初始化股票信息、公司信息和最近一天的股情
    initVal () {
      this.daily_share = []
      this.split_daily_share = []
      this.weekly_share = []
      this.split_weekly_share = []
      this.monthly_share = []
      this.split_monthly_share = []
      this.info.ts_code = this.$route.query.ts_code
      // 获取股票信息
      getShareInfoByCode(this.info.ts_code).then(res => {
        this.info.symbol = res.detail.symbol
        this.info.name = res.detail.name
        this.info.area = res.detail.area
        this.info.industry = res.detail.industry
        this.info.fullname = res.detail.fullname
        this.info.enname = res.detail.enname
        this.info.market = res.detail.market
        this.info.exchange = res.detail.exchange
        this.info.curr_type = res.detail.currType
        this.info.list_date = res.detail.listDate
        if (res.detail.isHs === 'N') {
          this.info.is_hs = '非沪非深股通'
        } else if (res.detail.isHs === 'H') {
          this.info.is_hs = '沪股通'
        } else if (res.detail.isHs === 'S') {
          this.info.is_hs = '深股通'
        }
      })
      // 获取公司信息
      getCompanyInfoByCode(this.info.ts_code).then(res1 => {
        this.company_info.chairman = res1.detail.chairman === null ? '暂无信息' : res1.detail.chairman
        this.company_info.manager = res1.detail.manager === null ? '暂无信息' : res1.detail.manager
        this.company_info.secretary = res1.detail.secretary === null ? '暂无信息' : res1.detail.secretary
        this.company_info.reg_capital = res1.detail.regCapital
        this.company_info.setup_date = res1.detail.setupDate
        this.company_info.province = res1.detail.province
        this.company_info.city = res1.detail.city
        this.company_info.address = this.getAddress(this.company_info.province, this.company_info.city)
        this.company_info.website = res1.detail.website
        this.company_info.email = res1.detail.email
        this.company_info.employees = res1.detail.employees
        this.map_info.keyword = this.company_info.address + this.info.fullname
        console.log(this.company_info)
      })
      // 获取最近一天的股市信息
      getLatestShareInfoByCode(this.info.ts_code, '20200601').then(res2 => {
        this.today_info.highest = res2.detail[0].high
        this.today_info.lowest = res2.detail[0].low
        this.today_info.open = res2.detail[0].open
        this.today_info.close = res2.detail[0].close
        this.today_info.pre_close = res2.detail[0].preClose
        this.today_info.vol = res2.detail[0].vol
        this.today_info.amount = res2.detail[0].amount
        this.today_info.change = res2.detail[0].change
        this.today_info.pct_chg = res2.detail[0].pctChg
      })
      // 获取日线信息
      getDailyByCodeBetweenDate(this.info.ts_code, '20180101', '20200601').then(res3 => {
        for (let i = res3.detail.length - 1; i >= 0; i--) {
          let temp = []
          temp.push(res3.detail[i].tradeDate)
          temp.push(res3.detail[i].open)
          temp.push(res3.detail[i].close)
          temp.push(res3.detail[i].low)
          temp.push(res3.detail[i].high)
          temp.push(res3.detail[i].amount)
          this.daily_share.push(temp)
        }
        this.split_daily_share = this.splitData(this.daily_share)
        this.initDailyGraph()
      })
      // 获取周线信息
      getWeeklyByCode(this.info.ts_code).then(res4 => {
        for (let i = res4.detail.length - 1; i >= 0; i--) {
          let temp = []
          temp.push(res4.detail[i].tradeDate)
          temp.push(res4.detail[i].open)
          temp.push(res4.detail[i].close)
          temp.push(res4.detail[i].low)
          temp.push(res4.detail[i].high)
          temp.push(res4.detail[i].amount)
          this.weekly_share.push(temp)
        }
        this.split_weekly_share = this.splitData(this.weekly_share)
        this.initOtherGraph(this.split_weekly_share, '周线图', '周K', 'weekly-line')
      })
      // 获取月线信息
      getMonthlyByCode(this.info.ts_code).then(res5 => {
        for (let i = res5.detail.length - 1; i >= 0; i--) {
          let temp = []
          temp.push(res5.detail[i].tradeDate)
          temp.push(res5.detail[i].open)
          temp.push(res5.detail[i].close)
          temp.push(res5.detail[i].low)
          temp.push(res5.detail[i].high)
          temp.push(res5.detail[i].amount)
          this.monthly_share.push(temp)
        }
        this.split_monthly_share = this.splitData(this.monthly_share)
        this.initOtherGraph(this.split_monthly_share, '月线图', '月k', 'monthly-line')
      })
      // 获取半年内的股票分析信息
      getRecommendByCode(this.info.ts_code).then(res6 => {
        let temp = res6.detail.pctChg
        temp = temp.toFixed(2)
        this.recommend_info.pctChg = temp
        this.recommend_info.up = res6.detail.up
        this.recommend_info.down = res6.detail.down
        let temp1 = res6.detail.profit
        temp1 = temp1.toFixed(3)
        this.recommend_info.profit = temp1
        let temp2 = res6.detail.profitRate
        temp2 = temp2.toFixed(4)
        this.recommend_info.profitRate = temp2
        let temp3 = res6.detail.recommend
        temp3 = (temp3 - 40) * 5
        temp3 = temp3.toFixed(2)
        this.recommend_info.recommend = temp3
      })
    },
    // 获取真实地址
    getAddress(province, city){
      let address = ''
      let municipalityList = ['北京', '重庆', '上海', '天津']
      let autonomousRegionList = ['广西', '内蒙古', '新疆', '宁夏', '西藏']
      if (municipalityList.indexOf(province) !== -1) {
        address = city
      } else if (autonomousRegionList.indexOf(province) !== -1) {
        if (province === '广西') {
          address = province + '壮族自治区' + city
        } else if (province === '内蒙古' || province === '西藏') {
          address = province + '自治区' + city
        } else if (province === '新疆') {
          address = province + '维吾尔自治区' + city
        } else if (province === '宁夏') {
          address = province + '回族自治区' + city
        }
      } else {
        address = province + '省' + city
      }
      return address
    },
    // 地图点击事件
    getClickInfo(e){
      this.map_info.lng = e.point.lng
      this.map_info.lat = e.point.lat
    },
    synCenterAndZoom(e){
      const {lng, lat} = e.target.getCenter()
      this.map_info.lng = lng
      this.map_info.lat = lat
      this.zoom = e.target.getZoom()
    },
    // 根据推荐指数改变颜色
    calculateColor(value){
      let color = ''
      if (value <= 20) {
        color = '#FF0000'
      } else if (value <= 40 && value > 20) {
        color = '#8000FF'
      } else if (value <= 60 && value > 40) {
        color = '#FFA500'
      } else if (value <= 80 && value > 60) {
        color = '#FFFF00'
      } else if (value > 80) {
        color = '#00FF00'
      }
      return color
    },
    // 在该页查询股票信息
    searchShare(){
      this.$router.push({
        path: '/share',
        query: {ts_code: this.input}
      })
      this.initVal()
    },
    // 跳转到公司主页
    turnto () {
      window.location.href = 'https://' + this.company_info.website
    },
    // 数据分离
    splitData(rawData){
      let categoryData = []
      let values = []
      let turnover = []
      let closePrice = []
      for (let i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i])
        turnover.push(rawData[i][4])
        closePrice.push(rawData[i][1])
      }
      return {
        categoryData: categoryData,
        values: values,
        turnover: turnover,
        closePrice: closePrice
      }
    },
    // 计算MA值
    calculateMA(split_data, dayCount){
      let result = []
      for (let i = 0, len = split_data.values.length; i < len; i++){
        if (i < dayCount - 1) {
          let sum = 0
          for (let j = 0; j <= i;j++){
            sum += split_data.values[j][1]
          }
          let temp = sum / (i + 1)
          temp = temp.toFixed(2)
          result.push(temp)
          // result.push('-')
          continue
        }
        let sum = 0
        for (let j = 0; j < dayCount;j++){
          sum += split_data.values[i - j][1];
        }
        let temp = sum / dayCount
        temp = temp.toFixed(2)
        result.push(temp)
      }
      return result
    },
    // 绘制日线图
    initDailyGraph(){
      let myChart = echarts.init(document.getElementById('daily-k-line'))
      let option = {
        title: {
          text: '日线图',
          textStyle: {
            color: '#fff'
          }
        },
        backgroundColor: '#21202D',
        legend: {
          data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30', '成交额'],
          inactiveColor: '#777',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false,
            type: 'cross',
            lineStyle: {
              color: '#376df4',
              width: 2,
              opacity: 1
            }
          }
        },
        xAxis: {
          type: 'category',
          data: this.split_daily_share.categoryData,
          axisLine: {
            lineStyle: {
              color: '#8392A5'
            }
          }
        },
        yAxis: [{
          name: 'price(价格)',
          scale: true,
          axisLine: {
            lineStyle: {
              color: '#8392A5'
            }
          },
          splitLine: {
            show: false
          }
        },
          {
            name: 'amount(成交额)',
            type: 'value',
            scale: true,
            axisLine: {
              lineStyle: {
                color: '#8392A5'
              }
            },
            splitLine: {
              show: false
            }
          }],
        grid: {
          bottom: 80,
          right: 100
        },
        dataZoom: [{
          textStyle: {
            color: '#8392A5'
          },
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          height: '20px',
          dataBackground: {
            areaStyle: {
              color: '#8392A5'
            },
            lineStyle: {
              opacity: 0.8,
              color: '#8392A5'
            }
          },
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }, {
          type: 'inside'
        }],
        animation: false,
        series: [{
          type: 'candlestick',
          name: '日K',
          data: this.split_daily_share.values,
          itemStyle: {
            normal: {
              color: '#FD1050',
              color0: '#0CF49B',
              borderColor: '#FD1050',
              borderColor0: '#0CF49B'
            }
          }
        },
          {
            name: 'MA5',
            type: 'line',
            data: this.calculateMA(this.split_daily_share, 5),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            }
          },
          {
            name: 'MA10',
            type: 'line',
            data: this.calculateMA(this.split_daily_share, 10),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            }
          },
          {
            name: 'MA20',
            type: 'line',
            data: this.calculateMA(this.split_daily_share, 20),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            }
          },
          {
            name: 'MA30',
            type: 'line',
            data: this.calculateMA(this.split_daily_share, 30),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            }
          },
          {
            name: '成交额',
            type: 'bar',
            data: this.split_daily_share.turnover,
            yAxisIndex: 1,
            color: 'blue'
          }
        ]
      }
      myChart.setOption(option)
    },
    // 绘制周线图
    initOtherGraph(data, title, k, id){
      let myChart = echarts.init(document.getElementById(id))
      let option = {
        title: {
          text: title,
          textStyle: {
            color: '#fff'
          }
        },
        backgroundColor: '#21202D',
        legend: {
          data: [k, '收盘价','成交额'],
          inactiveColor: '#777',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false,
            type: 'cross',
            lineStyle: {
              color: '#376df4',
              width: 2,
              opacity: 1
            }
          }
        },
        xAxis: {
          type: 'category',
          data: data.categoryData,
          axisLine: {
            lineStyle: {
              color: '#8392A5'
            }
          }
        },
        yAxis: [{
          name: 'price(价格)',
          scale: true,
          axisLine: {
            lineStyle: {
              color: '#8392A5'
            }
          },
          splitLine: {
            show: false
          }
        },
          {
            name: 'amount(成交额)',
            type: 'value',
            scale: true,
            axisLine: {
              lineStyle: {
                color: '#8392A5'
              }
            },
            splitLine: {
              show: false
            }
          }],
        grid: {
          bottom: 80,
          right: 100
        },
        dataZoom: [{
          textStyle: {
            color: '#8392A5'
          },
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          height: '20px',
          dataBackground: {
            areaStyle: {
              color: '#8392A5'
            },
            lineStyle: {
              opacity: 0.8,
              color: '#8392A5'
            }
          },
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }, {
          type: 'inside'
        }],
        animation: false,
        series: [{
          type: 'candlestick',
          name: '周K',
          data: data.values,
          itemStyle: {
            normal: {
              color: '#FD1050',
              color0: '#0CF49B',
              borderColor: '#FD1050',
              borderColor0: '#0CF49B'
            }
          }
        },
          {
            name: '收盘价',
            type: 'line',
            data: data.closePrice,
            smooth: false,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            }
          },
          {
            name: '成交额',
            type: 'bar',
            data: data.turnover,
            yAxisIndex: 1,
            color: 'blue'
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  created() {
    this.initVal()
  }
}
</script>

<style lang="scss">
.share-page{
  color: white;
  &-bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    z-index: -1;
    zoom: 1;
    background: black;
    opacity: 1;
  }
  &-top{
    text-align: left;
    font-size: 45px;
    font-weight: bold;
    .logo{
      width: 40px;
      height: 40px;
      margin-left: 30px;
    }
    .share-input{
      width: 700px;
      height: 90px;
      line-height: 90px;
    }
  }
  &-body{
    background: rgba(255,255,255,0.8);
    width: 80%;
    /*height: 2000px;*/
    margin: auto;
    color: black;
    border-radius: 5px;
    &-title{
      font-size: 40px;
      font-weight: bold;
    }
    &-info{
      .name{
        font-size: 30px;
      }
      .common{
        font-size: 20px;
        .content{
          font-weight: bolder;
        }
        .big{
          font-size: 30px;
        }
      }
      .left1{
        text-align: left;
      }
      .website{
        color: blue;
        cursor: pointer;
        text-decoration: underline;
      }
      .graph{
        width: 100%;
        height: 600px;
      }
    }
  }
}
</style>
