<template>
  <div class="favorite_module">
      <div class="favorites">
          <p style="font-size:32px" v-show="shopInfo<1">暂时没有收藏过商品哦！</p>
        <div class="favorite" v-for="p in shopInfo" :key="p.favorite_id" v-show="shopInfo" >
             <i class="el-icon-delete-solid" @click="delFavorite(p)"></i>
            <router-link :to="{name:'details',params:{key:JSON.stringify(p)}}">
            <img :src="p.pic_url" width="200px" height="200px">
            </router-link>
            <div class="delete_favorite"></div>
            <p>{{p.info_name}}</p>
            <p class="favorite_price">￥{{p.info_price}}</p>
        </div>
      </div>
  </div>
</template>

<script>
import {myFavorite} from '@/api/index';
import {delFavorite} from '@/api/index'
export default {
    name:'Favorite',
    data() {
        return {
            shopInfo:[],
            Authorization:localStorage.getItem('Authorization'),
        }
    },
   async mounted(){
        const result=await myFavorite(this.Authorization)
        if(result.status==-1){
           return this.$router.push({path:'/login'})
        }
        this.shopInfo=result
        this.shopInfo.forEach((element)=>{
          return  element.pic_url=require(`@/assets/shop/${element.pic_url}`)
        })
    },
    methods:{
     async delFavorite(favoriteInfo){
         const result=await delFavorite(this.Authorization,favoriteInfo)
         if(result.status==0){
             alert('删除成功！')
             location.reload();
         }
      }
    }
}
</script>

<style>
.favorite_module{
    width: 100%;
}
.favorites{
    width: 1600px;
    margin: 0px auto;
    display: flex;
    flex-flow: row wrap;
    box-shadow:0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.favorite{
    width: 200px;
    height: 300px;
    margin: 0px 10px;
    border: 0.5px solid gainsboro;
    position: relative;
}
.favorite:hover{
    border: 1px solid brown;
}
.favorite_price{
    color: red;
    text-align: center;
    font-size: large;
}
.el-icon-delete-solid{
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 32px;
    color: rgb(66, 176, 250);
    background-color: rgb(196, 196, 196);
}
.el-icon-delete-solid:hover{
    color: chocolate;
    cursor: pointer;
}

</style>