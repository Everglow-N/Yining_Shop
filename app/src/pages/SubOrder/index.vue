<template>
  <div class="subOrder_module">
    <div class="subOrder">
        <div class="step">     
        <el-steps :space="1200" :active="0" finish-status="success">
            <el-step title="提交订单"></el-step>
            <el-step title="付款"></el-step>
            <el-step title="确认收款"></el-step>
            <el-step title="评价"></el-step>  
        </el-steps>
        </div>
        <p style="font-size:large;margin-top:50px">请选择收货地址</p>
        <p v-show="address<1" style="font-size:32px;color:red;">您还没有设置过收货地址，请到个人中心添加</p>
        <div class="address_choice">
            <div class="address_box" @click="orderAddress(p)" v-for="p in address" :key="p.address_id">
                <i v-show="p.status==0" class="el-icon-success"></i>
                <p>{{p.province}}{{p.city}}({{p.username}})收</p>
                <hr>
                <p>{{p.area}}-{{p.address}}-{{p.phone_number}}-{{p.zip}}</p>
            </div>
        </div>
        
        <p style="font-size:large;margin-top:20px">确认收货信息</p>
    
        <div class="orderInfo">
            <table>
                <tr class="table_first_row">
                    <td>店铺宝贝</td>
                    <td>单价</td>
                    <td>数量</td>
                    <td>小计</td>
                </tr>
                <tr class="table_second_row">
                    <td>卖家：{{shopInfo.sellername}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="table_third_row">
                    <td>
                        <img :src="shopInfo.pic_url" alt="" width="120px" height="120px" style="float:left">
                        <p>{{shopInfo.info_name}}</p>
                    </td>

                    <td>{{shopInfo.info_price}}</td>
                    
                    <td>
                        <button @click="reduce" class="doNum"><i class="el-icon-minus"></i></button>
                        <input class="print_num" type="text" v-model="shop_num">
                        <button @click="plus" class="doNum"><i class="el-icon-plus"></i></button>
                    </td>

                    <td style="color:red;font-size:23px">￥{{realPrice}}</td>
                </tr>
            </table>
            <div class="make_sure_order_all">
            <div class="make_sure_order">
                <p>实付款：<span style="color:red;font-size:38px;">￥{{realPrice}}</span></p>
                <p>寄送至：{{addr.province}} {{addr.city}} {{addr.area}} {{addr.address}} {{addr.zip}}</p>
                <p>收货人：{{addr.username}} {{addr.phone_number}}</p>
            </div>
            <button class="subOrderbtn" @click="subOrder">提交订单</button>
            </div>
    
        </div>
  </div>
  </div>
</template>

<script>
import {showorderaddress} from '@/api/index';
import {buynow} from '@/api/index';
import {showuserinfo} from '@/api/index'
export default {
    name:'SubOrder',
    data() {
        return {
            Authorization:localStorage.getItem('Authorization'),
            shop_num:this.$route.params.num,
            shopInfo:JSON.parse(localStorage.getItem('shopInfo')),
            address:[],
            realPrice:null,
            addr:{},
            isAddr:false,
            borderStyle:null,
            userinfo:{}
        }
    },
    methods:{
     reduce(){
            this.shop_num--;
            this.realPrice=(Number(this.realPrice)-Number(this.shopInfo.info_price));
            if(this.shop_num<1){
                 alert('数量不可以小于0')
                 this.shop_num=1;
                 this.realPrice=this.shopInfo.info_price
            }
        },
        plus(){
            this.shop_num++;
            this.realPrice=(Number(this.realPrice)+Number(this.shopInfo.info_price));
            if(this.shop_num>this.shopInfo.shop_stock){
                alert('数量不可以大于库存数')
                this.shop_num=this.shopInfo.shop_stock;
                this.realPrice=this.shopInfo.shop_stock*this.shopInfo.info_price
            }
            
        },
        orderAddress(addressInfo){
                this.address.forEach(element => {
                    element.status=1;
                });
                addressInfo.status=0
                this.addr=addressInfo;

        },
        async subOrder(){
            this.shopInfo.realPrice=this.realPrice;
            this.shopInfo.shop_num=this.shop_num;
            this.shopInfo.ordertime=new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
            if(this.address.length<1) return alert('请选择收货地址！')
            this.userinfo=await showuserinfo(this.Authorization)
            if(this.userinfo.money<this.shopInfo.realPrice){
              return  alert('余额不足，请你到个人中心去充值')
            }
            else if(confirm(`确认购买？您的余额为${this.userinfo.money},购买后的余额为${this.userinfo.money-this.shopInfo.realPrice}`)){
            const result = await buynow(this.shopInfo,this.addr,this.Authorization);
            if(result.status==0){
                alert('购买成功！等待卖家处理')
            }
            }

        }
    },
    beforeCreate(){
        const key=JSON.parse(this.$route.params.shop)
        localStorage.setItem('shopInfo',JSON.stringify(key))
    },
   async mounted(){
        const result=await showorderaddress(this.Authorization)
        if(result.status==-1){
          return  this.$router.push({path:'/login'})
        }
        this.address=result
        this.realPrice=this.$route.params.price
        this.address.forEach(element => {
            if(element.status==0){
                this.addr=element
            }
        });
    },
    beforeDestroy(){
         localStorage.removeItem('shopInfo') 
    }
}
</script>

<style>
.subOrder_module{
    width: 100%;
}
.subOrder{
    width: 1400px;
    margin: 0px auto;
    position: relative;
}
.address_choice{
    margin-top: 10px;
    display: flex;
    flex-flow: wrap row;
    justify-content:left;
    margin-bottom: 20px;
}
.address_box{
    width: 300px;
    height: 150px;
    margin: 10px 10px;
    position: relative;
    border: 4px solid rgb(224, 225, 226);
}

.el-icon-success{
    position: absolute;
    bottom: 0px;
    right: 0px;
    color: brown;
    font-size: 32px;
}
.orderInfo{
    margin-top: 30px;
    width: 1400px;
    margin: 0px auto;
}
.orderInfo>table{
    width: 1400px;
    border-right: none;
    border-left: none;
    border-top: none;
}
.table_first_row>td{
    width: 350px;
    height: 60px;
    border: none;
    text-align: center;
    border-bottom: 2px solid skyblue;
}
.table_second_row{
    border-bottom: 1.2px skyblue dashed;
}
.table_second_row>td{
    width: 350px;
    height: 60px;
    border-left: none;
    border-right: none;
}
.table_third_row>td{
    width: 350px;
    height: 120px;
    border-right: none;
    border-left: none;
    text-align: center;
}
.table_third_row>td:first-child{
    float: left;
    margin-left: 10px;
    margin-top: 10px;
    text-align: left;
}
.doNum{
    width: 42px;
    height: 42px;
}
.print_num{
    width: 60px;
    height: 38px;
    text-align: center;
    font-size: large;
}
.step{
   position:relative;
   left: 200px;
}
.make_sure_order{
    width: 500px;
    height: 200px;
    border: 2px solid red;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: right;
    font-size: large;
    display: flex;
    flex-flow: row wrap;
    justify-content: right;
}
.make_sure_order_all{
    width: 500px;
    height: 300px;
    position: absolute;
    right: 0px;
}
.subOrderbtn{
    width: 150px;
    height: 60px;
    position: absolute;
    right: 0px;
    letter-spacing: 5px;
    background-color: brown;
    color: white;
    border: none;
    font-style: initial;
    font-size: large;
    text-align: center;
}

</style>