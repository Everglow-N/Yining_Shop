<template>
  <div class="shopcart_module">
      <div class="shopcart">
          <div class="cart_title">
              <span>我的购物车</span>
              <span>全部({{cartInfo.length}})</span>
          </div>
          
          <div class="cart">
              <table>
                  <tr class="cart_table_title">
                      <td class="all_cho"><input @click="allChecked($event)" type="checkbox" ref="allCheck">全选</td>
                      <td class="shop_infos">商品信息</td>
                      <td class="shop_dj">单价</td>
                      <td class="cart_num">数量</td>
                      <td class="shop_je">金额</td>
                      <td class="shop_do">操作</td>
                  </tr>
              </table>
              <p style="font-size:32px;color:red" v-show="!cartInfo">您的购物车内空空如也~~~~</p>
                  <div class="cart_infos_content">
                      <div class="cart_info_content" v-for="p in cartInfo" :key="p.cart_id">
                            <div class="cart_shop_chose"><input @click="isChecked(p)" :checked="p.isChecked" type="checkbox" style="width:30px;height:30px"></div>

                            <div class="cart_shop_info" style="position: relative;">
                              <img :src="p.pic_url" width="120px" height="120px">
                              <span style="position:absolute;top:0px;font-size:small">{{p.info_name}}</span>
                            </div>

                            <div class="cart_shop_a_price">￥{{p.info_price}}</div>

                            <div class="cart_shop_num">
                                <button style="width:25px;height:25px;font-size:large" @click="reduce(p)">-</button>
                                <input type="text" style="width:40px;height:25px;text-align: center;" v-model="p.cart_shop_num">
                                <button style="width:25px;height:25px;font-size:large" @click="plus(p)">+</button>
                            </div>

                            <div class="cart_shop_price">
                                ￥{{p.cart_shop_price}}
                            </div>

                            <div class="cart_doing">
                                <p style="margin-bottom:5px; cursor: pointer;" @click="toFavorite(p)">移到收藏夹</p>
                                <p style=" cursor: pointer;" @click="toDelete(p)">删除</p>
                            </div>
                      </div>
                  </div>
          </div>
        <div class="cartfoot">
            <p style="text-align: right; line-height:60px;font-size:21px">已选商品
                <span style="color:red;font-size:22px">{{isChecking}}</span>件   
                合计<span style="color:red;font-size:28px">￥{{allPrice}}</span>
                <button class="BUYNOW" @click="Tobuy">结算</button>
                </p>
        </div>

      </div>
  </div>
</template>

<script>
import {showshopcart} from '@/api/index';
import {tofavorite} from '@/api/index';
import {deleteshopcart} from '@/api/index'
export default {
    name:'ShopCart',
    data() {
        return {
            cartInfo:[],
            Authorization:localStorage.getItem('Authorization'),
            isChecking:0,
            allPrice:0
        }
    },
    methods:{
        reduce(cartinfo){
            cartinfo.cart_shop_num--;
            if(cartinfo.isChecked){
                 this.allPrice-=Number(cartinfo.info_price)
            }
            cartinfo.cart_shop_price=Number(cartinfo.cart_shop_price)-Number(cartinfo.info_price);
            if(cartinfo.cart_shop_num<1){
                alert('数量不可以小于1')
                cartinfo.cart_shop_num=1;
                cartinfo.cart_shop_price=cartinfo.info_price;                
            }
            
        },
        plus(cartinfo){
            cartinfo.cart_shop_num++
            if(cartinfo.isChecked){
                this.allPrice+=Number(cartinfo.info_price)
            }
            cartinfo.cart_shop_price=Number(cartinfo.cart_shop_price)+Number(cartinfo.info_price);
             if(cartinfo.cart_shop_num>cartinfo.shop_stock){
                alert('数量不可以大于库存数')
                cartinfo.cart_shop_num=cartinfo.shop_stock;
                cartinfo.cart_shop_price=cartinfo.info_price*cartinfo.shop_stock
            }
        },
        isChecked(Info){
            Info.isChecked=!Info.isChecked
            if(!Info.isChecked){
                this.$refs.allCheck.checked=false
            }
            if(Info.isChecked){
                this.isChecking++;
                this.allPrice+=Number(Info.cart_shop_price)
            }
            if(!Info.isChecked){
                this.isChecking--;
                this.allPrice-=Number(Info.cart_shop_price)
            }
        },
        allChecked(event){
            if(event.target.checked){
                this.cartInfo.forEach(element => {
                    element.isChecked=true;
                    this.isChecking=this.cartInfo.length;
                    this.allPrice+=Number(element.cart_shop_price)
                }); 
            }
            if(!event.target.checked){
                this.cartInfo.forEach(element=>{
                    element.isChecked=false;
                    this.isChecking=0;
                    this.allPrice=0;
                })
            }   
        },
       async toFavorite(shopInfo){
           if(confirm('确定要将这个商品移动到收藏夹？')){
           const result=await tofavorite(this.Authorization,shopInfo)
           if(result.status==-1){
               alert('已经添加过了！')
           }
           if(result.status==0){
               alert('移动成功！！')
               location.reload();
           }
           }
        },
        async toDelete(shop){
            if(confirm('确定要删除？')){
            const result=await deleteshopcart(shop,this.Authorization)
            if(result.status==0){
                alert('删除成功！')
                location.reload();
            }
            
            }
            
        },
        Tobuy(){
            this.cartInfo.forEach(element => {
                if(element.isChecked){
                    this.$router.push({name:'suborder',params:{shop:JSON.stringify(element)}})
                }
            });
            
           
        }
    },
    async mounted(){
        const result=await showshopcart(this.Authorization)
        if(result.status==-1){
            this.$router.push({path:'/login'})
        }
        result.forEach(element => {
            element.pic_url=require(`@/assets/shop/${element.pic_url}`)
            element.isChecked=false
        });
        this.cartInfo=result
    }
}
</script>

<style>
.shopcart_module{
    width: 100%;
}
.shopcart{
    width: 1400px;
    border-radius: 10px;
    margin: 0px auto;
    border: 1px solid gainsboro;
}
.cart_title{
    width: 1400px;
    height: 60px;
    border-bottom: 2px solid gainsboro;
    line-height: 60px;
    font-size: 28px;
}
.all_cho{
    font-size: large;
}
.all_cho>input{
    width: 20px;
    height: 20px;
    margin: 5px 5px;
}
.cart>table{
    width: 1400px;
    border-right: none;
    border-left: none;
    border-top: none;
}
.cart>table>tr:first-child{
    height: 30px;
    border-right: none;
    border-left: none;
}
.cart>table>tr>td:first-child{
    width: 100px;
    border: none;
}
.cart>table>tr>td:nth-child(2){
    width: 500px;
    border: none;
}
.cart>table>tr>td:nth-child(3){
    width: 200px;
    border: none;
}
.cart>table>tr>td:nth-child(4){
    width: 200px;
    border: none;
}
.cart>table>tr>td:nth-child(5){
    width: 200px;
    border: none;
}
.cart>table>tr>td:nth-child(6){
    width: 200px;
    border: none;
}
.cart_infos_content{
    width: 1400px;
    display: flex;
    flex-flow: column nowrap;
}
.cart_info_content{
    width: 1400px;
    height: 150px;
    display: flex;
    flex-flow: nowrap row;
    background-color: rgb(238, 237, 237);
    margin: 10px 0px;
    border-radius: 5px;
}
.cart_shop_chose{
    width: 50px;
    height: 100px;

}
.cart_shop_info{
    width: 540px;
    height: 120px;
   
}
.cart_shop_a_price{
    width: 180px;
    height: 100px;
    font-size: large;
   
}
.cart_shop_num{
    width: 210px;
    height: 100px;
    
}
.cart_shop_price{
    width: 200px;
    height: 100px;
    font-size: 24px;
    color: red;
}
.cartfoot{
    width: 1400px;
    height: 70px;
    background-color: rgb(241, 241, 241);
    position: fixed;
    bottom: 0px;
    border-radius: 5px;
    border: 1px solid gainsboro;
}
.BUYNOW{
    width: 100px;
    height: 60px;
    background-color: cornflowerblue;
    color:white;
    border: none;
    border-radius: 10px;
    letter-spacing: 10px;
    font-size: large;
    text-align: center;
}

</style>