<template>
  <div class="sendshop_module">
    <form class="write_ordernum">
      <p>请选择快递公司</p>
      <select v-model="kuaidi">
        <option value="no">-</option>
        <option value="圆通快递">圆通快递</option>
        <option value="中通快递">中通快递</option>
        <option value="中国邮政">中国邮政</option>
        <option value="顺丰快递">顺丰快递</option>
      </select>
      <br />
      <p style="text-align: center">请输入订单号</p>
      <input v-model="kuaidiNum" type="text" />

      <button @click="sending">确认</button>
    </form>
  </div>
</template>

<script>
import {sendshop} from '@/api/index'
export default {
  name: "SendShop",
  data() {
    return {
      kuaidi: "-",
      kuaidiNum: null,
      shopInfo:JSON.parse(localStorage.getItem('shopInfo')),
        Authorization: localStorage.getItem("Authorization"),
    };
  },
  methods:{
     async sending(){
         if(this.kuaidi=='' || this.kuaidi=='-'){
             return alert('请填写物流公司')
         }
         if(this.kuaidiNum==''){
             return alert('请填写物流单号')
         }
         this.shopInfo.kuaidi=this.kuaidi;
         this.shopInfo.kuaidiNum=this.kuaidiNum
         this.shopInfo.sendtime=new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
         const result=await sendshop(this.shopInfo,this.Authorization)
         if(result.status==0){
           alert('发货成功！')
           this.$router.push({name:'seller'})
         }
      }
  },
  created(){
      const key=JSON.parse(this.$route.params.sendShop)
      localStorage.setItem('shopInfo',JSON.stringify(key))
      console.log(this.shopInfo)
  },
  beforeDestroy(){
      localStorage.removeItem("shopInfo")
  }
};
</script>

<style>
.sendshop_module {
  width: 100%;
}
.write_ordernum {
  width: 600px;
  height: 400px;
  margin: 0px auto;
}
.write_ordernum {
  width: 400px;
  height: 250px;
  border: 1px solid gainsboro;
  color: black;
  background-color: rgb(255, 255, 255);
}
.write_ordernum > input {
  width: 380px;
  height: 40px;
  margin: 20px 0px;
}
.write_ordernum > button {
  width: 60px;
  height: 30px;
  border: none;
  background-color: skyblue;
  color: white;
  margin: 40px 180px;
}
</style>