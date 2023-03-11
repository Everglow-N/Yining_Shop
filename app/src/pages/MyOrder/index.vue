<template>
  <div class="myorder_module">
    <div class="myorder">
    <el-tabs activate-name="second">
        <!-- 展示所有商品 -->
    <el-tab-pane label="所有商品" name="second">
        <p v-show="orderInfo.length<1">您还没有订单哦~~</p>
         <table class="myorder_header" v-show="orderInfo.length>0">
            <tr>
            <td>下单时间</td>
            <td>商品</td>
            <td>单价</td>
            <td>数量</td>
            <td>实付款</td>
            <td>交易状态</td>
            <td>交易操作</td>
            </tr>
         </table>
         <div class="myorder_content" v-for="p in orderInfo" :key="p.order_id">
             <div style="width:200px;">
                 {{p.order_time}}
             </div>
             <div style="width:610px;">
                 <img style="float:left" :src="p.pic_url" width="100px" height="100px" alt="">
                 <span style="float:left">{{p.info_name}}</span>
             </div>
             <div style="width:100px">
                 ￥{{p.info_price}}
             </div>
             <div style="width:80px;text-align:center">
                 {{p.order_shop_num}}
             </div>
             <div style="width:160px;text-align:center">
                 {{p.order_price}}
             </div>
             <div style="width:120px;">
                 <span v-show="p.order_status==0">已取消</span>
                 <span v-show="p.order_status==1">已完成</span>
                 <span v-show="p.order_status==2">待处理</span>
                 <span v-show="p.order_status==3">已发货</span>
                 <span v-show="p.order_status==4">已评论</span>
             </div>
             <div style="width:100px;text-align:center">
                <span v-show="p.order_status==0">无</span>
                <span v-show="p.order_status==4">无</span>
                <button @click="comment(p)" style="width:60px;height:30px;background-color: dodgerblue;color:white;border:none" v-show="p.order_status==1">评论</button>
                <button @click="cancer(p)" style="width:60px;height:30px;background-color: chocolate;color:white;border:none;margin:10px 0px" v-show="p.order_status==3 ||p.order_status==2">取消订单</button>
                <button @click="sure(p)" style="width:60px;height:30px;background-color: dodgerblue;color:white;border:none" v-show="p.order_status==2 || p.order_status==3">确认收货</button>
             </div>
         </div>
    </el-tab-pane>
    <!-- 待发货 -->
    <el-tab-pane label="待发货" name="first">
        <p v-show="orderPending.length<1">空空如也~~~</p>
        <table class="myorder_header" v-show="orderPending.length>0">
            <tr>
            <td>下单时间</td>
            <td>商品</td>
            <td>单价</td>
            <td>数量</td>
            <td>实付款</td>
            <td>交易状态</td>
            <td>交易操作</td>
            </tr>
        </table>
        <div class="myorder_content" v-for="p in orderPending" :key="p.order_id">
             <div style="width:200px;">
                 {{p.order_time}}
             </div>
             <div style="width:610px;">
                 <img style="float:left" :src="p.pic_url" width="100px" height="100px" alt="">
                 <span style="float:left">{{p.info_name}}</span>
             </div>
             <div style="width:100px">
                 ￥{{p.info_price}}
             </div>
             <div style="width:80px;text-align:center">
                 {{p.order_shop_num}}
             </div>
             <div style="width:160px;text-align:center">
                 {{p.order_price}}
             </div>
             <div style="width:120px;">
                 <span v-show="p.order_status==0">已取消</span>
                 <span v-show="p.order_status==1">已完成</span>
                 <span v-show="p.order_status==2">待处理</span>
                 <span v-show="p.order_status==3">已发货</span>
                 <span v-show="p.order_status==4">已评论</span>
             </div>
             <div style="width:100px;text-align:center">
                <span v-show="p.order_status==0">无</span>
                <span v-show="p.order_status==4">无</span>
                <button @click="comment(p)" style="width:60px;height:30px;background-color: dodgerblue;color:white;border:none" v-show="p.order_status==1">评论</button>
                <button @click="cancer(p)" style="width:60px;height:30px;background-color: chocolate;color:white;border:none;margin:10px 0px" v-show="p.order_status==3 ||p.order_status==2">取消订单</button>
                <button @click="sure(p)" style="width:60px;height:30px;background-color: dodgerblue;color:white;border:none" v-show="p.order_status==2 || p.order_status==3">确认收货</button>
             </div>
         </div>
    </el-tab-pane>
    <!-- 待评价 -->
    <el-tab-pane label="待评价" name="third">
       <p v-show="orderFinish.length<1">空空如也~~~</p>
        <table class="myorder_header" v-show="orderFinish.length>0">
            <tr>
            <td>下单时间</td>
            <td>商品</td>
            <td>单价</td>
            <td>数量</td>
            <td>实付款</td>
            <td>交易状态</td>
            <td>交易操作</td>
            </tr>
        </table>
        <div class="myorder_content" v-for="p in orderFinish" :key="p.order_id">
             <div style="width:200px;">
                 {{p.order_time}}
             </div>
             <div style="width:610px;">
                 <img style="float:left" :src="p.pic_url" width="100px" height="100px" alt="">
                 <span style="float:left">{{p.info_name}}</span>
             </div>
             <div style="width:100px">
                 ￥{{p.info_price}}
             </div>
             <div style="width:80px;text-align:center">
                 {{p.order_shop_num}}
             </div>
             <div style="width:160px;text-align:center">
                 {{p.order_price}}
             </div>
             <div style="width:120px;">
                 <span v-show="p.order_status==0">已取消</span>
                 <span v-show="p.order_status==1">已完成</span>
                 <span v-show="p.order_status==2">待处理</span>
                 <span v-show="p.order_status==3">已发货</span>
                 <span v-show="p.order_status==4">已评论</span>
             </div>
             <div style="width:100px;text-align:center">
                <span v-show="p.order_status==0">无</span>
                <span v-show="p.order_status==4">无</span>
                <button @click="comment(p)" style="width:60px;height:30px;background-color: dodgerblue;color:white;border:none" v-show="p.order_status==1">评论</button>
                <button @click="cancer(p)" style="width:60px;height:30px;background-color: chocolate;color:white;border:none;margin:10px 0px" v-show="p.order_status==3 ||p.order_status==2">取消订单</button>
                <button @click="sure(p)" style="width:60px;height:30px;background-color: dodgerblue;color:white;border:none" v-show="p.order_status==2 || p.order_status==3">确认收货</button>
             </div>
         </div>
    </el-tab-pane>
    <!-- 已经发货 -->
    <el-tab-pane label="已发货" name="fourth">
        <p v-show="orderSending.length<1">空空如也~~~</p>
        <table class="myorder_header" v-show="orderSending.length>0">
            <tr>
            <td>下单时间</td>
            <td>商品</td>
            <td>单价</td>
            <td>数量</td>
            <td>实付款</td>
            <td>交易状态</td>
            <td>交易操作</td>
            </tr>
        </table>
        <div class="myorder_content" v-for="p in orderSending" :key="p.order_id">
             <div style="width:200px;">
                 {{p.order_time}}
             </div>
             <div style="width:610px;">
                 <img style="float:left" :src="p.pic_url" width="100px" height="100px" alt="">
                 <span style="float:left">{{p.info_name}}</span>
             </div>
             <div style="width:100px">
                 ￥{{p.info_price}}
             </div>
             <div style="width:80px;text-align:center">
                 {{p.order_shop_num}}
             </div>
             <div style="width:160px;text-align:center">
                 {{p.order_price}}
             </div>
             <div style="width:120px;">
                 <span v-show="p.order_status==0">已取消</span>
                 <span v-show="p.order_status==1">已完成</span>
                 <span v-show="p.order_status==2">待处理</span>
                 <span v-show="p.order_status==3">已发货</span>
                 <span v-show="p.order_status==4">已评论</span>
             </div>
             <div style="width:100px;text-align:center">
                <span v-show="p.order_status==0">无</span>
                <span v-show="p.order_status==4">无</span>
                <button @click="comment(p)" style="width:60px;height:30px;background-color: dodgerblue;color:white;border:none" v-show="p.order_status==1">评论</button>
                <button @click="cancer(p)" style="width:60px;height:30px;background-color: chocolate;color:white;border:none;margin:10px 0px" v-show="p.order_status==3 ||p.order_status==2">取消订单</button>
                <button @click="sure(p)" style="width:60px;height:30px;background-color: dodgerblue;color:white;border:none" v-show="p.order_status==2 || p.order_status==3">确认收货</button>
             </div>
         </div>
    </el-tab-pane>

       <el-tab-pane label="已取消" name="fifth">
        <p v-show="orderCancer.length<1">空空如也~~~</p>
        <table class="myorder_header" v-show="orderCancer.length>0">
            <tr>
            <td>下单时间</td>
            <td>商品</td>
            <td>单价</td>
            <td>数量</td>
            <td>实付款</td>
            <td>交易状态</td>
            <td>交易操作</td>
            </tr>
        </table>
        <div class="myorder_content" v-for="p in orderCancer" :key="p.order_id">
             <div style="width:200px;">
                 {{p.order_time}}
             </div>
             <div style="width:610px;">
                 <img style="float:left" :src="p.pic_url" width="100px" height="100px" alt="">
                 <span style="float:left">{{p.info_name}}</span>
             </div>
             <div style="width:100px">
                 ￥{{p.info_price}}
             </div>
             <div style="width:80px;text-align:center">
                 {{p.order_shop_num}}
             </div>
             <div style="width:160px;text-align:center">
                 {{p.order_price}}
             </div>
             <div style="width:120px;">
                 <span v-show="p.order_status==0">已取消</span>
                 <span v-show="p.order_status==1">已完成</span>
                 <span v-show="p.order_status==2">待处理</span>
                 <span v-show="p.order_status==3">已发货</span>
                 <span v-show="p.order_status==4">已评论</span>
             </div>
             <div style="width:100px;text-align:center">
                <span v-show="p.order_status==0">无</span>
                <span v-show="p.order_status==4">无</span>
                <button @click="comment(p)" style="width:60px;height:30px;background-color: dodgerblue;color:white;border:none" v-show="p.order_status==1">评论</button>
                <button style="width:60px;height:30px;background-color: chocolate;color:white;border:none;margin:10px 0px" v-show="p.order_status==3 ||p.order_status==2">取消订单</button>
                <button @click="sure(p)" style="width:60px;height:30px;background-color: dodgerblue;color:white;border:none" v-show="p.order_status==2 || p.order_status==3">确认收货</button>
             </div>
         </div>
    </el-tab-pane>

  </el-tabs>

  
  </div>
  </div>
</template>

<script>
import {mypendingorder} from '@/api/index';
import {deleteorder} from '@/api/index';
import {sureorder} from '@/api/index'
export default {
    name:'MyOrder',
    data() {
        return {
            Authorization:localStorage.getItem('Authorization'),
            orderInfo:[],
            orderPending:[],
            orderFinish:[],
            orderSending:[],
            orderCancer:[],
        }
    },
    methods:{
       async cancer(Info){
           if(confirm('确定取消订单吗？')){
           const result=await deleteorder(Info,this.Authorization)
           if(result.status==0){
               alert('删除成功')
               location.reload();
           }
        }
       },
       async comment(Info){
          this.$router.push({name:'comment',params:{Info:JSON.stringify(Info)}})
       },
       async sure(Info){
           if(confirm('确认收货吗？点击确定前请确定是否收到货')){
               const result=await sureorder(Info,this.Authorization)
               console.log(result)
               if(result.status==0){
                   alert('确认收货成功')
                   location.reload();
               }
           }
       }
    },
    async created(){
        const result=await mypendingorder(this.Authorization)
        if(result.status==-1){
            this.$router.push({path:'/login'})
        }
        result.forEach(element => {
             element.pic_url=require(`@/assets/shop/${element.pic_url}`)
        });
        this.orderInfo=result;
        this.orderPending=result.filter((x)=>{
          return  x.order_status==2
        })
        this.orderFinish=result.filter((x)=>{
            return x.order_status==1
        })
        this.orderSending=result.filter((x)=>{
            return x.order_status==3
        })
        this.orderCancer=result.filter((x)=>{
            return x.order_status==0
        })

    }
}
</script>

<style>
.myorder_module{
    width: 100%;
}
.myorder{
    width: 1400px;
    margin: 0px auto;
}
.myorder_header{
    width: 1400px;
    height: 40px;
    border: none;
}
.myorder_content{
    background-color: ghostwhite;
    height: 100px;
    display: flex;
    flex-flow: wrap row;
}
.myorder_content{
    padding: 0px;
    margin: 20px 0px;
}

.myorder_header>tr>td:first-child{
    width: 200px;
    border: none;
}
.myorder_header>tr>td:nth-child(2){
    width: 500px;border: none;
}
.myorder_header>tr>td:nth-child(3){
    width: 100px;border: none;
}
.myorder_header>tr>td:nth-child(4){
    width: 100px;border: none;
}
.myorder_header>tr>td:nth-child(5){
    width: 100px;border: none;
}
.myorder_header>tr>td:nth-child(6){
    width: 100px;border: none;
}
.myorder_header>tr>td:nth-child(7){
    width: 100px;border: none;
}
.myorder_do>button{
    width: 60px;
    height: 30px;
    background-color: cornflowerblue;
    border: none;
    color: aliceblue;
    margin: 10px 0px;
}
</style>