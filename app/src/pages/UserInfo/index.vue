<template>
  <div class="userinfo_module">
    <div class="userinfo">
      <el-tabs type="border-card">
        <el-tab-pane label="个人资料">
          <div class="base_info">
            <p>亲，设置好个人资料有助于好友发现你哦！</p>
            <span>
              真实姓名：
              <input class="info_input" type="text" v-model="info.real_name" />
            </span>
            <span>
              身份证号：
              <input class="info_input" type="text" v-model="info.idcard" />
            </span>
            <span>
              性别: 男
              <input type="radio" v-model="info.sex" name="sex" value="男" />
              女
              <input type="radio" v-model="info.sex" name="sex" value="女" />
            </span>
            <span>
              手机号码：
              <input
                class="info_input"
                type="text"
                v-model="info.phone_number"
              />
            </span>
            <span>
              电子邮箱：
              <input class="info_input" type="text" v-model="info.email" />
            </span>
            <span>
              出生日期：
              <el-date-picker
                class="birthday"
                prefix-icon="none"
                align="right"
                v-model="info.birthday"
                type="date"
                placeholder="请选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </span>
            <span>
              账户余额：￥{{info.money}} <i style="margin-left:10px" class="el-icon-coin"><span @click="charge" class="charge">充值</span></i>
            </span>
            <span class="charge_content" v-show="ischarge">
              充值金额：<input type="text" v-model.number="chargemoney">
              <button @click="charging">确认充值</button>
            </span>
            <button class="info_sure" @click="sure">确认修改</button>
          </div>
        </el-tab-pane>

        <!-- //安全设置项 -->
        <el-tab-pane label="安全设置">
          <div class="alert">
            <el-alert
              v-show="oldpasswordFalse"
              title="密码验证不通过，请重新输入密码！！"
              type="error"
              show-icon
            >
            </el-alert>
            <el-alert
              v-show="oldpasswordTrue"
              title="您的密码修改成功！！"
              type="success"
              show-icon
            >
            </el-alert>
          </div>
          <div class="passChange">
            <div class="oldpass">
              旧密码：
              <input type="text" v-model="oldpassword" />
            </div>
            <div class="newpass">
              新密码：
              <input type="password" v-model="newpassword" />
            </div>
            <div class="checkpass">
              确认密码：
              <input type="password" v-model="checkpassword" />
            </div>
            <button class="passSure" @click="surePass">确认修改</button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="我的地址">
          <div class="addnewaddressTrue">
            <el-alert
              v-show="addSuccess"
              title="已经成功添加了新的地址！！"
              type="success"
              show-icon
            >
            </el-alert>
          </div>
          <div class="Myaddress">
              <!-- 添加新的地址 -->
            <div class="addProvince">
              <p style="text-align:center;font-size:large">添加新的地址</p>
              <span>地址信息：</span>
              <select name="未选" v-model="address.province">
                <option value="未选">-</option>
                <option value="宁夏回族自治区">宁夏回族自治区</option>
              </select>

              <select
                name="未选"
                v-model="address.city"
                v-show="address.province == '宁夏回族自治区'"
              >
                <option value="未选">-</option>
                <option value="银川市">银川市</option>
                <option value="吴忠市">吴忠市</option>
                <option value="石嘴山市">石嘴山市</option>
              </select>

              <select
                name="未选"
                v-show="
                  address.city == '银川市' &&
                  address.province == '宁夏回族自治区'
                "
                v-model="address.area"
              >
                <option value="未选">-</option>
                <option value="金凤区">金凤区</option>
                <option value="西夏区">西夏区</option>
                <option value="兴庆区">兴庆区</option>
                <option value="永宁县">永宁县</option>
                <option value="贺兰县">贺兰县</option>
                <option value="灵武市">灵武市</option>
                <option value="其它区">其它区</option>
              </select>

              <select
                name="未选"
                v-show="
                  address.city == '石嘴山市' &&
                  address.province == '宁夏回族自治区'
                "
                v-model="address.area"
              >
                <option value="未选">-</option>
                <option value="大武口区">大武口区</option>
                <option value="惠农区">惠农区</option>
                <option value="平罗县">其它区</option>
              </select>

              <select
                name="未选"
                v-show="
                  address.city == '吴忠市' &&
                  address.province == '宁夏回族自治区'
                "
                v-model="address.area"
              >
                <option value="未选">-</option>
                <option value="利通区">利通区</option>
                <option value="红寺堡区">红寺堡区</option>
                <option value="盐池县">盐池县</option>
                <option value="同心县">同心县</option>
                <option value="青铜峡市">青铜峡市</option>
              </select>
            </div>

            <div class="detailed">
              <span>详细地址:</span>
              <input
                type="text"
                placeholder="请输入详细的信息，比如街道，门牌号小区等"
                v-model="address.address"
              />
            </div>

            <div class="emails">
              <span>邮政编码:</span>
              <input type="text" v-model="address.zip" />
            </div>

            <div class="receive_name">
              <span>收货人姓名:</span>
              <input type="text" v-model="address.username" />
            </div>

            <div class="phones">
              <span>电话号码:</span>
              <input type="text" v-model="address.phone_number" />
            </div>
            <button class="save_address" @click="saveAddress">保存</button>
            <hr>
            
            <div class="showAddress" v-show="notEdit">
                <p style="font-size:large"><i class="el-icon-warning-outline"></i>以下地址是已添加的地址</p>
                <br>
                <table>
                  <thead>
                    <td>姓名</td>
                    <td>所在地区</td>
                    <td>详细地址</td>
                    <td>邮编</td>
                    <td>联系方式</td>
                    <td>操作</td>
                    <td></td>
                  </thead>
                  <tr v-for="p in showaddress" :key="p.address_id">
                      <td>{{p.username}}</td>
                      <td>{{p.province}} {{p.city}} {{p.area}}</td>
                      <td>{{p.address}}</td>
                      <td>{{p.zip}}</td>
                      <td>{{p.phone_number}}</td>
                      <td><button class="editBTN" @click="editaddr(p)">编辑</button> <button class="deleteBTN" @click="deleteaddr(p.address_id)">删除</button></td>
                      <td><button class="setDefault" v-show="p.status==1" @click="setDefaultaddr(p)">设为默认</button><button class="isDefault" v-show="p.status==0">默认地址</button></td>
                  </tr>
                </table>
            </div>

              <div v-show="isEdit">
              <div class="addProvince">
              <p style="text-align:center;font-size:large">修改您的地址</p>
              <span>地址信息：</span>
              <select name="未选" v-model="editaddress.province">
                <option value="未选">-</option>
                <option value="宁夏回族自治区">宁夏回族自治区</option>
              </select>

              <select
                name="未选"
                v-model="editaddress.city"
                v-show="editaddress.province == '宁夏回族自治区'"
              >
                <option value="未选">-</option>
                <option value="银川市">银川市</option>
                <option value="吴忠市">吴忠市</option>
                <option value="石嘴山市">石嘴山市</option>
              </select>

              <select
                name="未选"
                v-show="
                  editaddress.city == '银川市' &&
                  editaddress.province == '宁夏回族自治区'
                "
                v-model="editaddress.area"
              >
                <option value="未选">-</option>
                <option value="金凤区">金凤区</option>
                <option value="西夏区">西夏区</option>
                <option value="兴庆区">兴庆区</option>
                <option value="永宁县">永宁县</option>
                <option value="贺兰县">贺兰县</option>
                <option value="灵武市">灵武市</option>
                <option value="其它区">其它区</option>
              </select>

              <select
                name="未选"
                v-show="
                  editaddress.city == '石嘴山市' &&
                  editaddress.province == '宁夏回族自治区'
                "
                v-model="editaddress.area"
              >
                <option value="未选">-</option>
                <option value="大武口区">大武口区</option>
                <option value="惠农区">惠农区</option>
                <option value="平罗县">其它区</option>
              </select>

              <select
                name="未选"
                v-show="
                  editaddress.city == '吴忠市' &&
                  editaddress.province == '宁夏回族自治区'
                "
                v-model="editaddress.area"
              >
                <option value="未选">-</option>
                <option value="利通区">利通区</option>
                <option value="红寺堡区">红寺堡区</option>
                <option value="盐池县">盐池县</option>
                <option value="同心县">同心县</option>
                <option value="青铜峡市">青铜峡市</option>
              </select>
            </div>

            <div class="detailed">
              <span>详细地址:</span>
              <input
                type="text"
                placeholder="请输入详细的信息，比如街道，门牌号小区等"
                v-model="editaddress.address"
              />
            </div>

            <div class="emails">
              <span>邮政编码:</span>
              <input type="text" v-model="editaddress.zip" />
            </div>

            <div class="receive_name">
              <span>收货人姓名:</span>
              <input type="text" v-model="editaddress.username" />
            </div>

            <div class="phones">
              <span>电话号码:</span>
              <input type="text" v-model="editaddress.phone_number" />
            </div>
            <button class="save_address" @click="saveEdit">确认修改</button>
            <button class="save_address" style="margin-left:40px" @click="reback">返回</button>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="评论管理"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { showaddress, updateUserinfo } from "@/api/index";
import { showuserinfo } from "@/api/index";
import { updatepassword } from "@/api/index";
import {addnewaddress} from '@/api/index';
import {deleteaddress} from '@/api/index';
import {editaddress} from '@/api/index';
import {setdefault} from '@/api/index';
import {charge} from '@/api/index';
export default {
  name: "UserInfo",
  data() {
    return {
      ischarge:false,
      chargemoney:null,
      info: {},
      Authorization: localStorage.getItem("Authorization"),
      oldpassword: "",
      newpassword: "",
      checkpassword: "",
      oldpasswordFalse: false,
      oldpasswordTrue: false,
      address:{
        province:'', //省
        city:'', //市
        area:'',//区
        address:'',//详细地址
        zip:'',//邮编
        username:'',//收货人姓名
        phone_number:'',//电话号码
      },
      addSuccess:false,   //添加成功的提示
      showaddress:[],     //地址展示
      notEdit:true,      //未修改时
      isEdit:false,     //修改时
      editaddress:{},  //修改地址的数据
    };
  },
  //在挂载的时候，把缓存中的authorization提取出来，然后获取基本信息
  async mounted() {
    //这是获取基本信息
    const result = await showuserinfo(this.Authorization);
    if(result.status==-1){
      this.$router.push({path:'/login'})
    }
    this.info = result;
    //这是获取用户地址
    const reason=await showaddress(this.info.userid)
    this.showaddress=reason
    //这是获取用户地址是否为默认地址
  
    
    
  },
  methods: {
    //修改个人信息
    async sure() {
      const result = await updateUserinfo(this.info);
      console.log(result);
    },
    //修改密码
    async surePass() {
      if (this.checkpassword !== this.newpassword)
        return alert("确认密码和输入的密码不一致");
      const result = await updatepassword(
        this.oldpassword,
        this.newpassword,
        this.info.userid
      );
      if (result.status == -1) return (this.oldpasswordFalse = true);
      if (result.status == 0) return (this.oldpasswordTrue = true);
    },
    //添加新的地址
   async saveAddress(){
      if(!this.address.province || !this.address.city ||!this.address.area)  alert('地址信息不可以为空！')
      if(!this.address.address)  alert('详细地址不能为空')
      if(!this.address.username) alert('收货人姓名不可为空')
      if(!this.address.phone_number) alert('电话号码不可为空')
      if(!this.address.zip) this.address.zip='000000'
      const result=await addnewaddress(this.address,this.info.userid)
      console.log(result)
      if(result.status==0) {
         this.addSuccess=true
         setTimeout(() => {
          this.addSuccess=false
          location.reload();
         }, 2000);
      }
    },
    //删除这个地址  
  async deleteaddr(addressId){
    if(confirm("确定删除这个地址吗？删了就找不回来了！！")){
     const result =await deleteaddress(addressId)
       if(result.status==0){
         alert('已经删除啦，已经没有后悔的机会！')
         location.reload();
     }
  }
  },
  //点击编辑将数据传给编辑列表
   editaddr(addressInfo){
    this.isEdit=true;
    this.notEdit=false
     this.editaddress=addressInfo
  },
    //点击保存
  async saveEdit(){
   const result = await editaddress(this.editaddress)
    if(result.status==0) {
      alert('地址修改成功！')
      this.isEdit=false;
      this.notEdit=true;
      location.reload();
    }
  },
  //点击返回到用户地址
  reback(){
    this.isEdit=false;
    this.notEdit=true
  },
  //点击设为默认地址
 async setDefaultaddr(addressInfo){
    if(confirm('确定将这个地址设为默认地址？')){
    const result=await setdefault(addressInfo)
    if(result.status==0){
      alert('修改成功！')
      location.reload();
    }
    }
  },
   charge(){
      this.ischarge=true;
  },
  async charging(){
    const result=await charge(this.Authorization,this.chargemoney)
    if(result.status==0){
      alert('充值成功')
      location.reload();
    }
    if(result.status==-1){
      alert('请输入数字！')
    }
  }
  },
};
</script>

<style>
.userinfo_module {
  width: 100%;
}
.userinfo {
  width: 800px;
  background-color: aqua;
  margin: 100px auto;
}
.base_info {
  width: 800px;
  height: 700px;
  display: flex;
  flex-flow: column nowrap;
}
.base_info > span {
  margin: 10px 100px;
}
.info_input {
  width: 300px;
  height: 30px;
}
.info_sure {
  background-color: cornflowerblue;
  width: 150px;
  height: 40px;
  color: white;
  margin: 50px auto;
  border: none;
}
.birthday {
  font-size: 100px;
  text-align: right;
}
.passChange {
  width: 800px;
  height: 300px;
  display: flex;
  flex-flow: column nowrap;
}
.passChange > div {
  margin: 20px 140px;
}
.checkpass {
  position: relative;
  left: -15px;
}
.passChange > div > input {
  width: 300px;
  height: 30px;
}
.passSure {
  width: 120px;
  height: 40px;
  background-color: cornflowerblue;
  color: white;
  border: none;
  margin: 20px auto;
  cursor: pointer;
}
.alert {
  width: 400px;
  height: 30px;
  margin: 0px auto;
}
.Myaddress {
  width: 800px;
  display: flex;
  flex-flow: nowrap column;
}
.Myaddress > div {
  margin-top: 20px;
}
.addProvince > select {
  margin-left: 5px;
}
.detailed > input {
  height: 30px;
  width: 400px;
}
.emails > input {
  width: 200px;
  height: 30px;
}
.receive_name {
  position: relative;
  left: -15px;
}
.receive_name > input {
  width: 200px;
  height: 30px;
}
.phones > input {
  width: 200px;
  height: 30px;
}
.save_address {
  width: 100px;
  height: 40px;
  border: none;
  background-color: dodgerblue;
  color: white;
  margin: 20px auto;
}
.addnewaddressTrue{
  width: 500px;
  height: 30px;
  margin: 0px auto;
}
table{
  width: 780px;
  border-collapse: collapse;
  border: 1px solid gainsboro;
}
table>thead{
  background-color: rgb(236, 236, 235);
  width: 780px;
  height: 40px;
}
table>thead>td{
  border: 1px solid gainsboro;
}
table>tr>td{
  height: 100px;
  border: 1px solid gainsboro;
}
.setDefault{
  width: 80px;
  height: 40px;
}
.isDefault{
  width: 80px;
  height: 40px;
  background-color: cornflowerblue;
  color: white;
  border: none;
}
.editBTN{
 width: 40px;
 height: 20px;
 margin-bottom: 10px;

}
.deleteBTN{
 width: 40px; 
 height: 20px;
}
.charge{
  font-size: large;
  cursor: pointer;
  margin-left: -1px;
}
.charge:hover{
    color: burlywood;
}
.charge_content>input{
  width: 200px;
  height: 30px;
  font-size: large;
}
.charge_content>button{
  width:60px;
  height: 35px;
  border: none;
  background-color: cornflowerblue;
  color: white;

}
</style>