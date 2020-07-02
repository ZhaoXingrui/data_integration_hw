<template>
  <div class="home-page">
    <div class="home-page-bg"></div>
    <div class="home-page-top">
      <div class="home-page-top-title">
        <img src="@/assets/gupiao.png" class="logo">
        Share Pro
      </div>
      <div class="home-page-top-subtitle">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      input: ''
    }
  },
  methods: {
    searchShare(){
      this.$router.push({
        path: '/share',
        query: {ts_code: this.input}
      })
    }
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
    }
    &-subtitle{
      margin-top: 150px;
      font-size: 80px;
    }
    &-input{
      margin-top: 30px;
    }
  }
}
</style>
