<template>
<div class="all_register">
  <div class="register_all">
  <div class="register">
    <form>
   <!--    <el-alert v-show="isSuccess"
    title="恭喜您注册成功，即将跳转到登录界面"
    type="success"
    show-icon>
  </el-alert>

  <el-alert v-show="isHaving"
    title="这个用户名已经被注册了，请重新选择"
    type="warning"
    show-icon>
  </el-alert>

  <el-alert v-show="notSuccess"
    title="请输入正确的格式"
    type="error"
    show-icon>
  </el-alert> -->

    <el-alert v-show="isSuccess"
    title="恭喜您注册成功！"
    type="success"
    description="即将为你跳转到登录界面"
    show-icon>
    </el-alert>

     <el-alert v-show="isHaving"
    title="该用户名已经有人注册过了"
    type="warning"
    description="请重新输入用户名！"
    show-icon>
  </el-alert>

  <el-alert v-show="notSuccess"
    title="你输入的用户名或密码不合法！"
    type="error"
    description="请检查并重新输入！"
    show-icon>
  </el-alert>

        <div class="user">
          <h1 class="register_title">用户注册</h1>
          <label>用 户 名：&nbsp;</label>
          <input type="text" v-model="username">
        </div>
        <div class="pass">
          <label>密&nbsp;&nbsp;&nbsp;码：&nbsp;&nbsp;&nbsp;</label>
          <input type="password" v-model="password">
        </div>
        <div class="pass">
          <label>确认密码：</label>
          <input type="password" v-model="checkpassword">
        </div>
        <div id="submit">
          <button class="submit" @click="register">立即注册</button>
        </div>

        <p class="text"><i class="el-icon-info"></i>我已有账号，点击 <router-link class="sub" to="/login">登录</router-link></p>
       
      </form>
    </div>
  </div>
</div>
</template>

<script>

import {reguser} from '@/api/index'
export default {
  name:'Register',
  data(){
    return{
      username:'',
      password:'',
      checkpassword:'',
      isSuccess:false,
      notSuccess:false,
      isHaving:false,
    }
  },
  methods: {
     async register(){
        if(!this.username) return this.notSuccess=true 
        if(!this.password)  return this.notSuccess=true
        if(!this.checkpassword)  return this.notSuccess=true
        if(this.password!==this.checkpassword) return alert('确认密码与原密码不一致！')
        else{
          //接受axios请求
         const res= await reguser(this.username,this.password);
         console.log(res)
         if(res.status==0){
           this.isSuccess=true;
           setTimeout(() => {
             this.$router.push({name:'login',query:{username:this.username,password:this.password}})
           }, 2000);
         }
         if(res.status==1) return this.notSuccess=true;
          if(res.status==2) return this.isHaving=true;
          /* axios.post('http://127.0.0.1:8001/api/reguser',
          {
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            data:{username:this.username,password:this.password},
          }
          ).then((result)=>{
            console.log(result.data.status)
            if(result.data.status==0){
              this.isSuccess=true;
              setTimeout(() => {
                this.$router.push({name:'login',query:{username:this.username,password:this.password}})
              }, 2000);
              
              }
            if(result.data.status==1) return this.notSuccess=true;
            if(result.data.status==2) return this.isHaving=true;
          },(err)=>{
            console.log(err)
          }) */
        }
      }
  },
}
</script>

<style scope>
.register_title{
  text-align: center;
  margin-bottom: 20px;
}
.all_register{
  margin-top: 50px;
  width: 100%;
  height: 800px;
  display: flex;
  flex-flow: nowrap row;
  justify-content: center;
  align-content: center;
  background-image: url('../Register/background/background.png');
  background-repeat: no-repeat;
  background-size: 100%;
}
.register_all{
    width: 600px;
    height: 500px;
    border: 1px solid gray;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: white;
    margin-top: 150px;

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
.email{
  width: 550px;
  margin: 50px auto;
  font-size: large;
}
.email>input{
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
.text{
  text-align: right;
  margin: 20px 20px;
  font-size: large;
}
.sub{
  color: black;
  text-decoration: none;
}
.sub:hover{
  color: chocolate;
}
</style>