<template>
  <div>
    <el-button @click="test()">dianwo</el-button>
    {{result}}
    <el-button @click="test1()">dianwo1</el-button>
    {{result1}}
    <el-button @click="test2()">dianwo2</el-button>
    {{result2}}
    <el-button @click="test3()">dianwo3</el-button>
    {{result3}}
  </div>
</template>

<script>
import {getShareInfoByCode, getCompanyInfoByCode, getLatestShareInfoByCode, getDailyByCodeBetweenDate} from "../api/getData"
export default {
  name: "test",
  data () {
    return {
      result: [],
      result1: [],
      result2: [],
      result3: []
    }
  },
  methods: {
    test(){
      getShareInfoByCode('000001.SZ').then(res => {
        this.result = res.detail
        console.log(res)
      })
    },
    test1(){
      getCompanyInfoByCode('000001.SZ').then(res => {
        this.result1 = res.detail
        console.log(res)
      })
    },
    test2(){
      getLatestShareInfoByCode('000001.SZ','20200601').then(res => {
        this.result2 = res.detail
        console.log(res)
      })
    },
    test3(){
      getDailyByCodeBetweenDate('000001.SZ','20180101','20200601').then(res => {
        // this.result3 = res.detail
        // console.log(res.detail.length)
        for (let i = res.detail.length - 1; i >= 0; i--) {
          let temp = []
          temp.push(res.detail[i].tradeDate)
          temp.push(res.detail[i].open)
          temp.push(res.detail[i].close)
          temp.push(res.detail[i].low)
          temp.push(res.detail[i].high)
          temp.push(res.detail[i].amount)
          this.result3.push(temp)
        }
        console.log(this.result3)
      })
    }
  }
}
</script>

<style scoped>

</style>
