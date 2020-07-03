<template>
  <div class="home-page">
    <div class="home-page-bg"></div>
    <div class="home-page-top">
      <div class="home-page-top-title">
        <img src="@/assets/gupiao.png" class="logo">
        Share Pro
      </div>
      <div class="home-page-top-subtitle" style="font-family: Papyrus;">
        NJU Share System
      </div>
      <div>
        <el-input
          type="text"
          placeholder="请输入股票代码，比如000001.SZ"
          v-model="input"
          @keyup.enter.native="searchShare()"
          class="home-page-top-input"
          style="width: 1200px;height: 50px"
          suffix-icon="el-icon-search">
        </el-input>
      </div>
      <div id="pe-line" style="width: 100%; height: 600px"></div>
    </div>
  </div>
</template>

<script >
import echarts from 'echarts'
import {getDailyCloseBetweenDate,getDailyByCodeBetweenDate} from "../../api/getData"
export default {
  name: "index",
  data () {
    return {
      input: '',
      daily_close_01:[],
      daily_close_02:[],
      daily_close_03:[],
      daily_close_04:[],
      date: []
    }
  },
  methods: {
    searchShare(){
      this.$router.push({
        path: '/share',
        query: {ts_code: this.input}
      })
    },
    initializeData(){
      getDailyCloseBetweenDate('000001.SH','20180101', '20200601').then(res=>{
        console.log(res.detail.length)
        for(let i=res.detail.length-1;i>=0;i--){
          this.date.push(res.detail[i].tradeDate)
          this.daily_close_01.push(res.detail[i].close)
        }
      }).finally(
        () => getDailyCloseBetweenDate('399001.SZ','20180101', '20200601').then(res=>{
          console.log(res.detail.length)
          for(let i=res.detail.length-1;i>=0;i--){
            this.daily_close_02.push(res.detail[i].close)
          }
        }).finally(
          () => getDailyCloseBetweenDate('399005.SZ','20180101', '20200601').then(res=>{
            console.log(res.detail.length)
            for(let i=res.detail.length-1;i>=0;i--){
              this.daily_close_03.push(res.detail[i].close)
            }
          }).finally(
            ()=>getDailyCloseBetweenDate('399006.SZ','20180101', '20200601').then(res=>{
              console.log(res.detail.length)
              for(let i=res.detail.length-1;i>=0;i--){
                this.daily_close_04.push(res.detail[i].close)
              }
            }).finally(
              ()=> this.initializeGraph()
            )
          )
        )
      )






    },
    initializeGraph(){
      let myChart = echarts.init(document.getElementById('pe-line'));
      let option = {
        title: {
          x: '50%',
          text: 'PE Line',
          textStyle: { // 图例文字的样式
            color: 'white',
            fontFamily: 'Papyrus',
            fontSize: 20,
            paddingBottom: 10,
            marginTop:10
          }
        },
        legend:{
          y: '5%',
          data:['000001.SH','399001.SZ','399005.SZ','399006.SZ'],
          textStyle: {
            fontFamily: 'Papyrus',
            color:'stroke'
          }

        },
        xAxis: {
          type: 'category',
          data: this.date,
          name: 'Date',
          axisLabel: {
            color: '#fff'
          },
          nameTextStyle:{
            fontWeight: 600,
            fontSize: 18,
            fontFamily: 'Papyrus',
            color:'white'
          }
        },
        yAxis:{
          color: '#fff',
          type: 'value',
          name: 'Amount at close',
          axisLabel: {
            color: '#fff'
          },
          nameTextStyle:{
            fontWeight: 600,
            fontSize: 18,
            fontFamily: 'Papyrus',
            color:'white'
          }
        },
        label:{},
        tooltip:{
          trigger: 'axis'
        },
        series:[
          {
            name: '000001.SH',
            data: this.daily_close_01,
            type: 'line',
            lineStyle: {
              normal: {
                color: "red",
              },
            },
          },
          {
            name: '399001.SZ',
            data: this.daily_close_02,
            type: 'line',
            lineStyle:{
              normal: {
                color: "green"
              }
            }
          },
          {
            name: '399005.SZ',
            data: this.daily_close_03,
            type: 'line',
            lineStyle: {
              normal: {
                color: "yellow"
              }
            }
          },
          {
            name: '399006.SZ',
            data: this.daily_close_04,
            type: 'line'
          }
        ]

      };
      console.log('hi');

      myChart.setOption(option);
    }
  },
  created() {
    this.initializeData();
  }
}
</script>

<style lang="scss">
.home-page{
  &-bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    z-index: -1;
    zoom: 1;
    background-image: url("~@/assets/bg1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 0;
    opacity: 1;
  }
  &-top{
    width: 100%;
    height: 500px;
    color: white;
    .logo{
      width: 40px;
      height: 40px;
      margin-left: 30px;
    }
    &-title{
      text-align: left;
      font-size: 45px;
      font-weight: bold;
      font-family: Papyrus;
    }
    &-subtitle{
      margin-top: 0px;
      font-size: 80px;
    }
    &-input{
      margin-top: 30px;
    }
  }
}
</style>
