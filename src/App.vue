<template>
  <div class="app">
    <div class="header">
      <div class="title">
        <i class=" fa fa-address-card "></i>
        看点资讯精选
      </div>
      <div class="info">
        <img :src="user.userface" alt="">
        <div class="user">
          <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">{{user.nickname}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">

            <el-dropdown-item>个人中心</el-dropdown-item>

            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>

        </el-dropdown>
        </div>
        



       
      </div>
    </div>
    <div class="content">
      <div class="left_nav">
        <ul>
          <li :class="{current:currentRoute=='/'}">
            <i class="fa fa-user"></i>
            <router-link to='/'>欢迎页面</router-link>
            <i class="fa fa-angle-right" ></i>
          </li>
          <li :class="{current:currentRoute=='/category'}">
            <router-link to='/category'>栏目管理</router-link>
            <i class="fa fa-angle-right" ></i>

          </li>
          <li :class="{current:currentRoute=='/article'}">
           <router-link to='/article'>文章管理</router-link>

           <!-- <a href="javascript:void(0)" @click='jump("/article")'>文章管理</a> -->
            <i class="fa fa-angle-right" ></i>

          </li>
          <li :class="{current:currentRoute=='/user'}">
             <router-link to='/user'>用户管理</router-link>
            <i class="fa fa-angle-right" ></i>

          </li>
          <li :class="{current:currentRoute=='/exam'}">
             <router-link to='/exam'>考试管理</router-link>
            <i class="fa fa-angle-right" ></i>

          </li>
          <!-- <li >
             <router-link to='/customer/1'>顾客管理1</router-link>
             
          </li> -->
        </ul>

        
        
      </div>
      <div class="right_content">
        <div class="wrapper">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from'@/http/axios'
  export default {
    methods:{
      jump(url){
        this.$router.push(url)
      },
      handleCommand(command){
        if(command=='logout'){
          axios.get('/logout')
          .then(()=>{
          localStorage.removeItem('user')
          });
        }
      }
    },
    watch:{
      '$route':function(to,from){
        this.currentRoute=to.path;
      }
    },
    created(){
      //处理路由默认显示
      this.currentRoute=this.$route.path;
      //处理用户登录。使没有user时到login页面
      let user=JSON.parse(localStorage.getItem('user'));
        if(user){
          this.user=user;
        }else{
        window.vm.currentCompoment = 'Login';
        }
    },
    mounted(){
      // 默认显示user页面
      //this.$router.push('/user');
      
    },
    data(){
      return {
        msg:'App.vue',
        currentRoute:"/",
        user:null
      }
    }
  }
</script>

<style>
  html {
     font:normal normal 15px '微软雅黑','Microsoft YaHei';
      color: #666;

  }
  body,ul,ol,dl,p,h1,h2,h3 {
    margin: 0;
    padding: 0;
  }
  ul,ol {
    list-style: none;
  }
  a{
    color: #666;
    text-decoration: none;
  }
  div{
    box-sizing: border-box;
  }
  .el-dialog__body{
    padding: 0 20px;
  }
  .header {
    position: absolute;
    width: 100%;
    height: 60px;
    top: 0;
    background-color: teal;
    padding: 0 2em;
  }
  .header .title {
    color: #ffffff;
    line-height: 60px;
    font-size: 24px;
    float:left;
  }
  .header .info{
    line-height: 60px;
    height: 60px;
    text-align: right;
    color: #fff;
  }
  .header .info>img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 5px;
    margin-right: 1em;
  }
  .header .info>.user{
    float: right;
    cursor: pointer;
  }
  .header .info >.user .el-dropdown{
    color: #fff;
  }



  .content {
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0;
  }
  .content > .left_nav {
    width: 180px;
    height: 100%;
    float: left;
  }
  .content > .right_content {
    box-sizing: border-box;
    margin-left: 180px;
    height: 100%;
    background-color: #f0f0f0;
    padding: 1em;
  }
  .content > .right_content > .wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: #ffffff;
    padding: .3em;
    overflow-y: auto;
  }
  .left_nav ul {

  }
  .left_nav ul li {
    line-height: 38px;
    text-align: center;
    border-bottom: 1px solid #ededed;
    position: relative;
  }


  .left_nav ul li.current{
    background-color:#f0f0f0; 
  }
  .left_nav ul li>i:first-child{
    position: absolute;
    left: 2.1em;
    font-size: 14px;
    top: 12px;
  }
  .left_nav ul li>i:last-child{
    position: absolute;
    right: 2.1em;
    font-size: 14px;
    top: 12px;
  }


</style>













<!-- <template>
  <div class="app">
    <div class="left-nav">

      <el-menu
      
      default-active='/info'
      router
      background-color="#545c64"
      text-color="#fff"
      @select='selectMenu'
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>考试管理</span>
        </template>
        <el-menu-item index="1-1"> <i class="fa fa-angle-right"></i>创建考试</el-menu-item>
        <el-menu-item index="1-2"> <i class="fa fa-angle-right"></i>考场设置</el-menu-item>
        <el-menu-item index="1-3">
          <i class="fa fa-angle-right"></i>成绩录入
        
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="/department">
        <i class="el-icon-menu"></i>
        <span slot="title">方向管理</span>
      </el-menu-item>
      <el-menu-item index="/info" >
        <i class="el-icon-document"></i>
        <span slot="title">招聘信息</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">招聘管理</span>
      </el-menu-item>
    </el-menu>

    </div>
    <div class="main">
      <div class="wrapper">
        <router-view></router-view>
      </div>
      
    </div>
  </div>
</template>

<script>
  export default{
    methods:{
      
    }
  }
</script>

<style>
  i.fa{
    margin:.5em; 
  }
  body,ul,ol{
    margin: 0;
    padding: 0;
  }
  html,body,.app{
    height: 100%;
  }
  div{
    box-sizing: border-box;
  }
  .left-nav{
    width: 220px;
    float: left;
    height: 100%;
    background-color: #545c64;
  }
  .main{
    margin-left: 220px;
    height: 100%;
    background-color: #f0f0f0;
    padding: .5em;

  }
  .main >.wrapper{
    width: 100%;
    height: 100%;
    padding: .5em;
    border-radius: 5px;
    background-color: #fff;
    overflow-y: auto;

  }

</style> -->