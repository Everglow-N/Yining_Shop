<template>
<div class="all_login">
  <div class="login_all">
  <div class="login">
    <form>
      <el-alert v-show="success"
    title="登陆成功！！！即将为您跳转到首页"
    type="success"
    show-icon>
  </el-alert>
  
  <el-alert v-show="notsuccess"
    title="用户名或密码不正确"
    type="error"
    show-icon>
  </el-alert>
        <div class="user">
          <h1 class="login_title">用户登录</h1>
          <label>用户名：</label>
          <input type="text" v-model="username" @blur="check_username" ref="username">
        </div>
        <div class="pass">
          <label>密&nbsp;&nbsp;&nbsp;码：</label>
          <input type="password" v-model="password" @blur="check_password" ref="password">
        </div>
        <div id="submit">
          <button class="submit" @click="toLogin">登 &nbsp;录</button>
        </div>
        <div class="foot">
          <router-link to="/Register" class="router_link">用户注册</router-link>
          <router-link to="/Register" class="router_link">忘记密码</router-link>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>

import {login} from '@/api/index';
export default {
  name:'Login',
  data(){
      return{
        username:'',
        password:'',
        success:false,
        notsuccess:false
      }
  },
  mounted(){
    this.username=this.$route.query.username;
    this.password=this.$route.query.password;
  },
  methods:{
        check_username(){
          if(!this.username){
              this.$refs.username.style.border='2px solid red';
              this.$refs.username.placeholder='用户名不能为空！'
          }
          else{
            this.$refs.username.style.border='1px solid black'
            this.$refs.username.placeholder=''
          }
        },
        check_password(){
          if(!this.username){
              this.$refs.password.style.border='2px solid red';
              this.$refs.password.placeholder='密码不能为空！'
          }
          else{
            this.$refs.password.style.border='1px solid black'
            this.$refs.password.placeholder=''
          }
        },
       async toLogin(){
       const res= await login(this.username,this.password)
          if(res.status==0){
            this.success=true
            localStorage.setItem('Authorization',res.token)
            setTimeout(() => {
                this.$router.push({path:'/home'})
                location.reload();
            }, 2000);
          }
          if(res.status==2){
             this.notsuccess=true
             setTimeout(() => {
               this.notsuccess=false
             }, 3000);
          }
         /*   axios.post('http://127.0.0.1:8001/api/login',
            {
              headers:{'Content-Type':'application/x-www-form-urlencoded'},
              data:{username:this.username,password:this.password},
            },
            ).then((res)=>{
              if(res.data.status==0){
                console.log('登录成功');
                localStorage.setItem('Authorization',res.data.token)
              }
              else return console.log('登录失败')
            },(err)=>{
              console.log(err)
            }) */
        },
}
}
</script>

<style scope>
.all_login{
  margin-top: 50px;
  width: 100%;
  height: 800px;
  display: flex;
  flex-flow: nowrap row;
  justify-content: center;
  align-content: center;
  background-image: url('../Login/background/background.png');
  background-repeat: no-repeat;
  background-size: 100%;
}
.login_all{
    width: 600px;
    height: 450px;
    border: 1px solid gray;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: white;
    margin-top: 200px;
}
.login_title{
  text-align: center;
  margin-bottom: 20px;
}
.user{
  width: 550px;
  margin: 20px auto;
  font-size: large;
}
.user>input{
  width: 400px;
  height: 40px;
  font-size: large;
}
.pass{
  width: 550px;
  margin: 50px auto;
  font-size: large;
}
.pass>input{
  width: 400px;
  height: 40px;
  font-size: large;
}
#submit{
  width: 600px;
  height: 50px;
  display: flex;
  flex-flow: nowrap row;
  justify-content: center;
  align-content: center;
}
.submit{
    width: 400px;
    height: 50px;
    background-color: dodgerblue;
    border: none;
    color: white;
    font-size: large;
    cursor: pointer;
}
.foot{
  display: flex;
  flex-flow: row nowrap;
  justify-content: right;
  margin-top: 40px;
}
.router_link{
  text-decoration: none;
  color: rgb(105, 105, 105);
  margin: 0px 30px;
}
.router_link:hover{
  color: coral;
}
</style>