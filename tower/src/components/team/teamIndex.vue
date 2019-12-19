<template>
  <div id="teamMain">
    <div id="teamMenber">
      <span id="allMenber">所有成员</span><span id="visitor"><i class="el-icon-s-release"></i>访客</span>
    </div>

    <div id="teamCompany">
      <div class="left">
        <span id="teamCompanyName">凌先医药</span><span id="messageData">( 共 {{menberList.length}} 人 ，<a href="javascript:;">其中包括 5 名访客</a>  )</span>
      </div>
      <div class="right">
        <el-button size="small" class="newMenber" @click="newMenberState=true"><i class="el-icon-plus"></i>&nbsp;邀请新成员</el-button>
      </div>
    </div>

    <div id="menberList">
      <el-row v-for="(menber, index) in menberList" :key="index" >
        <div class="menberMassage">
          <el-col :span="16" style="margin: 0px;height: 60px">
            <img :src="menber.icon" class="userImageMedium"/>
            <div class="menberBaseMassage">
              <span class="menberUserName"><a href="javascript:;">{{menber.name}}</a></span>
              <span class="menberType">{{menber.menberType}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <span style="text-align: right;position: relative;top: 25px">{{menber.email}}</span>
          </el-col>
        </div>
      </el-row>
    </div>

    <div id="createNewMenber">
      <el-dialog :visible.sync="newMenberState" width="40%" top="200px" center>
        <el-form ref="user" :model="user" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="user.account"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="user.phoneNo"></el-input>
          </el-form-item>
          <el-form-item label="人员简介">
            <el-input type="textarea" v-model="user.remark" rows="4"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitUser">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  import '../../assets/css/tower.css'
  import $ from 'jquery'
  import app from '../../utils/app'
  export default {
    name: "team-index",
    data() {
      return {
        newMenberState:false,
        user:{},
        rootPath:'',
        menberList: []
      }
    },
    created() {
      const $this = this;
      $this.rootPath = app.common.getRootPath();
      $this.getUserList();
    },
    methods:{
      getUserList:function(){
        const $this = this;
        $.ajax({
          url: $this.rootPath + "/system/user/findAll",
          type: "get",
          dataType: "json",
          success: function (result) {
            if (result.length>0) {
              $this.menberList=result;
            }
          }
        });


      },
      onSubmitUser:function(){
        const $this = this;
        const user=$this.user;
        $.ajax({
          url: $this.rootPath + "/system/user/add",
          type: "post",
          data: user,
          dataType: "json",
          success: function (result) {
            if (result.status=='success') {
              $this.newMenberState=false;
              $this.getUserList();
            }
          }
        });


      }
    }
  }
</script>

<style>

  /**
    设置团队成员
   */
  #teamMain {
    width: 960px;
    min-height: 660px;
    margin: 0px auto;
    background: #FFFFFF;
    margin-top: 3px;
  }

  #teamMenber {
    padding-top: 20px;
    margin-bottom: 30px;
    margin-left: 20px;
    text-align: left;
  }

  #teamMenber span {
    margin-right: 20px;
  }

  #allMenber, #visitor {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 20px;
  }

  #allMenber {
    background: #44ACB6;
    color: white;
    border: 1px solid #44ACB6;
  }

  #visitor {
    color: gray;
    border: 1px solid #E9E9E9;
    background: #F6F6F6;
  }

  .newMenber {
    margin-right: 20px;
    background: #44ACB6;
    color: white
  }

  .newMenber:hover {
    margin-right: 20px;
    background: #44ACB6;
    color: white
  }
  #teamCompany .el-row span {
    margin-right: 20px;
  }

  #teamCompany {
    padding-left: 30px;
    margin-bottom: 10px;
    height: 50px;
  }

  #teamCompanyName {
    font-size: 25px;
  }

  .menberMassage {
    text-align: left;
    vertical-align: middle;
    height: 60px;
    padding: 8px 5px 8px 5px;
    margin-left: 40px;
    margin-right: 10px;
    border-top: 1px solid #E3E3E3;
    border-bottom: 1px solid #E3E3E3;
  }

  .menberBaseMassage {
    display: inline-block;
    margin-left: 10px;
    position: relative;
    top: -25px;
  }

  .menberUserName {
    font-size: 18px;
  }

  .menberUserName a {
    color: black;
  }

  .menberUserName a:hover {
    color: #44ACB6;
  }

  .menberType {
    font-size: 14px;
    color: gray;
  }

</style>
