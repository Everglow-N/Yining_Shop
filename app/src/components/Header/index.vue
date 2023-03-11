<template>
  <div class="Header_all">
      <div class="Header">
        <!-- 第一个头部（导航栏） -->
        <div class="Header_first">
          <router-link class="home_router" to="/home"><span>弈宁购物欢迎你！</span></router-link>
          <el-dropdown>
          <span class="el-dropdown-link" v-show="userinfo">
        {{userinfo.username}}
        </span>
        <el-dropdown-menu slot="dropdown">
      <el-dropdown-item><p @click="closeUser">注销用户</p></el-dropdown-item>
        </el-dropdown-menu>
          </el-dropdown>
      
          <span>
            <router-link class="routerlink" to='/Login' v-show="!Authorization">请登录</router-link>
          </span>
         
          <span>
            <router-link class="routerlink" to='/Register'>免费注册</router-link>
          </span>
          <span>
            <router-link class="routerlink" to="/home">返回首页</router-link>
          </span>
          <ul class="header_nav">
            <li><router-link to="/myorder">我的订单</router-link></li>
            <li><router-link to="/shopcart">我的购物车</router-link></li>
            <li><router-link to="/userinfo">个人中心</router-link></li>
            <li><router-link class="routerlink" to="/favorite">收藏夹</router-link></li>
            <li><a href="https://www.baidu.com">合作招商</a></li>
            <li><router-link to="/seller">卖家中心</router-link></li>
          </ul>
          </div>
          <!-- 第二个头部——logo和搜索 -->
        
      </div>
  </div>
  <!-- 第二个头部（logo和搜索框） -->
</template>
<script>
import {token} from '@/api/index'
export default {
    name:'Header',
    data(){
      return{
        /* keyWords:'' */
        Authorization:localStorage.getItem('Authorization'),
        userinfo:[]
      }
    },
    async created(){
     const result = await token(this.Authorization)
     this.userinfo=result;
    },
    methods:{
      closeUser(){
        if(confirm('确定要退出登录吗？')){
        localStorage.removeItem('Authorization')
        location.reload();
        }
      }
    }
}
</script>

<style scope>
  *{
    padding: 0px;
    margin: 0px;
  }
  .home_router{
    color: white;
    text-decoration: none;

  }
  .Header_all{
    width: 100%;
    height: 50px;
    
  }
  .Header{
    width: 100%;
    height: 40px;
    background-color: rgb(116, 163, 250);
  }
  .Header_first{
    width: 1800px;
    height: 60px;
    margin: 0px auto;
    position: relative;
    color: white;
  }
  span{
    margin: 0px 20px;
    height: 40px;
    line-height: 40px;
  }
  .header_nav{
    position:absolute;
    width: 700px;
    height: 40px;
    line-height: 40px;
    right: 0px;
    top:0px;
    padding: 0px;
  }
  .header_nav>li{
    float: left;
    list-style: none;
    margin: 0px 20px;
    padding: 0px;
    
  }
  .routerlink:link{
        color: rgb(247, 245, 245);
        text-decoration: none;
  }
  .routerlink:visited{
    color: rgb(250, 245, 245);
  }
  .routerlink:hover{
    color: burlywood;
  }
  li>a{
    text-decoration: none;
    color: rgb(253, 250, 250);
  }
  li>a:hover{
      color: burlywood;
  }
.el-dropdown-link{
  color: white;
  font-size: large;
}
  
</style>