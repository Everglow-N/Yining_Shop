<template>
  <div class="seller_module">
    <div class="seller">
      <el-tabs>
         <!--  待处理的订单 -->
        <el-tab-pane label="待处理的订单" name="first">
          <p style="font-size: large" v-show="pendingorder.length < 1">
            还没有待处理的订单~~~
          </p>
          <div class="order_todo" v-show="pendingorder.length > 0">
            <div class="buyer_order_headers">
              <span style="width: 600px; height: 60px">商品信息</span>
              <span style="width: 100px">价格</span>
              <span style="width: 100px">数量</span>
              <span style="width: 100px">总价</span>
              <span style="width: 400px">地址</span>
              <span style="width: 100px">操作</span>
            </div>

            <div
              class="buyer_order_contents"
              v-for="p in pendingorder"
              :key="p.order_id"
            >
              <div class="buyer_order_info">
                <img :src="p.pic_url" width="150px" height="150px" />
                <span>{{ p.info_name }}</span>
              </div>
              <div class="buyer_order_price">￥{{ p.info_price }}</div>
              <div class="buyer_order_num">
                {{ p.order_shop_num }}
              </div>
              <div class="buyer_order_realPrice">￥{{ p.order_price }}</div>
              <div class="buyer_order_address">
                {{ p.province }}-{{ p.city }}-{{ p.area }}-{{ p.address }}
                <br /><br />
                {{ p.username }} {{ p.phone_number }} {{ p.zip }}
              </div>
              <div class="buyer_order_do">
                <button @click="issendShop(p)">发货</button>
                <button @click="cancer(p)">取消订单</button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- 取消的订单 -->
        <el-tab-pane label="已取消的订单" name="second">
            <p style="font-size: large" v-show="cancerorder.length < 1">
            还没有订单~~~
          </p>
          <div class="order_todo" v-show="cancerorder.length > 0">
            <div class="buyer_order_headers">
              <span style="width: 600px; height: 60px">商品信息</span>
              <span style="width: 100px">价格</span>
              <span style="width: 100px">数量</span>
              <span style="width: 100px">总价</span>
              <span style="width: 400px">地址</span>
              <span style="width: 100px">订单时间</span>
            </div>

            <div
              class="buyer_order_contents"
              v-for="p in cancerorder"
              :key="p.order_id"
            >
             
              <div class="buyer_order_info">
                <img :src="p.pic_url" width="150px" height="150px" />
                <span>{{ p.info_name }}</span>
              </div>
              <div class="buyer_order_price">￥{{ p.info_price }}</div>
              <div class="buyer_order_num">
                {{ p.order_shop_num }}
              </div>
              <div class="buyer_order_realPrice">￥{{ p.order_price }}</div>
              <div class="buyer_order_address">
                {{ p.province }}-{{ p.city }}-{{ p.area }}-{{ p.address }}
                <br /><br />
                {{ p.username }} {{ p.phone_number }} {{ p.zip }}
              </div>
              <div class="buyer_order_do">
                <span>{{p.order_time}}</span>
              </div>
            </div>
          </div>

        </el-tab-pane>
        
        <!-- 已发货的订单 -->
        <el-tab-pane label="已发货订单" name="third">
            <p style="font-size: large" v-show="sendingorder.length < 1">
            还没有订单~~~
          </p>
          <div class="order_todo" v-show="sendingorder.length > 0">
            <div class="buyer_order_headers">
              <span style="width: 600px; height: 60px">商品信息</span>
              <span style="width: 100px">价格</span>
              <span style="width: 100px">数量</span>
              <span style="width: 100px">总价</span>
              <span style="width: 400px">地址</span>
              <span style="width: 100px">操作</span>
            </div>

            <div
              class="buyer_order_contents"
              v-for="p in sendingorder"
              :key="p.order_id"
            >
             
              <div class="buyer_order_info">
                <img :src="p.pic_url" width="150px" height="150px" />
                <span>{{ p.info_name }}</span>
              </div>
              <div class="buyer_order_price">￥{{ p.info_price }}</div>
              <div class="buyer_order_num">
                {{ p.order_shop_num }}
              </div>
              <div class="buyer_order_realPrice">￥{{ p.order_price }}</div>
              <div class="buyer_order_address">
                {{ p.province }}-{{ p.city }}-{{ p.area }}-{{ p.address }}
                <br /><br />
                {{ p.username }} {{ p.phone_number }} {{ p.zip }}
              </div>
              <div class="buyer_order_do">
                <button @click="cancer(p)">取消订单</button>
              </div>
            </div>
          </div>
        </el-tab-pane>
       <!--  已完成的订单 -->
        <el-tab-pane label="已完成订单" name="fourth">
          <div class="order_todo" v-show="finishiorder.length > 0">
            <div class="buyer_order_headers">
              <span style="width: 600px; height: 60px">商品信息</span>
              <span style="width: 100px">价格</span>
              <span style="width: 100px">数量</span>
              <span style="width: 100px">总价</span>
              <span style="width: 400px">地址</span>
              <span style="width: 100px">操作</span>
            </div>

            <div
              class="buyer_order_contents"
              v-for="p in finishiorder"
              :key="p.order_id"
            >
             
              <div class="buyer_order_info">
                <img :src="p.pic_url" width="150px" height="150px" />
                <span>{{ p.info_name }}</span>
              </div>
              <div class="buyer_order_price">￥{{ p.info_price }}</div>
              <div class="buyer_order_num">
                {{ p.order_shop_num }}
              </div>
              <div class="buyer_order_realPrice">￥{{ p.order_price }}</div>
              <div class="buyer_order_address">
                {{ p.province }}-{{ p.city }}-{{ p.area }}-{{ p.address }}
                <br /><br />
                {{ p.username }} {{ p.phone_number }} {{ p.zip }}
              </div>
              <div class="buyer_order_do">
                <span>无</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { pendingorder } from "@/api/index";
import {deleteorder} from '@/api/index'
export default {
  name: "Seller",
  data() {
    return {
      Authorization: localStorage.getItem("Authorization"),
      pendingorder: [],
      cancerorder:[],
      sendingorder:[],
      finishiorder:[],
    };
  },
  methods:{
      issendShop(shopInfo){
            this.$router.push({name:'sendshop',params:{sendShop:JSON.stringify(shopInfo)}})
      },
     async cancer(shopInfo){
         if(confirm('确认取消订单吗？')){
         const result = await deleteorder(shopInfo,this.Authorization)
         if(result.status==0){
             alert('取消成功！')
             location.reload();
         }
      }
     }
  },
  async created() {
    const result = await pendingorder(this.Authorization);
    result.forEach((element) => {
      element.pic_url = require(`@/assets/shop/${element.pic_url}`);
    });
    if (result.status == -1) {
      this.$router.push({ path: "/login" });
    }
    this.pendingorder = result.filter((x)=>{
        return x.order_status==2
    });
    this.cancerorder=result.filter((x)=>{
        return x.order_status==0
    });
    this.sendingorder=result.filter((x)=>{
        return x.order_status==3
    });
    this.finishiorder=result.filter((x)=>{
        return x.order_status==1
    })
  },
};
</script>

<style>
.seller_module {
  width: 100%;
}
.seller {
  width: 1400px;
  margin: 0px auto;
}
.order_todo {
  width: 1400px;
  display: flex;
  flex-flow: column nowrap;
}
.buyer_order_headers {
  width: 1400px;
  height: 60px;
  display: flex;
  flex-flow: nowrap row;
  line-height: 60px;
  font-size: large;
  color: black;
}
.buyer_order_headers > span {
  margin: 0px 0px;
  padding: 0px;
}
.buyer_order_contents {
  display: flex;
  flex-flow: nowrap row;
  width: 1400px;
  height: 150px;
  color: black;
  background-color: rgb(238, 238, 238);
  margin: 10px 0px;
}
.buyer_order_contents > div {
  margin: 0px;
  padding: 0px;
}
.buyer_order_info {
  width: 600px;
  height: 150px;
  display: flex;
  flex-flow: wrap row;
}
.buyer_order_price {
  width: 100px;
  height: 150px;
}
.buyer_order_num {
  width: 90px;
  height: 150px;
}
.buyer_order_realPrice {
  width: 100px;
  height: 150px;
}
.buyer_order_address {
  width: 400px;
  height: 150px;
}
.buyer_order_do {
  width: 100px;
  height: 150px;
  display: flex;
  flex-flow: nowrap column;
}
.buyer_order_do > button:first-child {
  width: 100px;
  height: 40px;
  background-color: cornflowerblue;
  border: none;
  margin: 20px 0px;
  color: whitesmoke;
}
.buyer_order_do > button:last-child {
  width: 100px;
  height: 40px;
  background-color: coral;
  border: none;
  color: whitesmoke;
}

</style>