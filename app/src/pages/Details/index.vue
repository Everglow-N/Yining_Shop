<template>
  <div class="details_moudle">
      <!-- <div class="ToHome">
          <router-link to='/home'>
            <img src="./images/购物logo.png" alt="logo" width="300px" height="180px">
            </router-link>
      </div> -->
      <div class="details_show">
             <el-alert v-show="addok"
    title="已成功加入购物车！！"
    type="success"
    center
    show-icon>
  </el-alert>
        <div class="shopPic">
            <img :src="shop.pic_url" width="400px" height="400px">
            <h3 @click="favorite" style="margin-top:10px;cursor: pointer;"><i class="el-icon-star-off">收藏商品</i></h3>
        </div>
        <div class="shopInfo">
            <p class="shopTitle">{{shop.info_name}}</p>
            <div class="shop_price">
                <h3>价格</h3>
                <h3 class="prices">￥{{shop.info_price}}</h3>
                <div class="sum_buy">
                    <div>
                         <h4>累计评论</h4>
                         <h3>{{comment.length}}</h3>
                    </div>
                    <div>
                        <h4>累计交易</h4>
                        <h3>{{shop.info_sell}}</h3>
                    </div>                
                </div> 
            </div>

            <div class="addressTo">
            <h4 style="margin-right:10px ">配送</h4>
            <h4>宁夏回族自治区 银川市</h4>
            <h4 style="margin:0px 5px">至</h4>
            <h4> 宁夏回族自治区 吴忠市</h4>
            </div>

            <div class="shop_num">
                <h3 style="margin-right:20px">数量</h3>
                <button @click="reduce" class="do_num"><i class="el-icon-minus"></i></button>
                <input class="print_shop_num" type="text" v-model="shop_num">
                <button @click="plus" class="do_num"><i class="el-icon-plus"></i></button>
                <h3 style="margin-left:10px">库存（{{shop.shop_stock}}）件</h3>
            </div>

            <div class="shop_buy">
                 <button class="shop_buy_now" @click="buyNow(shop,shop_num)">立即购买</button>
                 <button class="shop_buy_wait" @click="addshopcarts(shop,Authorization)">加入购物车</button>
            </div>
            <div class="shop_promise">
                <h4 style="margin-right:20px">承诺</h4>
                <h4>七天无理由退货</h4>
            </div>
        </div>
      </div>
    <div class="shop_content">
        <el-tabs type="border-card">
  <el-tab-pane label="商品详情">
      
  </el-tab-pane>
  <el-tab-pane label="商品评论">
      <div class="comment_module">
          <div v-show="noComment">这件商品还没有人评论过哦</div>
          <div class="comment" v-for="p in comment" :key="p.comment_id">
              <div class="comment_left">
                  <div class="comment_left_content">
                  <p>{{p.username}}</p>
                         
                         <el-rate
                         class="star_comment"
                            v-model="p.comment_title"
                            disabled
                            >
                         </el-rate>
                        
                    <p>{{p.comment_time}}</p>
                    </div>
              </div>
              <div class="comment_right">
                    <p>{{p.comment_content}}</p>
                    <div class="order_info">
                    <p>商品名称： {{p.info_name}} &ensp;&ensp; 商品价格：￥{{p.info_price}}</p>
                    <p>数量：{{p.order_shop_num}} &ensp;&ensp; 物流：{{p.order_company}}</p>
                </div>
              </div>
          </div>
      </div>
  </el-tab-pane>
</el-tabs>
    </div>
  </div>
</template>

<script>
import {shopComment} from '@/api/index'
import {tofavorite} from '@/api/index'
import {addshopcart} from '@/api/index'
import {showuserinfo} from '@/api/index'
export default {
    name:'Details',
    data() {
        return {
            shop_num:1,
            shop:JSON.parse(localStorage.getItem('shopInfo')),
            noComment:false,
            comment:[],
            Authorization:localStorage.getItem('Authorization'),
            realPrice:null,
            addok:false,
            userid:null
        }
    },
    beforeCreate(){
        //将路由传递过来的参数转为json字符串，然后到这里解析。然后给浏览器。
        const key=JSON.parse(this.$route.params.key)
        localStorage.setItem('shopInfo',JSON.stringify(key));
    },
   async mounted(){
    const user=await showuserinfo(this.Authorization)
    this.userid=user.userid
     const result=await shopComment(this.shop.info_id)
     this.comment=result
     if(this.comment==0){
         this.noComment=true
     }
     this.realPrice=this.shop.info_price
    },
    beforeDestroy(){
        localStorage.removeItem('shopInfo')
        localStorage.removeItem('comment')
    },
    methods:{
        reduce(){
            this.shop_num--;
            this.realPrice=(Number(this.realPrice)-Number(this.shop.info_price));
            if(this.shop_num<1){
                 alert('数量不可以小于0')
                 this.shop_num=1;
                 this.realPrice=this.shop.info_price
            }
        },
        plus(){
            this.shop_num++;
            this.realPrice=(Number(this.realPrice)+Number(this.shop.info_price));
            if(this.shop_num>this.shop.shop_stock){
                alert('数量不可以大于库存数')
                this.shop_num=this.shop.shop_stock;
                this.realPrice=this.shop.shop_stock*this.shop.info_price
            }
            
        },
        async favorite(){
            if(this.userid==this.shop.userid) return alert('不能收藏自己的商品')
            const result=await tofavorite(this.Authorization,this.shop)
            console.log(result.status)
            if(result.status==0){
                alert('添加成功！')
            }
            if(result.status==-1) alert('已经添加过该商品了！')            

        },
        buyNow(shop,shop_num){
            if(this.userid==this.shop.userid) return alert('不能购买自己的商品')
            this.$router.push({name:'suborder',params:{shop:JSON.stringify(shop),num:shop_num,price:this.realPrice}})
        },
       async addshopcarts(shop,Authorization){
            shop.shop_num=this.shop_num
            const result=await addshopcart(shop,Authorization)
            if(result.status==-1){
                return this.$router.push({path:'/login'})
            }
            if(result.status==0){
                this.addok=true
                setTimeout(() => {
                    this.addok=false
                }, 2000);
            }
        }
    }
}
</script>

<style>
.details_moudle{
    width: 100%;
    margin-top: 80px;
}
.details_show{
    width: 1300px;
    height: 500px;
    margin: 0px auto;
    border: 1px solid rgb(204, 203, 203);
}
.shopPic{
    width: 400px;
    height: 400px;
    background-color: aliceblue;
    float: left;
    display: flex;
    flex-flow: nowrap column;
    justify-items: center;
    align-items: center;
    margin-right: 100px;
}
.shopInfo{
    width: 700px;
    height: 500px;
    float: left;
}
.shop_price{
    width: 700px;
    height: 60px;
    background-color: rgb(151, 206, 252);
    display: flex;
    flex-flow: nowrap row;
    align-items: center;
    margin-top: 20px;
    color: rgb(56, 52, 52);
}
.prices{
    margin-left: 30px;
    color: brown;
    font-size: 34px;
}
.shopTitle{
    font-size: 20px;
}
.sum_buy{
    margin-left: 200px;
    width: 300px;
    height: 60px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
}
.sum_buy>div{
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
}
.addressTo{
    width: 700px;
    height: 60px;
    display: flex;
    flex-flow: nowrap row;
    border-bottom: 1px solid silver;
    align-items: center;
}
.shop_num{
    width: 350px;
    height: 60px;
    margin-top: 20px;
    display: flex;
    flex-flow: nowrap row;
    align-items: center;
}
.do_num{
    width: 40px;
    height: 40px;
}
.print_shop_num{
    width: 60px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 20px;
}
.shop_buy{
    display: flex;
    flex-flow: nowrap row;
    margin-top: 50px;
    margin-left: 30px;
}
.shop_buy_now{
    width: 200px;
    height: 60px;
    background-color: rgb(29, 159, 202);
    color: white;
    margin-right: 50px;
    font-size: large;
    border: none;
    cursor: pointer;
}
.shop_buy_wait{
    border: none;
    width: 200px;
    height: 60px;
    background-color: rgb(247, 180, 37);
    font-size: large;
    color: white;
    cursor: pointer;
}
.shop_promise{
    margin-top: 30px;
    width: 400px;
    height: 100px;
    display: flex;
    flex-flow: wrap, row;
}
.shop_content{
    width: 1300px;
    margin: 20px auto;
}
.comment_module{
    width: 1300px;
    display: flex;
    flex-flow: column nowrap;
}
.comment{
    width: 1300px;
    height: 200px;
    display: flex;
    flex-flow: row nowrap;
    border-bottom: 1px solid gainsboro;
}
.comment_left{
    width: 400px;
    height: 200px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
}
.comment_left_content{
    width: 400px;
    height: 170px;
    display: flex;
    flex-flow: nowrap column;
    justify-content:space-around;
    align-items: center;
    border-right: 1px solid rgb(238, 233, 233);
}
.star_comment{
    letter-spacing: -900px;
}
.comment_right{
    width: 900px;
    height: 200px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
}

.order_info{
    font-size: smaller;
    color: rgb(202, 200, 200);
}

/* .ToHome{
    width: 300px;
    height: 180px;
    margin: 0px 380px;
    position: relative;
    top: 0px;
} */
</style>