<template>
<div class="all">
   <div class="last">
        <div class="part">
            <h4>帮助中心</h4>
            <br>
            <a href="https://www.mi.com/?masid=2701.0103">账户管理</a>
            <a href="https://www.mi.com/?masid=2701.0103">购物指南</a>
            <a href="https://www.mi.com/?masid=2701.0103">订单操作</a>
        </div>

        <div class="part">
            <h4>服务支持</h4>
            <br>
            <a href="https://www.mi.com/?masid=2701.0103">售后政策</a>
            <a href="https://www.mi.com/?masid=2701.0103">自助服务</a>
            <a href="https://www.mi.com/?masid=2701.0103">相关下载</a>
        </div>

        <div class="part">
            <h4>线下门店</h4>
            <br>
            <a href="https://www.mi.com/?masid=2701.0103">小米之家</a>
            <a href="https://www.mi.com/?masid=2701.0103">服务网点</a>
            <a href="https://www.mi.com/?masid=2701.0103">授权体验店</a>
        </div>


        <div class="part">
            <h4>关于小米</h4>
            <br>
            <a href="https://www.mi.com/?masid=2701.0103">了解小米</a>
            <a href="https://www.mi.com/?masid=2701.0103">投资小米</a>
            <a href="https://www.mi.com/?masid=2701.0103">关注小米</a>
            <a href="https://www.mi.com/?masid=2701.0103">企业责任</a>
            <a href="https://www.mi.com/?masid=2701.0103">廉洁举报</a>
        </div>

        <div class="part">
            <h4>特色服务</h4>
            <br>
            <a href="https://www.mi.com/?masid=2701.0103">F码通道</a>
            <a href="https://www.mi.com/?masid=2701.0103">礼物码</a>
            <a href="https://www.mi.com/?masid=2701.0103">防伪查询</a>
        </div>

        <div class="part">
            <h1 style="color: darkorange;">400-198-5500</h1>
            <h6>8:00-18:00（仅收市话费)</h6>
            <h6>关注小米：</h6>
            <div class="img">
                <div>
                    <img src="/src/assets/微信logo.jfif" width="30px" height="30px">
                    <img src="/src/assets/小米二维码.png" width="100px" height="100px">
                </div>
                <div>
                <img src="/src/assets/微博logo.jfif" width="30px" height="30px">
                <img src="/src/assets/微博二维码.jpg" width="100px" height="100px">
            </div>


        </div>

    </div>
    </div>
</div>
</template>

<script scope>
export default {
    name:'Home'
}
</script>

<style scope>
.all{
    width: 100%;
    height: 300px;
}
.last{
    width: 1200px;
    height: 300px;
    margin: 0px auto;
}
.last>.part{      /* 设置各个部分的排序 */
     float: left;
     margin: 50px;
     text-align: center;
 }
 .last>.part>a{      /* 设置链接的排序 */
     display: block;
     margin-top: 20px;
     font-size: small;
     text-align: center;
     color: black;
 }
 .part:last-child{    /* 设置最后一列的位置排序 */
     position: relative;
     top: 30px;
     left: 60px;
    
 }
 .img{
     position: relative; 
 }
 .part>a:link{  /*  设置初始a的值 */
     color: rgb(27, 27, 27);
     text-decoration: none;
 }

 .part>a:hover{
     color: rgb(241, 153, 36); /* 鼠标放到a链接上面现橙色 */
 }
.img>div{
    position: relative;
}
.img{
    position: relative;
    left: 20px;
}
.img>div>img{
    float: left;
    margin: 10px;
}
.img>div:first-child>img:last-child{
    position: absolute;
    top: 50px;
    left: 0px;
    display: none;
}
.img>div:last-child>img:last-child{
    position: absolute;
    top:50px;
    right: 0px;
    display: none;
}
.img>div:first-child:hover>img:last-child{
    display: block;
}
.img>div:last-child:hover>img:last-child{
    display: block;
}
.img>div>img:first-child{
    filter: grayscale(100);
}
.img>div>img:first-child:hover{
    filter:none
}
.img>div>img:first-child{
    position: relative;
    left: 40px;
}















</style>