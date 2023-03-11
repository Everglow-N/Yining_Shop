import requests from "./request";
//登录界面的axios
export function login(username,password){
   return  requests.post('/api/login',{
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    data:{username,password}
})
}
//注册界面的axios
export function reguser(username,password){
    return requests.post('/api/reguser',{
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data:{username,password}
    })
}
//商品挂载展示
export function showShop(){
    return requests.get('/shop/show')
}
//商品搜索
export function shopSearch(infoName){
    return requests.post('/shop/search',{
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data:{infoName}
    })
}
//商品分类
export function shopCategory(categoryId){
    return requests.post('/shop/category',{
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data:{categoryId}
})
}
//展示商品的评论
export function shopComment(infoId){
    return requests.post('shop/comment',{
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data:{infoId}
    })
}
//解析token
export function token(Authorization){
    return requests.get('/my/userinfo',{
        headers:{'Authorization':Authorization}
    })
}
//个人中心的用户信息展示
export function showuserinfo(Authorization){
    return requests.get('/my/showuserinfo',{
        headers:{'Authorization':Authorization}
    })
}
//用户个人信息的修改
export function updateUserinfo(info){
    return requests.post('/my/updateuserinfo',{
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data:{info}
    })
}
//修改密码
export function updatepassword(oldpassword,newpassword,userid){
    return requests.post('/my/updatepassword',{
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data:{oldpassword,newpassword,userid}
    })
}
//添加新的地址
export function addnewaddress(address,userid){
    return requests.post('/my//addnewaddress',{
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data:{address,userid}
    })
}
//展示地址(个人信息栏)
export function showaddress(userid){
    return requests.post('/my/showaddress',{
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data:{userid}
    })
}
//给用户充值
export function charge(Authorization,info){
    return requests.post('/my/charge',{info:info},{
        headers:{'Content-Type':'application/json','Authorization':Authorization},
    })
}
//展示地址(订单生成页)
export function showorderaddress(Authorization){
    return requests.get('/my/showorderaddress',{
        headers:{'Authorization':Authorization}
    })
}

//删除地址
export function deleteaddress(addressId){
    return requests.post('/my/deleteaddress',{
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data:{addressId}
    })
}
//修改地址
export function editaddress(addressInfo){
    return requests.post('/my/editaddress',{
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data:{addressInfo}
    })
}
//设为默认地址
export function setdefault(addressInfo){
    return requests.post('/my/setdefault',{
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data:{addressInfo}
    })
}
//点击将商品添加到收藏夹
export function tofavorite(Authorization,shopInfo){
    return requests.post('/my/tofavorite',shopInfo,{
        headers:{'Content-Type':'application/json','Authorization':Authorization}
    },
    )
}
//获取用户收藏夹内容
export function myFavorite(Authorization){
    return requests.get('/my/favorite',{
        headers:{'Authorization':Authorization}
    })
}
//删除收藏夹
export function delFavorite(Authorization,favoriteInfo){
    return requests.post('/my/delfavorite',favoriteInfo,{
        headers:{'Content-Type':'application/json','Authorization':Authorization}
    })
}
//购物车数据
export function showshopcart(Authorization){
    return requests.get('/my/showshopcart',{
        headers:{'Authorization':Authorization}
    })
}
//添加购物车
export function addshopcart(shop,Authorization){
    return requests.post('/my/addshopcart',shop,{
        headers:{'Content-Type':'application/json','Authorization':Authorization}
    })
}
//删除购物车
export function deleteshopcart(shop,Authorization){
    return requests.post('/my/deleteshopcart',shop,{
        headers:{'Content-Type':'application/json','Authorization':Authorization}
    })
}
//用户购买生成订单
export function buynow(shop,addr,Authorization){
    return requests.post('/my/buynow',{shop,addr},{
        headers:{'Content-Type':'application/json','Authorization':Authorization}
    })
}
//判断用户购买的是否是自己的
export function self(Authorization){
    return requests.get('/my/self',{
        headers:{'Authorization':Authorization}
    })
}
//买家未处理的订单获取
export function mypendingorder(Authorization){
    return requests.get('/my/mypendingorder',{
        headers:{'Authorization':Authorization}
    })
}
//评论
export function mycomment(Info,Authorization){
    return requests.post('my/mycomment',Info,{
        headers:{'Content-Type':'application/json','Authorization':Authorization}
    })
}
//确认收货
export function sureorder(Info,Authorization){
    return requests.post('/my/sureorder',Info,{
        headers:{'Content-Type':'application/json','Authorization':Authorization}
    })
}


//下面是卖家中心
//获取未处理的订单
export function pendingorder(Authorization){
    return requests.get('/seller/pendingorder',{
        headers:{'Authorization':Authorization}
    })
}
//发货
export function sendshop(shopInfo,Authorization){
    return requests.post('/seller/sendshop',shopInfo,{
        headers:{'Content-Type':'application/json','Authorization':Authorization}
    })
}
//取消订单
export function deleteorder(shopInfo,Authorization){
    return requests.post('/seller/deleteorder',shopInfo,{
        headers:{'Content-Type':'application/json','Authorization':Authorization}
    })
}