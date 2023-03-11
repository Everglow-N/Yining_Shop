<template>
  <div class="comment_module">
    <div class="comment_do">
      <p>请为您喜欢的商品打分</p>
      <el-rate class="el-rate" v-model="value" show-text></el-rate>
      <p>请输入评论</p>
      <textarea style="font-size:large" v-model="comment" cols="30" rows="10"></textarea>
      <div style="width: 100px; margin: 20px auto">
        <button @click="subComment" class="subComment">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mycomment} from '@/api/index'
export default {
  name: "Comment",
  data() {
    return {
      value: null,
      comment: null,
      Authorization: localStorage.getItem("Authorization"),
      Info: JSON.parse(localStorage.getItem("ShopInfo")),
    };
  },
  methods:{
     async subComment(){
          this.Info.comment_content=this.comment;
          this.Info.value=this.value;
          this.Info.comment_time=new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
          if(!this.value||!this.comment) return alert('请填写评论或打分')
          const result=await mycomment(this.Info,this.Authorization)
          if(result.status==0){
              alert('评论成功!')
              this.$router.push({name:'myorder'})
          }
          
      }
  },
    created() {
    const Info = JSON.parse(this.$route.params.Info);
    localStorage.setItem("ShopInfo", JSON.stringify(Info));
  },
  beforeDestroy() {
    localStorage.removeItem("ShopInfo");
  },
};
</script>

<style>
.comment_module {
  width: 100%;
}
.comment_do {
  width: 600px;
  height: 400px;
  margin: 0px auto;
  border: 1px solid gainsboro;
  display: flex;
  flex-flow: nowrap column;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-rate {
  width: 400px;
  padding: 0px;
  margin: 50px 0px;
  text-align: center;
}
.subComment {
  width: 100px;
  height: 40px;
  margin: 0px auto;
  background-color: dodgerblue;
  color: white;
  border: none;
}
</style>