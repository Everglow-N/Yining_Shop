import VueRouter from "vue-router";
import Vue from 'vue';
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search';
import Details from '@/pages/Details';
import UserInfo from '@/pages/UserInfo';
import Favorite from '@/pages/Favorite';
import SubOrder from '@/pages/SubOrder';
import ShopCart from '@/pages/ShopCart';
import Seller from '@/pages/Seller';
import MyOrder from '@/pages/MyOrder';
import sendShop from '@/pages/SendShop';
import Comment from '@/pages/Comment'
//解决路由重复的问题
/* const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
} */
Vue.use(VueRouter);
export default new VueRouter({
    routes:[
        //配置主页路由
        {
            path:'/Home',
            component:Home,
            meta:{isShow:true}
        },
        //配置登录路由
        {
            name:'login',
            path:'/Login',
            component:Login,
            meta:{isShow:false }
        },
        //配置注册路由
        {
            path:'/Register',
            component:Register,
            meta:{isShow:false}
        },
        //配置Serch路由
        {
            name:'Search',
            path:'/Search/:key',
            component:Search,
            meta:{isShow:true}
        },
        //配置详情页details路由
        {
            name:'details',
            path:'/details/:key',
            component:Details
        },
        {
            name:'userinfo',
            path:'/userinfo',
            component:UserInfo
        },
        {
            name:'favorite',
            path:'/favorite',
            component:Favorite
        },
        {
            name:'suborder',
            path:'/suborder/:shop/:num/:price',
            component:SubOrder
        },
        {
            name:'shopcart',
            path:'/shopcart',
            component:ShopCart,

        },
        {
            name:'seller',
            path:'/seller',
            component:Seller

        },
        {
            name:'myorder',
            path:'/myorder',
            component:MyOrder
        },
        {
            name:'sendshop',
            path:'/sendshop/:sendShop',
            component:sendShop
        },
        {
            name:'comment',
            path:'/comment/:Info',
            component:Comment,
        },
        //重定向，在项目跑起来的时候，访问/,立马让他定向到首页
        { 
            path: '*',
            redirect: '/Home'
        },
        

    ]


})