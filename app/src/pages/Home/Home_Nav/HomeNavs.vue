<template>
  <div class="Home">
      <div class="Header_second">
            <!-- //购物车的logo，跳转到主页面 -->
            <router-link to='/home'>
            <img src="./images/购物logo.png" alt="logo" width="300px" height="180px">
            </router-link>
            <div class="search">
              <input type="text" v-model="keyWords">
              <button @click="goSearch">搜索</button>
            </div>
          </div>
    <div class="Nav">
      <ul class="home_nav">
        <li class="navsmenue" @click="allShop">全部商品</li>
        <li class="navsmenue" @click="jiXiang">机箱</li>
        <li class="navsmenue" @click="xianKa">显卡</li>
        <li class="navsmenue" @click="jianShu">键鼠</li>
        <li class="navsmenue" @click="erJi">耳机</li>
        <li class="navsmenue" @click="sanReQi">散热器</li>
        <li class="navsmenue" @click="zhuBan">主板</li>
        <li class="navsmenue" @click="yinXiang">音响</li>
        <li class="navsmenue" @click="xianShiQi">显示器</li>
        <li class="navsmenue" @click="qiTa">其它</li>
      </ul>
    </div>

    <div class="showShops_all">
      <div class="order">
        <ul>
          <li @click="allDesc">综合</li>
          <li @click="gradeDesc">信用</li>
          <li>
            <el-dropdown>
              <span class="el-dropdown-link">
                <span class="price_title">价格排序</span
                ><i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><p @click="priceDesc">价格从高到低</p></el-dropdown-item>
                <el-dropdown-item><p @click="priceAsc">价格从低到高</p></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="price_range" @mouseover="Hovering" @mouseleave="Hovered">
            价格区间：￥<input type="text" v-model="firstPrice" /> - ￥<input
              type="text"
              v-model="lastPrice"
            />
            <button class="price_range_sure" v-show="sures" @click="sure">
              确定
            </button>
          </li>
        </ul>
      </div>
      <div class="showShops">
        <div class="showShop" v-for="p in shop" :key="p.info_id">
          <router-link :to="{name:'details',params:{key:JSON.stringify(p)}}">
          <img :src="p.pic_url" width="250px" height="270px" alt="图片" />
          </router-link>
          <p class="price">￥{{ p.info_price }}</p>
          <p>{{ p.info_name }}</p>
          <p class="seller">
            <i class="el-icon-user-solid"></i>{{ p.sellername }}
          </p>
          <p class="place">{{ p.place }}</p>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import axios from "axios";
import {showShop} from '@/api/index';
import {shopSearch} from '@/api/index'
import {shopCategory} from '@/api/index'
export default {
  name: "HomeNav",
  data() {
    return {
      keyWords:'',
      shop:[],
      sures: false,
      firstPrice: "",
      lastPrice: "",
      category:{
        erji:1,
        jianshu:2,
        jixiang:3,
        qita:4,
        sanreqi:5,
        xianka:6,
        xianshiqi:7,
        yinxiang:8,
        zhuban:9,
      }
    };
  },
  //挂载完毕
 async mounted() {
    const result= await showShop()
    this.shop=result;
     this.shop.forEach((element) => {
          element.pic_url = require(`@/assets/shop/${element.pic_url}`);
        });
      
    /* axios.get("http://127.0.0.1:8001/shop/show").then(
      (result) => {
        this.shop = result.data;
        this.shop.forEach((element) => {
          element.pic_url = require(`./img/${element.pic_url}`);
        });
      },
      (err) => {
        console.log(err);
      }
    ); */
  }, 
  methods: {
    //搜索关键词
  async goSearch(){
    const result = await shopSearch(this.keyWords)
     this.shop=result;
     this.shop.forEach((element) => {
          element.pic_url = require(`@/assets/shop/${element.pic_url}`);
        });
     /*  axios.post('http://127.0.0.1:8001/shop/search',{
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {infoName:this.keyWords},
    }).then((result) => {
        this.shop = result.data;     
        this.shop.forEach((element) => {
          element.pic_url = require(`./img/${element.pic_url}`);
        });
      },
      (err) => {
        console.log(err);
      }); */
    },
    //价格区间确定键的显示
    Hovering() {
      this.sures = true;
    },
    //价格区间确定键的隐藏
    Hovered() {
      this.sures = false;
    },
    //点击确定键发送axios请求
    sure() {
      if(!this.firstPrice||!this.lastPrice) return alert('请输入价格区间')
       axios
        .post("http://127.0.0.1:8001/shop/order", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          data: { firstPrice: this.firstPrice, lastPrice: this.lastPrice },
        })
        .then(
          (result) => {
              this.shop=result.data;
        this.shop.forEach((element) => {
          element.pic_url = require(`@/assets/shop/${element.pic_url}`);
        });
          },
          (err) => {
              console.log(err)
          }
        );
    },
    //价格升序
    priceAsc(){
      this.shop.sort((x,y)=>{
        return x.info_price-y.info_price
      })
    },
    //价格降序
    priceDesc(){
     this.shop.sort((x,y)=>{
       return y.info_price-x.info_price
       
     })
    },
    //信用等级降序
    gradeDesc(){
      this.shop.sort((x,y)=>{
        return y.grade-x.grade
      })
    },
    //综合降序
    allDesc(){
      this.shop.sort((x,y)=>{
        const grade = y.grade-x.grade;
        const price = x.info_price-y.info_price;
        return grade,price
      })
    },
    //所有商品
    async allShop(){
     const result=await showShop()
     this.shop=result;
      this.shop.forEach((element) => {
          element.pic_url = require(`@/assets/shop/${element.pic_url}`);
        });
     /*  axios.get("http://127.0.0.1:8001/shop/show").then(
      (result) => {
        this.shop = result.data;

        this.shop.forEach((element) => {
          element.pic_url = require(`./img/${element.pic_url}`);
        });
      },
      (err) => {
        console.log(err);
      }
    ); */
    },
    //机箱分类
   async jiXiang(){
     const result = await shopCategory(this.category.jixiang);
      this.shop = result;
        this.shop.forEach((element) => {
          element.pic_url = require(`@/assets/shop/${element.pic_url}`);
        });
    /* axios.post('http://127.0.0.1:8001/shop/category',{
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {categoryId:this.category.jixiang},
    }).then((result) => {
        this.shop = result.data;
        this.shop.forEach((element) => {
          element.pic_url = require(`./img/${element.pic_url}`);
        });
      },
      (err) => {
        console.log(err);
      }); */
    },
    //显卡分类
   async xianKa(){
      const result = await shopCategory(this.category.xianka);
      this.shop = result;
        this.shop.forEach((element) => {
          element.pic_url = require(`@/assets/shop/${element.pic_url}`);
        });
     /*  axios.post('http://127.0.0.1:8001/shop/category',{
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {categoryId:this.category.xianka},
    }).then((result) => {
        this.shop = result.data;
       
        this.shop.forEach((element) => {
          element.pic_url = require(`./img/${element.pic_url}`);
        });
      },
      (err) => {
        console.log(err);
      }); */
    },
    //键鼠分类
   async jianShu(){
       const result = await shopCategory(this.category.jianshu);
      this.shop = result;
        this.shop.forEach((element) => {
          element.pic_url = require(`@/assets/shop/${element.pic_url}`);
        });
      /* axios.post('http://127.0.0.1:8001/shop/category',{
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {categoryId:this.category.jianshu},
    }).then((result) => {
        this.shop = result.data;
       
        this.shop.forEach((element) => {
          element.pic_url = require(`./img/${element.pic_url}`);
        });
      },
      (err) => {
        console.log(err);
      }); */
    },
    //耳机分类
   async erJi(){
       const result = await shopCategory(this.category.erji);
      this.shop = result;
        this.shop.forEach((element) => {
          element.pic_url = require(`@/assets/shop/${element.pic_url}`);
        });
      /* axios.post('http://127.0.0.1:8001/shop/category',{
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {categoryId:this.category.erji},
    }).then((result) => {
        this.shop = result.data;
        this.shop.forEach((element) => {
          element.pic_url = require(`./img/${element.pic_url}`);
        });
      },
      (err) => {
        console.log(err);
      }); */
    },
    //散热器分类
   async sanReQi(){
      const result = await shopCategory(this.category.sanreqi);
      this.shop = result;
        this.shop.forEach((element) => {
          element.pic_url = require(`@/assets/shop/${element.pic_url}`);
        });
     /*  axios.post('http://127.0.0.1:8001/shop/category',{
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {categoryId:this.category.sanreqi},
    }).then((result) => {
        this.shop = result.data;
        this.shop.forEach((element) => {
          element.pic_url = require(`./img/${element.pic_url}`);
        });
      },
      (err) => {
        console.log(err);
      }); */
    },
    //主板分类
   async  zhuBan(){
       const result = await shopCategory(this.category.zhuban);
      this.shop = result;
        this.shop.forEach((element) => {
          element.pic_url = require(`@/assets/shop/${element.pic_url}`);
        });
     /* axios.post('http://127.0.0.1:8001/shop/category',{
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {categoryId:this.category.zhuban},
    }).then((result) => {
        this.shop = result.data;
        this.shop.forEach((element) => {
          element.pic_url = require(`./img/${element.pic_url}`);
        });
      },
      (err) => {
        console.log(err);
      }); */
    },
    //音响分类
   async yinXiang(){
      const result = await shopCategory(this.category.yinxiang);
      this.shop = result;
        this.shop.forEach((element) => {
          element.pic_url = require(`@/assets/shop/${element.pic_url}`);
        });
    /*  axios.post('http://127.0.0.1:8001/shop/category',{
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {categoryId:this.category.yinxiang},
    }).then((result) => {
        this.shop = result.data;
       
        this.shop.forEach((element) => {
          element.pic_url = require(`./img/${element.pic_url}`);
        });
      },
      (err) => {
        console.log(err);
      }); */
    },
    //显示器分类
   async xianShiQi(){
       const result = await shopCategory(this.category.xianshiqi);
      this.shop = result;
        this.shop.forEach((element) => {
          element.pic_url = require(`@/assets/shop/${element.pic_url}`);
        });
      /* axios.post('http://127.0.0.1:8001/shop/category',{
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {categoryId:this.category.xianshiqi},
    }).then((result) => {
        this.shop = result.data;
        
        this.shop.forEach((element) => {
          element.pic_url = require(`./img/${element.pic_url}`);
        });
      },
      (err) => {
        console.log(err);
      }); */
    },
    //其它分类
   async qiTa(){
       const result = await shopCategory(this.category.qita);
      this.shop = result;
        this.shop.forEach((element) => {
          element.pic_url = require(`@/assets/shop/${element.pic_url}`);
        });
   /*    axios.post('http://127.0.0.1:8001/shop/category',{
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {categoryId:this.category.qita},
    }).then((result) => {
        this.shop = result.data;
        this.shop.forEach((element) => {
          element.pic_url = require(`./img/${element.pic_url}`);
        });
      },
      (err) => {
        console.log(err);
      }); */
    }
  },
};
</script>

<style scope>
.Header_second{
    width: 1500px;
    height: 200px;
    margin: 0px auto;
    position: relative;
    
  }
  .Header_second>div{
    width: 680px;
    height: 60px;
    position: absolute;
    right: 0px;
    bottom: 60px;
  }
  .search>input{
      width: 500px;
      height: 40px;
      padding: 0px;
      margin-top: 0px;
      line-height: 40px;
      font-size: large;
  }

  .search>button{
    width: 150px;
    height: 45px;
    background-color: rgb(124, 169, 253);
    border: none;
    color: white;
    position: relative;
    top: 2px;
    border-radius: 5px;
    font-size: large;
    text-align: center;
  }
  .search>button:hover{
      cursor: pointer;
  }
.navsmenue{
  cursor: pointer;
}
.showShops_all {
  width: 100%;
}
.order {
  width: 1600px;
  height: 40px;
  background-color: rgb(230, 230, 230);
  margin: 0px auto;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 23px;
  color: black;
  position: relative;
  left: -40px;
}

.order > ul > li {
  float: left;
  list-style: none;
  line-height: 40px;
  margin: 0px 20px;
  cursor: pointer;
}

.price_title {
  font-size: 15px;
  position: relative;
  left: -30px;
  color: black;
}
.price_range > input {
  width: 30px;
}
.price_range_sure {
  width: 50px;
  height: 20px;
  margin: 10px;
  border: none;
  background-color: cornflowerblue;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}
.showShops {
  margin: 0px auto;
  width: 1600px;
  display: flex;
  flex-flow: row wrap;
  justify-content: left;
  align-content: space-around;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  
}
.showShop {
  width: 250px;
  height: 390px;
  border: 0.5px solid rgb(228, 220, 220);
  margin: 7px 7px;
}
.showShop:hover{
  border: 1px solid red;
}
.price {
  color: brown;
  font-size: large;
  text-align: left;
}
.seller {
  color: darkgrey;
}
.place {
  text-align: right;
  color: darkgrey;
}
.Home {
  width: 100%;
}
.Nav {
  width: 1500px;
  height: 60px;
  margin: 0px auto;
}
.home_nav {
  background-color: rgb(121, 164, 245);
  border-radius: 10px;
}
.home_nav > li {
  display: inline-block;
  text-align: center;
  list-style: none;
  line-height: 60px;
  width: 110px;
  margin: 0px 20px;
  height: 60px;
  color: white;
  font-size: large;
}
.home_nav > li:hover {
  background-color: gold;
}
</style>